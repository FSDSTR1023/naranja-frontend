/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const { loginUserRequest, isAuthenticated } = useUser();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    await loginUserRequest(data);
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile-page');
    }
  }, [isAuthenticated]);

  return (
    <div style={{width: 1320, height: 53, background: 'linear-gradient(180deg, rgba(95.22, 48.86, 155.49, 0.50) 60%, rgba(98.27, 66.33, 139.80, 0) 100%)', 
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25) inset', 
    border: '1px rgba(0, 0, 0, 0.20) solid'}}>
     
      <div className='flex flex-col items-center justify-center p-4'>
      <h2 className='text-2xl font-semibold mb-4'>Login</h2>
      <form
        className='w-full max-w-lg'
        onSubmit={onSubmit}>


        <div className='my-10 flex flex-wrap -mx-3 mb-6 text-left text-ml-5'>
          <div className='w-full px-3'>
            
            <input
              id='email'
              type='email'
              name='email'
              {...register('email', { required: true })}
              
              required

              className='peer h-10 appearance-none block w-full bg-gray-200 text-gray-700 border placeholder-transparent
               border-gray-200 rounded py-3 px-4 mb-3 leading-tight  focus:outline-none
                focus:bg-white focus:border-gray-500'
                placeholder='Email address'
            />
            <label htmlFor="Email" className='absolute left-50 text-gray-900 text-sm transition-all
            peer-placeholder-shown:text-base 
          peer-placeholder-shown:text-gray-900'>Email address</label>
          </div>
          </div>

          <br />
          
        <div className='flex flex-wrap -mx-3 mb-6 text-left text-ml-5'>
          <div className='w-full px-3'>
          
            <input
              type='password'
              name='password'
              {...register('password', { required: true })}
              
              required

              className='peer h-10 appearance-none block w-full bg-gray-200 text-gray-700 border placeholder-transparent
              border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              
              placeholder='Password'
            />
            <label htmlFor="Password" className='absolute left-50 text-gray-900 text-sm transition-all  
          peer-placeholder-shown:text-base 
        peer-placeholder-shown:text-gray-900
       '>Password</label>
          </div>


        </div>
        <div className='flex flex-wrap -mx-3'>
          <div className='w-full px-3 text-right'>
            <button
              type='submit'
              className='bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
              Login
            </button>
          </div>
        </div>
      </form>
    </div> 
    </div>
  );
};

export default LoginPage;
