import { Router } from 'express';

import { getCurrentUser } from './user.controller';
import { authenticate } from '../../../middlewares/auth.middleware';

const userRouter = Router();

/**
 * @route   GET /api/v1/users/me
 * @desc    Get current authenticated user
 * @access  Private
 */
userRouter.get('/me', authenticate, getCurrentUser);

export default userRouter;
