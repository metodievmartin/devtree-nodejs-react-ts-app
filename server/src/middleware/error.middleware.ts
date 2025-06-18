import { Request, Response, NextFunction } from 'express';

import config from '../config/app.config';
import { ApiError } from '../utils/api-error';

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

  const statusCode = isApiError ? err.statusCode : 500;
  const message = isApiError ? err.message : 'Internal Server Error';

  const response = {
    error: message,
    ...(isDev && { stack: err.stack }),
  };

  if (isDev) {
    console.error(err);
  }

  res.status(statusCode).json(response);
};
