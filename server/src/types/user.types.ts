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
