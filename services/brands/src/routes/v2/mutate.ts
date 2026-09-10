import { Router } from 'express';
import { verifyToken } from '@crm/http-server';
import { ENDPOINTS } from '@crm/utils/constants/endpoints';
import { brandsControllerV1, brandsControllerV2 } from '../../controllers';

const router = Router();

router.use(verifyToken);

router.post(ENDPOINTS.BRANDS.CREATE, brandsControllerV1.createBrand);
router.put(ENDPOINTS.BRANDS.UPDATE, brandsControllerV1.updateBrand);
router.delete(ENDPOINTS.BRANDS.DELETE, brandsControllerV1.deleteBrand);
router.post(ENDPOINTS.BRANDS.CREATE_LEAD, brandsControllerV2.createLead)

export default router;