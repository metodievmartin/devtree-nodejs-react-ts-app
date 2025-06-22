import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

import { verifyJWT } from '../utils/auth';
import { ApiError } from '../utils/api-error';
import { SafeUser } from '../types/user.types';
import { catchAsync } from '../utils/catch-async';
import { AppJwtPayload } from '../types/auth.types';
import { findUserById } from '../models/user.model';

// Extend Express Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: SafeUser;
    }
  }
}

/**
 * Express middleware to protect routes that require authentication
 *
 * This middleware validates the JWT token from the Authorization header.
 * If valid, it fetches the user from the database and adds it to the request object.
 * If invalid, missing, or the user no longer exists, it throws an ApiError.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const authenticate = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Authentication required');
    }

    // Extract the token (remove "Bearer " prefix)
    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new ApiError(401, 'Authentication token missing');
    }

    let decoded: AppJwtPayload;

    try {
      // Verify the token and extract payload
      decoded = verifyJWT(token);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new ApiError(401, 'Authentication token expired');
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new ApiError(401, 'Invalid authentication token');
      }
      throw new ApiError(500, 'Authentication error');
    }

    // Fetch the user from the database to ensure they exist
    const user = await findUserById(decoded.id);

    if (!user) {
      throw new ApiError(401, 'Invalid user');
    }

    // Add user data to request for use in route handlers
    // Omit password and explicitly pass the necessary fields by using the SafeUser type
    const safeUser: SafeUser = {
      _id: user._id,
      email: user.email,
      name: user.name,
      handle: user.handle,
      description: user.description,
      image: user.image,
      links: user.links,
    };

    req.user = safeUser;

    next();
  }
);
