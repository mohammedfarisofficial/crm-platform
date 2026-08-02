import express, { Request, Response, NextFunction } from 'express';

const app = express();
const PORT = process.env.PORT ?? 6062;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get(['/', '/api/users'], (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Users Microservice is running' });
});

app.get(['/health', '/api/users/health'], (_req: Request, res: Response) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found in Users service' });
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error in Users service' });
});

app.listen(PORT, () => {
  console.log(`[users] Server running on http://localhost:${PORT}`);
});

export default app;
