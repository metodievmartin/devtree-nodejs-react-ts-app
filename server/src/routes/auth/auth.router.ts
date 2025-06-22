import { Router } from 'express';
import { body } from 'express-validator';

import * as authController from './auth.controller';
import { handleInputErrors } from '../../middlewares/validation.middleware';

const authRouter = Router();

authRouter.post(
  '/register',
  body('handle').notEmpty().withMessage('The Handle cannot be empty'),
  body('name').notEmpty().withMessage('The Name cannot be empty'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('The password must be at least 8 characters long'),
  handleInputErrors,
  authController.register
);

authRouter.post(
  '/login',
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage('The password is required'),
  handleInputErrors,
  authController.login
);

export default authRouter;
