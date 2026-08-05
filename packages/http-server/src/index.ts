import express, { Router, Request, Response, NextFunction } from 'express';
import { fail } from './async-handler';

export interface AppOptions {
  serviceName: string;
  mountPath: string;
  router: Router;
}

export function createApp({ serviceName, mountPath, router }: AppOptions) {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get(['/', mountPath], (_req: Request, res: Response) => {
    res.json({ status: 'ok', message: `${serviceName} service is running` });
  });

  app.get(['/health', `${mountPath}/health`], (_req: Request, res: Response) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
  });

  app.use(mountPath, router);

  app.use((_req: Request, res: Response) => {
    res.status(404).json(fail([{ message: `Route not found in ${serviceName} service` }]));
  });

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(`[${serviceName}] ${err.stack}`);
    res.status(500).json(fail([{ message: err.message ?? 'Internal server error' }]));
  });

  return app;
}

export { createProxy } from './proxy';
export type { ProxyOptions, ServiceRoute } from './proxy';

export { asyncHandler, ok, fail } from './async-handler';
export type { ApiError, ApiResponse, AsyncRequestHandler } from './async-handler';

export { JSON200, JSON400 } from './respond';
export { parseBody } from './parse-body';
