import { Router } from 'express';

import mutateRoutesV1 from './v1/mutate';
import queryRoutesV1 from './v1/query';

import { VERSION, SERVICES } from '@crm/utils/constants/endpoints';

const brandsRouter = Router();

brandsRouter.use(`${VERSION.V1}${SERVICES.BRANDS}`, queryRoutesV1);
brandsRouter.use(`${VERSION.V1}${SERVICES.BRANDS}`, mutateRoutesV1);

export default brandsRouter;
