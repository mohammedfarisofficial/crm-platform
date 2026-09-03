import { Router } from 'express';
import { brandsControllerV1 } from '../../controllers';
import { ENDPOINTS } from '@crm/utils/constants/endpoints';

const router = Router();

router.post(ENDPOINTS.BRANDS.CREATE, brandsControllerV1.createBrand);
router.put(ENDPOINTS.BRANDS.UPDATE, brandsControllerV1.updateBrand);
router.delete(ENDPOINTS.BRANDS.DELETE, brandsControllerV1.deleteBrand);

export default router;
