import { Router } from 'express';
import {
  getCurrentUser,
  updateUserProfile,
} from '../controllers/users.js';
import {
  validateUpdateUser,
} from '../middlewares/validation.js';

const router = Router();

router.get('/me', getCurrentUser);
router.patch('/me', validateUpdateUser, updateUserProfile);

export { router };
