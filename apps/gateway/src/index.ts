import express, { Request, Response, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = process.env.PORT ?? 6060;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Microservices Proxy Routes
app.use('/api/authenticate', createProxyMiddleware({ 
  target: 'http://localhost:6061', 
  changeOrigin: true 
}));

app.use('/api/users', createProxyMiddleware({ 
  target: 'http://localhost:6062', 
  changeOrigin: true 
}));

// Routes
app.get('/', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'CRM Gateway API is running' });
});

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
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
  console.log(`[gateway] Server running on http://localhost:${PORT}`);
});

export default app;
