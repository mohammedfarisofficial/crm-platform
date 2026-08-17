import express, { Request, Response, NextFunction } from 'express';

const app = express();
const PORT = process.env.PORT ?? 6061;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import { redis } from '@crm/redis';

// Routes
app.get(['/', '/api/authenticate'], (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Authenticate Microservice is running' });
});

app.get(['/health', '/api/authenticate/health', '/api/v1/authenticate/health'], async (_req: Request, res: Response) => {
  let redisStatus = 'disconnected';
  try {
    const ping = await redis.ping();
    if (ping === 'PONG') {
      redisStatus = 'connected';
    }
  } catch (error) {
    console.error('Redis health check failed:', error);
  }

  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    redis: redisStatus
  });
});
// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found in Authenticate service' });
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error in Authenticate service' });
});

app.listen(PORT, () => {
  console.log(`[authenticate] Server running on http://localhost:${PORT}`);
});

export default app;
