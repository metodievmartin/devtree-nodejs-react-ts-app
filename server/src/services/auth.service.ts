import {
  createUser,
  findUserByEmail,
  findUserByHandle,
} from '../models/user.model';
import { hashPassword } from '../utils/auth';
import { ApiError } from '../utils/api-error';
import { UserRegistrationData } from '../types/user.types';

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

  // Check if the handle is already taken
  const existingHandle = await findUserByHandle(handle);

  if (existingHandle) {
    throw new ApiError(409, 'Handle is already taken');
  }

  // Hash the password using the utility function
  const hashedPassword = await hashPassword(password);

  // Create the user with the same data but replace the password with the hashed one
  return await createUser({
    ...registrationData,
    password: hashedPassword,
  });

  // send confirmation email
};
