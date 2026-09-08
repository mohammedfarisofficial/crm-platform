import { Router } from 'express';

import queryRoutesV1 from './v1/query';
import mutateRoutesV2 from './v2/mutate';
import queryRoutesV2 from './v2/query';

import { VERSION, SERVICES } from '@crm/utils/constants/endpoints';

const brandsRouter = Router();

brandsRouter.use(`${VERSION.V1}${SERVICES.BRANDS}`, queryRoutesV1);

brandsRouter.use(`${VERSION.V2}${SERVICES.BRANDS}`, queryRoutesV2);
brandsRouter.use(`${VERSION.V2}${SERVICES.BRANDS}`, mutateRoutesV2);

export default brandsRouter;
