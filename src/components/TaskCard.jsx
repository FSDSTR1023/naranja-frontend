/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';


const TaskCard = ({ task }) => {
return (
    <div
    className='h-96 max-w-sm p-6 bg-white border
    border-gray-200 rounded-lg w-80 box-content '>
    <div className='flex flex-row justify-between'>
        <div className='flex p-2 gap-2 '>
        <button>
            <Link to={`/add-task/${task._id}`}>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-6 h-6'>
                <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                />
            </svg>
            </Link>
        </button>
        <button >
            <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6'>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
            />
            </svg>
        </button>
        </div>
        <div className='flex p-2 text-sm flex-col'>
        <p className='inline-flex items-center text-gray-400'>
            <strong className='text-gray-800'>Date start</strong>:{' '} 
            
            {new Date(task.dateStart).toLocaleDateString()}
        </p>
        <p className='inline-flex items-center text-gray-400'>
            <strong className='text-gray-800'>Date end</strong>:{' '}
            {new Date(task.dateEnd).toLocaleDateString()}
        </p>
        </div>
    </div>
    <div className='flex flex-row justify-between'>
        <h5 className='mb-2 text-2xl font-semibold tracking-tight text-gray-900 '>
        {task.title}
        </h5>
        <p className='text-sm p-2'>
        status: <em>{task.status}</em>
        </p>
    </div>
    <p className='mb-3 font-normal text-gray-500 dark:text-gray-400 h-40'>
        {task.description}
    </p>
    <div className='flex p-2 gap-2 flex-col'>
        <button
        type='button'
        value='inPogress'
        className='rounded bg-white px-2 py-1 text-xs font-semibold
        text-gray-900 shadow-sm ring-1 ring-inset ring-indigo-600 hover:bg-purple-600 hover:text-white'>
        Set in progress
        </button>

        <button
        type='button'
        value='completed'
        className='rounded bg-white px-2 py-1 text-xs font-semibold
        text-gray-900 shadow-sm ring-1 ring-inset ring-indigo-600 hover:bg-green-400 hover:text-white'>
        Set Completed
        </button>
    </div>
    </div>
);
};

export default TaskCard;