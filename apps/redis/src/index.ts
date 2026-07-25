import express, { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';

const app = express();
const PORT = process.env.PORT ?? 6063;
const REDIS_URL = process.env.REDIS_URL ?? 'redis://localhost:6379';

// Initialize Redis client
const redis = new Redis(REDIS_URL);

redis.on('ready', () => {
  console.log('[redis-server] Connected and ready to receive commands');
});


redis.on('error', (err) => {
  console.error('[redis-server] Redis connection error:', err);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'CRM Redis Microservice is running' });
});

app.get('/health', async (_req: Request, res: Response) => {
  try {
    // Ping redis to check health
    await redis.ping();
    res.json({ status: 'healthy', redis: 'connected', timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ status: 'unhealthy', redis: 'disconnected', error: String(err) });
  }
});

// Basic KV example endpoints
app.post('/api/cache', async (req: Request, res: Response) => {
  const { key, value, expireSeconds } = req.body;
  if (!key || !value) {
    return res.status(400).json({ error: 'Key and value are required' });
  }

  try {
    if (expireSeconds) {
      await redis.set(key, JSON.stringify(value), 'EX', expireSeconds);
    } else {
      await redis.set(key, JSON.stringify(value));
    }
    res.json({ success: true, key });
  } catch (err) {
    res.status(500).json({ error: 'Failed to set cache' });
  }
});

app.get('/api/cache/:key', async (req: Request, res: Response) => {
  const { key } = req.params;
  try {
    const value = await redis.get(key);
    if (!value) {
      return res.status(404).json({ error: 'Key not found' });
    }
    res.json({ success: true, key, value: JSON.parse(value) });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get cache' });
  }
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`[redis-server] Server running on http://localhost:${PORT}`);
});

export default app;
