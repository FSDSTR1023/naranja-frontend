/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const RegisterPage = () => {
  const { register, handleSubmit } = useForm();
  const { registerUserRequest, isAuthenticated } = useUser();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    await registerUserRequest(data);
  });
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/verify-email-page');
    }
  }, [isAuthenticated]);
  return (
    <nav className='w- full flex flex-col items-center justify-center p-4'>
      <h2 className='text-2xl font-semibold mb-4'>Create User</h2>
      <form
        className='w-full max-w-lg'
        onSubmit={onSubmit}>
        <div className='flex flex-wrap -mx-3 mb-4'>
          <div className='w-full px-3 mb-4 md:mb-0'>
            <input
              {...register('name', { required: true })}
              autoComplete='on'
              type='text'
              name='name'
              placeholder='Name'
              className='appearance-none block w-full bg-gray-200
               text-gray-700 border border-gray-200 rounded 
               py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white
                focus:border-gray-500'
            />
          </div>
          <div className='w-full px-3'>
            <input
              {...register('surname', { required: true })}
              type='text'
              name='surname'
              placeholder='Surname'
              className='appearance-none block w-full bg-gray-200 text-gray-700 border
               border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white
                focus:border-gray-500'
            />
          </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-4'>
          <div className='w-full px-3'>
            <input
              {...register('email', { required: true })}
              type='email'
              name='email'
              placeholder='Email'
              className='appearance-none block w-full bg-gray-200 text-gray-700 border 
              border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            />
          </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            <input
              {...register('password', { required: true })}
              type='password'
              name='password'
              placeholder='Password'
              className='appearance-none block w-full bg-gray-200 text-gray-700 border
               border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            />
          </div>
        </div>
        <div className='flex flex-wrap -mx-3'>
          <div className='w-full px-3 text-right'>
            <button
              type='submit'
              className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 
              px-4 rounded focus:outline-none focus:shadow-outline'>
              Submit
            </button>
          </div>
        </div>
      </form>
    </nav>
  );
};

export default RegisterPage;
