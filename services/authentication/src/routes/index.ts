import { Router } from 'express';

import mutateRoutesV1 from './v1/mutate';
import queryRoutesV1 from './v1/query';

import { VERSION, SERVICES } from '@crm/utils/constants/endpoints';

const authRouter = Router();

authRouter.use(`${VERSION.V1}${SERVICES.AUTHENTICATION}`, queryRoutesV1);
authRouter.use(`${VERSION.V1}${SERVICES.AUTHENTICATION}`, mutateRoutesV1);

export default authRouter;
