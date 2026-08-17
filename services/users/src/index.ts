import { createApp } from '@crm/http-server';
import router from './routes';
import { API_BASE } from '@crm/utils/constants/endpoints';
import { startRpcConsumers } from './rpc/users.rpc';

const PORT = process.env.PORT ?? 6062;

const app = createApp({
  serviceName: 'users',
  mountPath: API_BASE,
  router,
  port: PORT,
  onStart: startRpcConsumers
});

export default app;
