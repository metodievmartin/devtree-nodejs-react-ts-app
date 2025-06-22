import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';

import paths from '../utils/paths.ts';
import apiService from '../services/api.ts';
import type { LoginCredentials } from '../types';
import ErrorMessage from '../components/ErrorMessage.tsx';
import { handleApiErrorWithToast } from '../services/apiUtils.ts';

const LoginView = () => {
  const navigate = useNavigate();

  const initialValues: LoginCredentials = {
    email: '',
    password: '',
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleLogin = async (formData: LoginCredentials) => {
    try {
      await apiService.auth.login(formData);
      navigate(paths.admin.dashboard());
    } catch (error) {
      handleApiErrorWithToast(error, 'Login failed. Please try again.');
    }
  };

  return (
    <>
      <h1 className="text-4xl text-white font-bold">Login</h1>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
        noValidate
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Registration Email"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('email', {
              required: 'The email is required',
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: 'The email is not valid',
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Registration Password"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('password', {
              required: 'The password is required',
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value="Sign In"
        />
      </form>

      <nav className="mt-10">
        <Link
          className="text-center text-white text-lg block"
          to={paths.auth.register()}
        >
          Don't have an account? Create one here
        </Link>
      </nav>
    </>
  );
};

export default LoginView;
