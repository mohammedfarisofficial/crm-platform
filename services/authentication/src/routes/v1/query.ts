import { Router } from 'express';
import { authControllerV1 } from '../../controllers';
import { authMiddleware } from '../../middlewares';
import { ENDPOINTS } from '@crm/utils/constants/endpoints';

const router = Router();

// Protected routes
router.get(ENDPOINTS.AUTHENTICATION.SESSIONS, authMiddleware.verifyAccessToken, authControllerV1.getSessions);

export default router;
