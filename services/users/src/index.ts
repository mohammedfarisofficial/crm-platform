import { createApp } from '@crm/http-server';
import router from './routes';
import { API_BASE } from '@crm/utils/constants/endpoints';

const PORT = process.env.PORT ?? 6062;

const app = createApp({
  serviceName: 'users',
  mountPath: API_BASE,
  router,
});

app.listen(PORT, () => {
  console.log(`[users] Server running on http://localhost:${PORT}`);
});

export default app;
