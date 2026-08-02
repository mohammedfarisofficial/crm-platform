import express, { Request, Response, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { rateLimit } from 'express-rate-limit';
import { URLS } from '@crm/utils/constants/urls';
import crypto from 'crypto';

const app = express();
const PORT = process.env.PORT ?? 6060;

const SERVICES = {
  authentication: URLS.AUTHENTICATION_SERVICE_URL,
  users: URLS.USERS_SERVICE_URL,
} as const;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please slow down.' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many authentication attempts. Try again later.' },
});

app.use(globalLimiter);

function proxy(target: string) {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
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
app.use('/api/authenticate', authLimiter, proxy(SERVICES.authentication) as unknown as express.RequestHandler);
app.use('/api/users', proxy(SERVICES.users) as unknown as express.RequestHandler);
app.get('/', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'CRM Gateway is running' });
});
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: Object.entries(SERVICES).reduce<Record<string, string>>(
      (acc, [name, url]) => ({ ...acc, [name]: url }),
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
app.listen(PORT, () => {
  console.log(JSON.stringify({
    level: 'info',
    message: `[gateway] Running on port ${PORT}`,
    services: SERVICES,
  }));
});

export default app;
