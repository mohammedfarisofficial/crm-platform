import { Router } from 'express';

import mutateRoutesV1 from './v1/mutate';
import queryRoutesV1 from './v1/query';

import mutateRoutesV2 from './v2/mutate';
import queryRoutesV2 from './v2/query';

import { VERSION, SERVICES } from '@crm/utils/constants/endpoints';

const usersRouter = Router();

usersRouter.use(`${VERSION.V1}${SERVICES.USERS}`, queryRoutesV1);
usersRouter.use(`${VERSION.V1}${SERVICES.USERS}`, mutateRoutesV1);

usersRouter.use(`${VERSION.V2}${SERVICES.USERS}`, queryRoutesV2);
usersRouter.use(`${VERSION.V2}${SERVICES.USERS}`, mutateRoutesV2);

export default usersRouter;
