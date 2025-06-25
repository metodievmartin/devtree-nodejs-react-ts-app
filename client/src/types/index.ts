export type User = {
  _id: string;
  handle: string;
  name: string;
  email: string;
  description: string;
  image: string;
  links: string;
};

export type RegisterData = Pick<User, 'handle' | 'email' | 'name'> & {
  password: string;
  password_confirmation: string;
};

export type LoginCredentials = Pick<User, 'email'> & {
  password: string;
};

export type UserUpdateData = Omit<User, '_id' | 'email'>;

export type AuthResponse = {
  success: boolean;
  accessToken: string;
  user: User;
};

export type UserApiResponse = {
  success: boolean;
  user: User;
};

export type ProfileForm = Pick<User, 'name' | 'handle' | 'description'>;

export type SocialNetwork = {
  id: number;
  name: string;
  url: string;
  enabled: boolean;
};

export type DevTreeLink = Pick<SocialNetwork, 'name' | 'url' | 'enabled'>;
