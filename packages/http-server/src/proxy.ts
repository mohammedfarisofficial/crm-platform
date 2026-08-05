import crypto from 'crypto';
import { createProxyMiddleware } from 'http-proxy-middleware';
import express, { Request, Response, NextFunction } from 'express';
import { rateLimit, Options as RateLimitOptions } from 'express-rate-limit';

export interface ServiceRoute {
  path: string;
  target: string;
  rateLimit?: Partial<RateLimitOptions>;
}

export interface ProxyOptions {
  name?: string;
  services: ServiceRoute[];
  globalRateLimit?: Partial<RateLimitOptions>;
}

export function createProxy({ name = 'proxy', services, globalRateLimit }: ProxyOptions) {
  const app = express();



  app.use((req: Request, _res: Response, next: NextFunction) => {
    req.headers['x-correlation-id'] ??= crypto.randomUUID();
    next();
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const correlationId = req.headers['x-correlation-id'];

    res.on('finish', () => {
      console.log(JSON.stringify({
        level: 'info',
        timestamp: new Date().toISOString(),
        correlationId,
        method: req.method,
        path: req.originalUrl,
        status: res.statusCode,
        durationMs: Date.now() - start,
      }));
    });

    next();
  });

  app.use(rateLimit({
    windowMs: 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please slow down.' },
    ...globalRateLimit,
  }));

  function proxy(target: string) {
    return createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: (path, req) => (req as unknown as Request).originalUrl,
      on: {
        proxyReq: (proxyReq, req) => {
          const correlationId = req.headers['x-correlation-id'];
          if (correlationId) {
            proxyReq.setHeader('x-correlation-id', correlationId);
          }
          proxyReq.removeHeader('cookie');
        },
        error: (err, _req, res) => {
          console.error(JSON.stringify({
            level: 'error',
            message: 'Proxy error — downstream service unavailable',
            target,
            error: (err as Error).message,
          }));
          (res as unknown as Response).status(502).json({ error: 'Service temporarily unavailable.' });
        },
      },
    });
  }

  for (const service of services) {
    const handlers: express.RequestHandler[] = [];

    if (service.rateLimit) {
      handlers.push(rateLimit(service.rateLimit));
    }

    handlers.push(proxy(service.target) as unknown as express.RequestHandler);
    app.use(service.path, ...handlers);
  }

  app.get('/', (_req: Request, res: Response) => {
    res.json({ status: 'ok', message: `CRM ${name} is running` });
  });

  app.get('/health', (_req: Request, res: Response) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: services.reduce<Record<string, string>>(
        (acc, { path, target }) => ({ ...acc, [path]: target }),
        {}
      ),
    });
  });

  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Route not found' });
  });

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(JSON.stringify({
      level: 'error',
      message: err.message,
      stack: err.stack,
    }));
    res.status(500).json({ error: 'Internal server error' });
  });

  return app;
}
