import express, { Router, Request, Response, NextFunction } from 'express';

export interface AppOptions {
  /** Service name shown in logs and error messages, e.g. "users" */
  serviceName: string;
  /** Mount path prefix for the service router, e.g. "/api/users" */
  mountPath: string;
  /** The service's own router containing all its routes */
  router: Router;
}

/**
 * Creates a pre-configured Express app shared across all services.
 * Handles: JSON/urlencoded middleware, root + health routes, 404, and error handler.
 *
 * Usage in a service's index.ts:
 *   import { createApp } from '@crm/http-server';
 *   import router from './routes';
 *   const app = createApp({ serviceName: 'users', mountPath: '/api/users', router });
 *   app.listen(PORT);
 */
export function createApp({ serviceName, mountPath, router }: AppOptions) {
  const app = express();

  // ── Middleware ───────────────────────────────────────────────────────────
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // ── Health & root routes ─────────────────────────────────────────────────
  app.get(['/', mountPath], (_req: Request, res: Response) => {
    res.json({ status: 'ok', message: `${serviceName} service is running` });
  });

  app.get(['/health', `${mountPath}/health`], (_req: Request, res: Response) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
  });

  // ── Service routes ───────────────────────────────────────────────────────
  app.use(mountPath, router);

  // ── 404 handler ──────────────────────────────────────────────────────────
  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: `Route not found in ${serviceName} service` });
  });

  // ── Error handler ─────────────────────────────────────────────────────────
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(`[${serviceName}] ${err.stack}`);
    res.status(500).json({ error: `Internal server error in ${serviceName} service` });
  });

  return app;
}

export { createProxy } from './proxy';
export type { ProxyOptions, ServiceRoute } from './proxy';
