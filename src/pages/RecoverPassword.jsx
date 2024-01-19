/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const RecoverPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { recoverPasswordRequest } = useUser();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    await recoverPasswordRequest(data);
    navigate('/login-page');
  });

  return (
    <div className='flex flex-col items-center w-full h-full mt-[150px]'>
      <h2 className='text-2xl font-semibold mb-4'>Recover Password</h2>
      <p className='mb-4 text-xs'>
        Enter your email address and we will send you an email with your new
        password.
      </p>
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

        <div className='flex flex-wrap -mx-3'>
          <div className='w-full px-3 text-right'>
            <button
              type='submit'
              className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
              Send Request
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RecoverPassword;
