import { Router } from 'express';
import { authControllerV1 } from '../../controllers';
import { authMiddleware } from '../../middlewares';
import { ENDPOINTS } from '@crm/utils/constants/endpoints';

const router = Router();

// Public routes (with IP block checks)
router.post(ENDPOINTS.AUTHENTICATION.SIGN_UP, authMiddleware.ipBlockCheck, authControllerV1.signup);
router.post(ENDPOINTS.AUTHENTICATION.SIGN_IN, authMiddleware.ipBlockCheck, authControllerV1.login);

// OTP routes
router.post(ENDPOINTS.AUTHENTICATION.VERIFY_OTP, authControllerV1.verifyOtp);
router.post(ENDPOINTS.AUTHENTICATION.RESEND_OTP, authMiddleware.otpRateLimiter, authControllerV1.resendOtp);

// Refresh route (uses cookie)
router.post(ENDPOINTS.AUTHENTICATION.REFRESH, authControllerV1.refresh);

// Protected routes (require valid access token)
router.post(ENDPOINTS.AUTHENTICATION.LOGOUT, authMiddleware.verifyAccessToken, authControllerV1.logout);
router.post(ENDPOINTS.AUTHENTICATION.LOGOUT_ALL, authMiddleware.verifyAccessToken, authControllerV1.logoutAll);

export default router;
