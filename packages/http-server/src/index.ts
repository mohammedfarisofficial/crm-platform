import express, { Router, Request, Response, NextFunction } from 'express';

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
    res.status(404).json({ error: `Route not found in ${serviceName} service` });
  });

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(`[${serviceName}] ${err.stack}`);
    res.status(500).json({ error: `Internal server error in ${serviceName} service` });
  });

  return app;
}

export { createProxy } from './proxy';
export type { ProxyOptions, ServiceRoute } from './proxy';
