import { Request, Response } from 'express';

import { catchAsync } from '../../../utils/catch-async';
import { updateUserProfile as updateProfile } from '../../../services/user.service';

/**
 * Get the currently authenticated user
 */
export const getCurrentUser = catchAsync(
  async (req: Request, res: Response) => {
    // The user is already attached to the request by the authenticate middleware
    // We just need to return it
    res.status(200).json({
      success: true,
      user: req.user,
    });
  }
);

/**
 * Update the user profile
 */
export const updateUserProfile = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { name, handle, description = '' } = req.body;

    // Update the user profile using the service
    const updatedUser = await updateProfile(userId, {
      name,
      handle,
      description,
    });

    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  }
);
