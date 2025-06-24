import { Router } from 'express';

import {
  authenticate,
  verifyOwnership,
} from '../../../middlewares/auth.middleware';
import { body } from 'express-validator';
import { handleInputErrors } from '../../../middlewares/validation.middleware';
import {
  getCurrentUser,
  updateUserProfile,
  uploadUserImage,
} from './user.controller';

const userRouter = Router();

/**
 * @route   GET /api/v1/users/me
 * @desc    Get current authenticated user
 * @access  Private
 */
userRouter.get('/me', authenticate, getCurrentUser);

/**
 * @route   PATCH /api/v1/users/:userId
 * @desc    Updates user profile
 * @access  Private
 * @param   userId - ID of the user to update
 */
userRouter.patch(
  '/:userId',
  authenticate,
  verifyOwnership('userId'),
  body('name').notEmpty().withMessage("The 'name' field cannot be empty"),
  body('handle').notEmpty().withMessage("The 'handle' field cannot be empty"),
  handleInputErrors,
  updateUserProfile
);

/**
 * @route   POST /api/v1/users/:userId/image
 * @desc    Uploads a user profile image
 * @access  Private
 * @param   userId - ID of the user to update
 */
userRouter.post(
  '/:userId/image',
  authenticate,
  verifyOwnership('userId'),
  uploadUserImage
);

export default userRouter;
