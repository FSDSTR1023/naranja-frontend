import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const FormsTaskCreate = () => {
  const params = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit(() => {});
  // Falta agregar la funcionalidad de crear y editar tareas
  // Falta un select donde habria que mapear los grupos existentes.
  // Falta un select donde habria que mapear los usuarios existentes.
  // Falta agregar el date Start
  // Falta editar el deadLine a Date End
  // Falta agregar la funcionalidad de agregar un archivo que podria ser imagen o pdf

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            {params.id ? 'Edit Task' : 'Create Task'}
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form
            className='space-y-6'
            onSubmit={onSubmit}>
            <div>
              <label
                htmlFor='title'
                className='block text-sm font-medium leading-6 text-gray-900'>
                Title
              </label>
              <div className='mt-2'>
                <input
                  {...register('title', { required: true })}
                  id='title'
                  name='title'
                  type='text'
                  required
                  className='block w-full rounded-md border-0 
                  py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300
                   placeholder:text-gray-400 
                   focus:ring-2 focus:ring-inset
                    focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2  '
                />
              </div>
              {errors.title && (
                <span className='text-red-500'>This field is required</span>
              )}
            </div>
            <div className='col-span-full'>
              <label
                htmlFor='description'
                className='block text-sm font-medium leading-6 text-gray-900'>
                Description
              </label>
              <div className='mt-2'>
                <textarea
                  {...register('description', { required: true })}
                  id='description'
                  name='description'
                  rows={3}
                  className='block w-full rounded-md border-0 
                  py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset
                 ring-gray-300 placeholder:text-gray-400 
                 focus:ring-2 focus:ring-inset                  focus:ring-indigo-600 
                  sm:text-sm sm:leading-6 p-2'
                  defaultValue={''}
                />
              </div>
              <p className='mt-3 text-sm leading-6 text-gray-600'>
                Description of your task
              </p>
            </div>
            {errors.description && (
              <span className='text-red-500'>This field is required</span>
            )}
            <div>
              <label
                htmlFor='deadLine'
                className='block text-sm font-medium leading-6 text-gray-900'>
                Dead Line
              </label>
              <div className='mt-2'>
                <input
                  {...register('deadLine', { required: true })}
                  id='deadLine'
                  name='deadLine'
                  type='date'
                  required
                  className='block w-full rounded-md border-0 
                  py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300
                   placeholder:text-gray-400 
                   focus:ring-2 focus:ring-inset
                    focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2  '
                />
              </div>
              {errors.deadLine && (
                <span className='text-red-500'>This field is required</span>
              )}
            </div>
            <div className='flex items-center ps-4 border border-gray-300 rounded-md '>
              <input
                {...register('isPrivate', { required: false })}
                id='bordered-checkbox-1'
                type='checkbox'
                value=''
                name='bordered-checkbox'
                className='w-4 h-4 text-blue-600 
       shadow-sm ring-1 
                  ring-inset ring-gray-300
                   placeholder:text-gray-400 
                   focus:ring-2 focus:ring-inset
                    focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2'
              />
              <label
                htmlFor='bordered-checkbox-1'
                className='w-full py-2 ms-2 
    text-sm font-medium text-gray-900'>
                Make it Public
              </label>
            </div>

            <div>
              <label
                htmlFor='status'
                className='block text-sm font-medium leading-6 text-gray-900'>
                Select a Status
              </label>
              <div className='mt-2'>
                <select
                  {...register('status', { required: true })}
                  id='status'
                  name='status'
                  className='block w-full rounded-md border-0 
                  py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300
                   placeholder:text-gray-400 
                   focus:ring-2 focus:ring-inset
                    focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2  '>
                  <option selected>Choose a status</option>
                  {/* groups.map((group)=> {
                    return <option value={group._id} key= {group._id}>{group.name}</option>
                  })*/}
                </select>
              </div>
              {errors.status && (
                <span className='text-red-500'>This field is required</span>
              )}
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold 
                leading-6 text-white shadow-sm
                 hover:bg-indigo-500 
                 focus-visible:outline 
                 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                Submit Task
              </button>
              <div className='flex flex-col mt-2 text-center'></div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormsTaskCreate;
