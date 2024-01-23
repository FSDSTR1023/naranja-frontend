/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form';
import { useUser } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

const LoginPage = () => {
  const [isEye, setIsEye] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loginUserRequest, isAuthenticated } = useUser();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    await loginUserRequest(data);
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile-page');
    }
  }, [isAuthenticated]);

  return (
    <div className='flex flex-col items-center w-full h-full pt-[150px] bg-gradient-to-b from-yellow-100 via-blue-300 to-blue-700'>
      <h2 className='text-2xl font-semibold mb-4'>Login</h2>
      <form
        className='w-full max-w-lg'
        onSubmit={onSubmit}>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            {/* creo que iria aqui el label del email */}
            <label
              className='block text-start tracking-wide text-gray-700 text-sm font-bold mb-2 ml-2'
              htmlFor='email'>
              Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              {...register('email', { required: true })}
              placeholder='Email'
              required
              className='appearance-none block w-full bg-gray-200 text-gray-700 border
               border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none
                focus:bg-white focus:border-gray-500'
            />
          </div>
        </div>
        {errors.email && (
          <span className='text-red-500'>This field is required</span>
        )}
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            <div className='flex  items-center justify-between'>
              <label
                className='block text-start tracking-wide text-gray-700 text-sm font-bold mb-2 ml-2'
                htmlFor='email'>
                Password
              </label>
              <span className='text-sm mb-2 text-orange-500 underline'>
                <Link to='/password-recovery'> Forgot Your Password ?</Link>
              </span>
            </div>
            <div className='relative'>
              <input
                id='password'
                type={isEye ? 'text' : 'password'}
                name='password'
                {...register('password', { required: true })}
                placeholder='Password'
                required
                className='appearance-none block w-full bg-gray-200 text-gray-700 border
               border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 '
              />
              <span
                className=' absolute right-5 top-4 cursor-pointer'
                onClick={() => setIsEye(!isEye)}>
                {' '}
                {!isEye ? (
                  <IoEyeOffOutline size={18} />
                ) : (
                  <IoEyeOutline size={18} />
                )}
              </span>
            </div>
          </div>
        </div>
        {errors.password && (
          <span className='text-red-500'>This field is required</span>
        )}
        <div className='flex flex-wrap -mx-3'>
          <div className='w-full px-3 text-right'>
            <button
              type='submit'
              className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
