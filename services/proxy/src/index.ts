import { createProxy } from '@crm/http-server';
import { URLS } from '@crm/utils/constants/urls';
import { SERVICES, VERSION, API_BASE } from '@crm/utils/constants/endpoints';

const PORT = process.env.PORT ?? 6060;

const authenticationService = {
  path: `${API_BASE}${VERSION.V1}${SERVICES.AUTHENTICATION}`,
  target: URLS.AUTHENTICATION_SERVICE_URL,
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many authentication attempts. Try again later.' },
  },
}

const usersService = {
  path: `${API_BASE}${VERSION.V1}${SERVICES.USERS}`,
  target: URLS.USERS_SERVICE_URL,
}

const brandsService = {
  path: `${API_BASE}${VERSION.V1}${SERVICES.BRANDS}`,
  target: URLS.BRANDS_SERVICE_URL,
}

const app = createProxy({
  name: 'proxy',
  services: [authenticationService, usersService, brandsService],
});

app.listen(PORT, () => {
  console.log(JSON.stringify({
    level: 'info',
    message: `[proxy] Running on port ${PORT}`,
  }));
});

export default app;