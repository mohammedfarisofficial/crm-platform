import { createApp } from '@crm/http-server';
import routes from './routes';
import { API_BASE } from '@crm/utils/constants/endpoints';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT ?? 6061;

const app = createApp({
  serviceName: 'authentication',
  mountPath: API_BASE,
  router: routes,
  port: PORT,
  customMiddlewares: [cookieParser()]
});

export default app;
