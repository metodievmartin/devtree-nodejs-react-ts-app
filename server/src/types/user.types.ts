import { Document } from 'mongoose';

/**
 * User document
 * Contains all fields of a user
 */
export interface IUser extends Document<string> {
  handle: string;
  name: string;
  email: string;
  password: string;
  description: string;
  image: string;
  links: string;
}

/**
 * User without sensitive information (password)
 * Used for attaching to requests and sending in responses
 */
export type SafeUser = Pick<
  IUser,
  '_id' | 'handle' | 'name' | 'email' | 'description' | 'image' | 'links'
>;

/**
 * Public user profile without sensitive information (password, email, _id)
 * Used for public-facing endpoints
 */
export type PublicUser = Pick<
  IUser,
  'handle' | 'name' | 'description' | 'image' | 'links'
>;

/**
 * User registration data
 * Contains all fields needed to create a new user
 */
export interface UserRegistrationData {
  email: string;
  password: string;
  handle: string;
  name: string;
  description?: string;
  image?: string;
  links?: string;
}

export type UserUpdateData = Pick<
  IUser,
  'name' | 'handle' | 'description' | 'links'
>;
