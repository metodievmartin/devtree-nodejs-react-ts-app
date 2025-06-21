export type User = {
  _id: string;
  handle: string;
  name: string;
  email: string;
  description: string;
  image: string;
  links: string;
};

export type RegisterForm = Pick<User, 'handle' | 'email' | 'name'> & {
  password: string;
  password_confirmation: string;
};

export type LoginForm = Pick<User, 'email'> & {
  password: string;
};
