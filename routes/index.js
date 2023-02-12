import { Router } from 'express';
import { PAGE_NOT_FOUND } from '../utils/constants.js';
import { router as userRouter } from './users.js';
import { router as movieRouter } from './movies.js';
import { auth } from '../middlewares/auth.js';
import { NotFoundError } from '../errors/index.js';
import {
  validateRegisterBody,
  validateAuthBody,
} from '../middlewares/validation.js';
import {
  authUser,
  registerUser,
} from '../controllers/users.js';

const router = Router();

router.post('/signup', validateRegisterBody, registerUser);
router.post('/signin', validateAuthBody, authUser);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.use('*', auth, (req, res, next) => next(new NotFoundError(PAGE_NOT_FOUND)));

export { router };
