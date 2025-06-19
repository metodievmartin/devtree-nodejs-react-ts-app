import { Request, Response } from 'express';

import { catchAsync } from '../../utils/catch-async';

/**
 * Register a new user
 * @route POST /api/auth/register
 */
export const register = catchAsync(async (req: Request, res: Response) => {
  // TODO: implement user registration
  console.log('body: ', req.body);
  res.status(201).json({
    status: 'success',
  });
});
