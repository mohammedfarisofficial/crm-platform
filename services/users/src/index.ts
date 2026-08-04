import { createApp } from '@crm/http-server';
import router from './routes';

const PORT = process.env.PORT ?? 6062;

const app = createApp({
  serviceName: 'users',
  mountPath: '/api/users',
  router,
});

app.listen(PORT, () => {
  console.log(`[users] Server running on http://localhost:${PORT}`);
});

export default app;
