import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useGroups } from '../context/GroupContext';
import PropTypes from 'prop-types';

const FormsTaskCreate = ({ users }) => {
  const { groups } = useGroups();
  const params = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const baseURL = 'http://localhost:4000'; // Replace with your server URL and port
      const endpoint = params.id ? `/tasks/${params.id}` : '/tasks';
      const method = params.id ? 'put' : 'post';
      const response = await axios[method](`${baseURL}${endpoint}`, data);
      console.log(response.data);
      // Handle success (mostrar algun mensaje de success)
    } catch (error) {
      console.error('Error submitting task:', error);
      // Handle error (mostrar algun mensaje de error)
    }
  });

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          {params.id ? 'Edit Task' : 'Create Task'}
        </h2>
      </div>
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' onSubmit={onSubmit}>
          {/* Title */}
          <div>
            <label htmlFor='title' className='block text-sm font-medium leading-6 text-gray-900'>
              Title
            </label>
            <div className='mt-2'>
              <input
                {...register('title', { required: true })}
                id='title'
                name='title'
                type='text'
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2'
              />
            </div>
            {errors.title && <span className='text-red-500'>This field is required</span>}
          </div>

          {/* Description */}
          <div className='col-span-full'>
            <label htmlFor='description' className='block text-sm font-medium leading-6 text-gray-900'>
              Description
            </label>
            <div className='mt-2'>
              <textarea
                {...register('description', { required: true })}
                id='description'
                name='description'
                rows={3}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2'
                defaultValue={''}
              />
            </div>
            {errors.description && <span className='text-red-500'>This field is required</span>}
            <p className='mt-3 text-sm leading-6 text-gray-600'>
              Description of your task
            </p>
          </div>

          {/* Date Start */}
          <div>
            <label htmlFor='dateStart' className='block text-sm font-medium leading-6 text-gray-900'>
              Date Start
            </label>
            <div className='mt-2'>
              <input
                {...register('dateStart', { required: true })}
                id='dateStart'
                name='dateStart'
                type='date'
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2'
              />
            </div>
            {errors.dateStart && <span className='text-red-500'>This field is required</span>}
          </div>

          {/* Date End */}
          <div>
            <label htmlFor='dateEnd' className='block text-sm font-medium leading-6 text-gray-900'>
              Date End
            </label>
            <div className='mt-2'>
              <input
                {...register('dateEnd', { required: true })}
                id='dateEnd'
                name='dateEnd'
                type='date'
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2'
              />
            </div>
            {errors.dateEnd && <span className='text-red-500'>This field is required</span>}
          </div>

          {/* Status Select */}
          <div>
            <label htmlFor='status' className='block text-sm font-medium leading-6 text-gray-900'>
              Select a Status
            </label>
            <div className='mt-2'>
              <select
                {...register('status', { required: true })}
                id='status'
                name='status'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2'
              >
                <option value=''>Select a Status</option>
                {/* Populate Status Options Here */}
              </select>
            </div>
            {errors.status && <span className='text-red-500'>This field is required</span>}
          </div>
          
          {/* Group Select */}
          <div>
            <label htmlFor='group' className='block text-sm font-medium leading-6 text-gray-900'>
              Group
            </label>
            <div className='mt-2'>
              <select
                {...register('group', { required: true })}
                id='group'
                name='group'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2'
              >
                <option value=''>Select a Group</option>
                {groups && groups.map(group => (
                  <option key={group._id} value={group._id}>{group.name}</option>
                ))}
              </select>
            </div>
            {errors.group && <span className='text-red-500'>This field is required</span>}
          </div>


          {/* User Select */}
          <div>
            <label htmlFor='user' className='block text-sm font-medium leading-6 text-gray-900'>
              User
            </label>
            <div className='mt-2'>
              <select
                {...register('user', { required: true })}
                id='user'
                name='user'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2'
              >
                <option value=''>Select a User</option>
                {users && users.map(user => (
                  <option key={user._id} value={user._id}>{user.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Task */}
          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Submit Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

FormsTaskCreate.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired
};

export default FormsTaskCreate;
