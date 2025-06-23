import slug from 'slug';

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

/**
 * Create a handle from a string
 * @param input String to create the `handle` from
 * @param [replacement] Optional string to replace spaces with
 *
 * @example
 * createHandle('John Doe'); // 'johndoe'
 * createHandle('John Doe!@£$[', '-'); // → "john-doe"
 * createHandle("Mário's Café #12]", '-'); // → "marios-cafe-12"
 * createHandle('  Foo/Bar_baz '); // → "foobarbaz"
 *
 * @returns Handle string
 */
export const createHandle = (input: string, replacement?: string): string => {
  return slug(input, {
    replacement: replacement || '', // Replace spaces with provided character, defaults to empty string
    remove: /[*+~.()'"!:@^%&=/\\#?,<>\[\]{}|`]/g, // Remove special characters
    lower: true, // The result will be lowercased
    trim: true, // Trim leading/trailing separator
  });
};
