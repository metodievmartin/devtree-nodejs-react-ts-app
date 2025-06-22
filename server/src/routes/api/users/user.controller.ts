import { Request, Response } from 'express';

import { catchAsync } from '../../../utils/catch-async';

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
