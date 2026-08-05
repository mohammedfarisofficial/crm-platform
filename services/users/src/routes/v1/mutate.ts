import { Router } from 'express';
import { usersControllerV1 } from '../../controllers';
import { ENDPOINTS } from '@crm/utils/constants/endpoints';

const router = Router();

router.post(ENDPOINTS.USERS.REGISTER_USER, usersControllerV1.registerUser);

export default router;
