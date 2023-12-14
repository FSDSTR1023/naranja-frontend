/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { CheckCircleIcon } from '@heroicons/react/solid';
const PasswordUpdate = ({ user, updateUserPassword }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      console.log(errors, '<-- errors en el handleSubmit de PasswordUpdate');
      return;
    }
    const newUserData = {
      ...user,
      password: password,
    };
    updateUserPassword(newUserData);
  });
  return (
    <div className='m-1 flex w-auto border-2 border-gray-300 rounded-md p-2'>
      <form onSubmit={onSubmit}>
        <div>
          <div className='flex justify-between'>
            <label
              htmlFor='email'
              className=' text-sm leading-6 text-gray-500'>
              Password
            </label>
          </div>
          <div className='mt-2'>
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
          type='submit'
          className='inline-flex  mt-2 items-center gap-x-1.5 rounded-md
           bg-orange-400 px-2.5 py-1.5 text-sm font-semibold
            text-white shadow-sm hover:bg-orange-700 
            focus-visible:outline focus-visible:outline-2 
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
