import express, { Router, Request, Response, NextFunction } from 'express';
import { fail } from './async-handler';
import { redis } from '@crm/redis';

export interface AppOptions {
  serviceName: string;
  mountPath: string;
  router: Router;
  port?: number | string;
  onStart?: () => void | Promise<void>;
  customMiddlewares?: Array<express.RequestHandler>;
  healthCheck?: (req: Request, res: Response) => void | Promise<void>;
}

export function createApp({ serviceName, mountPath, router, port, onStart, customMiddlewares, healthCheck }: AppOptions) {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  if (customMiddlewares) {
    customMiddlewares.forEach(mw => app.use(mw));
  }

  app.get(['/', mountPath], (_req: Request, res: Response) => {
    res.json({ status: 'ok', message: `${serviceName} service is running` });
  });

  app.get(['/health', `${mountPath}/health`], async (req: Request, res: Response) => {
    if (healthCheck) {
      await healthCheck(req, res);
    } else {
      let redisStatus = 'disconnected';
      try {
        const ping = await redis.ping();
        if (ping === 'PONG') {
          redisStatus = 'connected';
        }
      } catch (error) {
        console.error(`[${serviceName}] Redis health check failed:`, error);
      }
      res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        redis: redisStatus
      });
    }
  });

  app.use(mountPath, router);

  app.use((_req: Request, res: Response) => {
    res.status(404).json(fail([{ message: `Route not found in ${serviceName} service` }]));
  });

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(`[${serviceName}] ${err.stack}`);
    res.status(500).json(fail([{ message: err.message ?? 'Internal server error' }]));
  });

  if (port) {
    app.listen(port, async () => {
      console.log(`[${serviceName}] Server running on http://localhost:${port}`);
      if (onStart) {
        await onStart();
      }
    });
  }

  return app;
}

export { createProxy } from './proxy';
export type { ProxyOptions, ServiceRoute } from './proxy';

export { asyncHandler, ok, fail } from './async-handler';
export type { ApiError, ApiResponse, AsyncRequestHandler } from './async-handler';

export { JSON200, JSON400, JSON401, JSON403, JSON404, JSON500 } from './respond';
export { parseBody } from './parse-body';
