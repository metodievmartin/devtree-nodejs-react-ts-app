import { Request, Response } from 'express';

import { catchAsync } from '../../utils/catch-async';
import { UserRegistrationData } from '../../types/user.types';
import { loginUser, registerUser } from '../../services/auth.service';

/**
 * Register a new user
 * @route POST /auth/v1/register
 */
export const register = catchAsync(async (req: Request, res: Response) => {
  const { email, password, handle, name, description, image, links } = req.body;

  // Explicitly create the registration data object
  const registrationData: UserRegistrationData = {
    email,
    password,
    handle,
    name,
    description,
    image,
    links,
  };

  // Register the user
  const user = await registerUser(registrationData);

  // Return success response
  res.status(201).json({
    success: true,
    data: {
      user: {
        id: user._id,
        email: user.email,
        handle: user.handle,
        name: user.name,
        description: user.description,
        image: user.image,
        links: user.links,
      },
    },
  });
});

/**
 * User login
 * @route POST /auth/v1/login
 */
export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const accessToken = await loginUser(email, password);

  res.status(200).json({
    success: true,
    accessToken,
  });
});
