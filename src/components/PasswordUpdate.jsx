/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { CheckCircleIcon } from '@heroicons/react/solid';

import { useUser } from '../context/UserContext';
const PasswordUpdate = () => {
  const { user, updateUserPassword } = useUser();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      console.log(errors, '<-- errors en el handleSubmit de PasswordUpdate');
      return;
    }

    updateUserPassword(user, password);
    alert('Contraseña actualizada correctamente.');
  });
  return (
    <div className='mb-2 flex justify-center w-auto rounded-md p-1'>
      <form onSubmit={onSubmit}>
        <div>
          <div className='flex justify-between'>
            <label
              htmlFor='email'
              className=' text-sm leading-6 text-gray-500'>
              Password
            </label>
          </div>
          <div className='my-2'>
            <input
              {...register('password', { required: true })}
              type='password'
              name='password'
              id='password'
              className=' w-full rounded-md border-0 py-1.5 px-1
               text-gray-900 shadow-sm ring-1 ring-inset
                ring-orange-300 placeholder:text-gray-400 
                focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 !important'
              placeholder='New Password'
              required
            />
          </div>
        </div>

        <div>
          <div className='flex '>
            <label
              htmlFor='confirmPassword'
              className='block text-sm text-gray-500 leading-6'>
              Confirm Password
            </label>
          </div>
          <div className='mt-2'>
            <input
              {...register('confirmPassword', {
                required: true,
                validate: (value) => {
                  value === getValues('password') ||
                    'The passwords do not match';
                },
              })}
              type='password'
              name='confirmPassword'
              id='confirmPassword'
              className=' w-full rounded-md border-0 py-1.5 px-1
               text-gray-900 shadow-sm ring-1 ring-inset
                ring-orange-300 placeholder:text-gray-400 
                focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
              placeholder='Confirm Your New Password'
              required
            />
          </div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          type='button'
          className='inline-flex  mt-7 items-center gap-x-1.5 rounded-md
           bg-orange-400 px-3 py-3 text-sm font-semibold
            text-white shadow-sm hover:bg-orange-700 
            focus-visible:outline focus-visible:outline-2 w-full
            focus-visible:outline-offset-2 focus-visible:outline-orange-600'>
          <CheckCircleIcon
            className='-ml-0.5 h-5 w-5'
            aria-hidden='true'
          />
          Cambiar Contraseña
        </button>
      </form>
    </div>
  );
};

export default PasswordUpdate;
