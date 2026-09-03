import { createApp } from '@crm/http-server';
import router from './routes';
import { API_BASE } from '@crm/utils/constants/endpoints';
import { startRpcConsumers } from './rpc/brands.rpc';

const PORT = process.env.PORT ?? 6063;

const app = createApp({
  serviceName: 'brands',
  mountPath: API_BASE,
  router,
  port: PORT,
  onStart: startRpcConsumers
});

export default app;
