import { Request, Response } from 'express';

import { catchAsync } from '../../../utils/catch-async';
import {
  updateUserProfile as updateProfileService,
  uploadUserImage as uploadUserImageService,
} from '../../../services/user.service';

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
    const { name, handle, description = '', links } = req.body;

    // Update the user profile using the service
    const updatedUser = await updateProfileService(userId, {
      name,
      handle,
      description,
      links,
    });

    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  }
);

/**
 * Upload a user's profile image
 * Requires authentication and ownership verification
 */
export const uploadUserImage = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.params.userId;

    const result = await uploadUserImageService(req, userId);

    res.status(200).json({
      success: true,
      imageUrl: result.imageUrl,
    });
  }
);
