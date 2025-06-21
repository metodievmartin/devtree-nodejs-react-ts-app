import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../config/app.config';
import { AppJwtPayload } from '../types/auth.types';

const SALT_ROUNDS = 10;

/**
 * Hashes a password using bcrypt with a predefined number of salt rounds
 * @param password - The plain text password to hash
 * @returns A promise that resolves to the hashed password string
 */
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(password, salt);
};

/**
 * Compares a plain text password with a hashed password
 * @param enteredPassword - The plain text password to check
 * @param hash - The hashed password to compare against
 * @returns A promise that resolves to a boolean indicating if the passwords match
 */
export const comparePassword = async (
  enteredPassword: string,
  hash: string
) => {
  return await bcrypt.compare(enteredPassword, hash);
};

/**
 * Verifies a JWT token and returns the decoded payload
 * @param token - The JWT token to verify
 * @returns The decoded token payload
 * @throws {jwt.JsonWebTokenError} If the token is invalid
 * @throws {jwt.TokenExpiredError} If the token has expired
 */
export const verifyJWT = (token: string): AppJwtPayload => {
  return jwt.verify(token, config.jwt.secret) as AppJwtPayload;
};

/**
 * Generates a JWT token with the provided payload
 * @param payload - The data to include in the JWT payload. Must contain at least 'id' and 'email'.
 * @returns A signed JWT token string
 * @throws {Error} If JWT secret is not configured
 * @throws {Error} If payload is missing required fields (id, email)
 * @throws {JsonWebTokenError} If token signing fails
 * @example
 * const token = generateJWT({ id: '123', email: 'user@example.com' });
 * // Returns a JWT token that expires in 30 days (as per config)
 */
export const generateJWT = (payload: AppJwtPayload): string => {
  if (!config.jwt.secret) {
    throw new Error('JWT secret is not configured');
  }

  if (!payload?.id || !payload?.email) {
    throw new Error('Payload must contain id and email');
  }

  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};
