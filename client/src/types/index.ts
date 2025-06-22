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

export type AuthResponse = {
  success: boolean;
  accessToken: string;
  user: User;
};
