import User from './user.mongo';
import { IUser, UserRegistrationData } from '../types/user.types';

/**
 * Find a user by their email address
 * @param email User's email address
 * @returns User document or null if not found
 */
export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email }, { __v: 0 }).exec();
};

/**
 * Find a user by their handle
 * @param handle User's handle
 * @returns User document or null if not found
 */
export const findUserByHandle = async (
  handle: string
): Promise<IUser | null> => {
  return User.findOne({ handle }, { __v: 0 }).exec();
};

/**
 * Find a user by their ID
 * @param id User's MongoDB ID
 * @returns User document or null if not found
 */
export const findUserById = async (id: string): Promise<IUser | null> => {
  return User.findById(id, { __v: 0 }).exec();
};

/**
 * Create a new user
 * @param userData User data including email, password, handle, and name
 * @returns Newly created user document
 */
export const createUser = async (
  userData: UserRegistrationData
): Promise<IUser> => {
  const user = new User(userData);
  return user.save();
};
