/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

const RegisterPage = () => {
  const { register, handleSubmit } = useForm();
  const { registerUserRequest, isAuthenticated } = useUser();
  const [isEye, setIsEye] = useState(false);
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
    <div className='flex flex-col items-center w-full h-full pt-[150px]'>
      <h2 className='text-2xl font-semibold mb-2'>Register</h2>
      <form
        className='w-full max-w-lg'
        onSubmit={onSubmit}>
        <div className='flex flex-wrap -mx-3 mb-4'>
          <div className='w-full px-3 mb-4 md:mb-0'>
            <label
              className='block text-start tracking-wide text-gray-700 text-sm font-bold mb-2 ml-2'
              htmlFor='grid-name'>
              Name
            </label>
            <input
              {...register('name', { required: true })}
              autoComplete='on'
              type='text'
              name='name'
              id='name'
              placeholder='Name'
              className='appearance-none block w-full bg-gray-200
               text-gray-700 border border-gray-200 rounded 
               py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white
                focus:border-gray-500'
            />
          </div>
          <div className='w-full px-3'>
            <label
              className='block text-start tracking-wide text-gray-700 text-sm font-bold mb-2 ml-2'
              htmlFor='surname'>
              Surname
            </label>
            <input
              {...register('surname', { required: true })}
              type='text'
              name='surname'
              id='surname'
              placeholder='Surname'
              className='appearance-none block w-full bg-gray-200 text-gray-700 border
               border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white
                focus:border-gray-500'
            />
          </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-4'>
          <div className='w-full px-3'>
            <label
              className='block text-start tracking-wide text-gray-700 text-sm font-bold mb-2 ml-2'
              htmlFor='email'>
              Email
            </label>
            <input
              {...register('email', { required: true })}
              type='email'
              name='email'
              id='email'
              placeholder='Email'
              className='appearance-none block w-full bg-gray-200 text-gray-700 border 
              border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            />
          </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            <label
              className='block text-start tracking-wide text-gray-700 text-sm font-bold mb-2 ml-2'
              htmlFor='grid-name'>
              Password
            </label>
            <div className='relative'>
              <input
                {...register('password', { required: true })}
                type={isEye ? 'text' : 'password'}
                name='password'
                id='password'
                placeholder='Password'
                className='appearance-none block w-full bg-gray-200 text-gray-700 border
               border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              />
              <span
                className='absolute right-5 top-4 cursor-pointer'
                onClick={() => setIsEye(!isEye)}>
                {!isEye ? (
                  <IoEyeOffOutline size={18} />
                ) : (
                  <IoEyeOutline size={18} />
                )}
              </span>
            </div>
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
    </div>
  );
};

export default RegisterPage;
