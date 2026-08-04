import { Router } from 'express';
import { usersController } from '../controllers';

const router = Router();

router.post("/register-user", usersController.registerUser);

export default router;