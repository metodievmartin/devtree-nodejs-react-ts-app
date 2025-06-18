/**
 * Custom error class for API errors with status codes
 * Used to throw errors that will be properly formatted in responses
 * 
 * This class is designed for safe-to-display errors that won't leak any internal
 * system information. Only use this for user-facing error messages that are
 * appropriate to show in API responses.
 */
export class ApiError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
