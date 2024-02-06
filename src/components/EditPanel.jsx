import clsx from 'clsx';
import { BiEdit, BiTrash } from 'react-icons/bi';

const EditPanel = ({ handleDelete, handleEdit, message, tooglePanel }) => {
  return (
    <ul
      className={clsx(
        ` absolute top-6 right-6 translate-x-1/2 transition ease-in-out duration-500 w-fit h-auto p-2 rounded-md z-10 bg-gray-300 `
      )}>
      <li
        className='flex items-center justify-center text-[10px] font-bold uppercase
       text-gray-500 cursor-pointer w-full hover:text-gray-800'>
        <BiEdit
          className='inline-block w-4 h-4 '
          onClick={() => {
            handleEdit(message);
            tooglePanel();
          }}
        />
      </li>
      <div className='w-full h-[1px] bg-black mt-1 mb-1' />
      <li className=' text-[10px] font-bold uppercase cursor-pointer hover:text-gray-800 text-gray-500 '>
        <BiTrash
          className='inline-block w-4 h-4 '
          onClick={() => {
            handleDelete(message);
            tooglePanel();
          }}
        />
      </li>
    </ul>
  );
};

export default EditPanel;
