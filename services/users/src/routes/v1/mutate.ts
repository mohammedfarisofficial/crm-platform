import { Router } from 'express';
import { usersControllerV1 } from '../../controllers';
import { ENDPOINTS } from '@crm/utils/constants/endpoints';

const router = Router();

router.post(ENDPOINTS.USERS.REGISTER_USER, usersControllerV1.registerUser);
router.get(ENDPOINTS.USERS.REGISTER_USER, (req, res) => res.json({ message: "This is a POST endpoint. Please send a POST request to register a user (v1)." }));

export default router;
