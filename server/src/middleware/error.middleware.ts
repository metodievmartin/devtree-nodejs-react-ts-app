import { Request, Response, NextFunction } from 'express';

import config from '../config/app.config';
import { ApiError } from '../utils/api-error';

type ErrorResponse = {
  success: boolean;
  error: string;
  stack?: string;
};

/**
 * Central error handling middleware
 * Catches errors from routes and sends appropriate responses
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const isDev = config.env === 'development';
  const isApiError = err instanceof ApiError;

  // Default status code and message for all not customer facing errors
  let statusCode = 500;
  let message = 'Something went wrong. Please try again later.';

  // If the error is an API error, use its status code and message
  if (isApiError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  const response: ErrorResponse = {
    success: false,
    error: message,
  };

  // Useful for debugging in development
  if (isDev) {
    console.error(err);
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};
