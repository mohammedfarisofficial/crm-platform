import { Router } from 'express';
import { brandsControllerV1 } from '../../controllers';
import { ENDPOINTS } from '@crm/utils/constants/endpoints';

const router = Router();

router.get(ENDPOINTS.BRANDS.GET_ALL, brandsControllerV1.getBrands);
router.get(ENDPOINTS.BRANDS.GET_BY_ID, brandsControllerV1.getBrandById);

export default router;
