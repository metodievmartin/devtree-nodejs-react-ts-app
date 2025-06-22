import { validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

/**
 * Express middleware to handle validation errors from express-validator
 * 
 * This middleware checks if there are any validation errors from previous
 * validation middleware (e.g., from express-validator's body, param, query validators).
 * If errors are found, it returns a 400 Bad Request response with the error details.
 * Otherwise, it passes control to the next middleware in the chain.
 * 
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 * @returns Either calls next() to continue or returns a 400 response with validation errors
 */
export const handleInputErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }

  next();
};
