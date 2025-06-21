import slug from 'slug';

import {
  createUser,
  findUserByEmail,
  findUserByHandle,
} from '../models/user.model';
import { ApiError } from '../utils/api-error';
import { UserRegistrationData } from '../types/user.types';
import { comparePassword, generateJWT, hashPassword } from '../utils/auth';

/**
 * Register a new user
 * @param registrationData User registration data
 * @returns Created user document
 */
export const registerUser = async (registrationData: UserRegistrationData) => {
  const { email, password, handle } = registrationData;

  // Check if email is already taken
  const existingEmail = await findUserByEmail(email);

  if (existingEmail) {
    throw new ApiError(409, 'Email is already taken');
  }

  // Normalise the handle and check if it's already taken
  // E.g. "John Doe" -> "johndoe"
  const normalisedHandle = slug(handle, '');
  const existingHandle = await findUserByHandle(normalisedHandle);

  if (existingHandle) {
    throw new ApiError(409, 'Handle is already taken');
  }

  // Hash the password using the utility function
  const hashedPassword = await hashPassword(password);

  // Create the user with the same data but replace the password with the hashed one and the normalised handle
  return await createUser({
    ...registrationData,
    password: hashedPassword,
    handle: normalisedHandle,
  });

  // send confirmation email
};

/**
 * Login a user
 * @param email User's email address
 * @param password User's password
 * @returns User document or null if not found
 */
export const loginUser = async (email: string, password: string) => {
  // Return a generic error message to not reveal much information
  const invalidCredentialsMsg = 'Incorrect email or password';

  if (!email || !password) {
    throw new ApiError(401, invalidCredentialsMsg);
  }

  const user = await findUserByEmail(email);

  if (!user) {
    throw new ApiError(401, invalidCredentialsMsg);
  }

  const passwordMatch = await comparePassword(password, user.password);

  if (!passwordMatch) {
    throw new ApiError(401, invalidCredentialsMsg);
  }

  try {
    return generateJWT({
      id: user._id,
      email: user.email,
    });
  } catch (error) {
    console.error('JWT generation failed:', error);
    throw new ApiError(500, 'Something went wrong, please try again later');
  }
};
