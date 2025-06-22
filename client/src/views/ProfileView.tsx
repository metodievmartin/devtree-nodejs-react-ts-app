import type { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';

import type { ProfileForm } from '../types';
import ErrorMessage from '../components/ErrorMessage.tsx';

const ProfileView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: {
      handle: '',
      description: '',
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  };

  const handleUserProfileForm = (formData: ProfileForm) => {
    console.log(formData);
  };

  return (
    <form
      className="bg-white p-10 rounded-lg space-y-5"
      onSubmit={handleSubmit(handleUserProfileForm)}
    >
      <legend className="text-2xl text-slate-800 text-center">Edit info</legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Handle:</label>
        <input
          type="text"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Your handle or username"
          {...register('handle', {
            required: 'Handle is required field',
          })}
        />

        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description">Description:</label>
        <textarea
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Your description..."
          {...register('description', {
            required: 'Description is required field',
          })}
        />

        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Image:</label>
        <input
          id="image"
          type="file"
          name="handle"
          className="border-none bg-slate-100 rounded-lg p-2"
          accept="image/*"
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value="Save changes"
      />
    </form>
  );
};

export default ProfileView;
