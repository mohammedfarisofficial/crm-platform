import { Router } from 'express';
import { brandsControllerV1, brandsControllerV2 } from '../../controllers';
import { ENDPOINTS } from '@crm/utils/constants/endpoints';
import { verifyToken } from '@crm/http-server';

const router = Router();

router.use(verifyToken);

router.get(ENDPOINTS.BRANDS.GET_ALL, brandsControllerV1.getBrands);
router.get(ENDPOINTS.BRANDS.GET_ALL_LEADS, brandsControllerV2.getLeads);

export default router;
