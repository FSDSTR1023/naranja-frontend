import { useForm } from 'react-hook-form';
import { useUser } from '../context/UserContext';
const UserStatusHandler = () => {
  const { register, handleSubmit } = useForm();
  const { isOnline, setIsOnline, user, updateIsOnline } = useUser();

  const onSubmit = handleSubmit((data) => {
    console.log(data.isOnline);
    setIsOnline(data.isOnline);
    updateIsOnline(user, data.isOnline);
  });

  return (
    <div className=' rounded-md w-full'>
      <form onSubmit={onSubmit}>
        <label
          htmlFor='isOnline'
          className='block text-sm font-medium leading-6 text-gray-900'>
          Status{' '}
          {isOnline === 'Online' ? '🟢' : isOnline === 'Busy' ? '🟡' : '🔴'}
        </label>
        <select
          {...register('isOnline', { required: true })}
          id='isOnline'
          name='isOnline'
          className='mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset
           ring-gray-300 focus:ring-2 focus:ring-orange-600 sm:text-sm sm:leading-6'
          defaultValue='Offline'>
          <option>Offline</option>
          <option>Online</option>
          <option>Busy</option>
        </select>
        <button
          onClick={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          type='button'
          className='cursor-pointer bg-orange-400 text-white p-2 my-2 rounded-md hover:bg-orange-700'>
          Change Status
        </button>
      </form>
    </div>
  );
};

export default UserStatusHandler;
