/* eslint-disable react/prop-types */

import { useEffect } from 'react';

const PrivateChatCard = ({ group }) => {
  useEffect(() => {}, []);
  const handleClick = async () => {};

  return (
    <>
      <div
        className='flex flex-col flex-wrap w-full border-2 border-gray-400 rounded-md p-2 my-1 cursor-pointer'
        onClick={() => handleClick(group?._id)}>
        <div className='flex w-full justify-between items-center p-2'>
          <div>
            <p className='font-bold text-sm'>{group?.name}</p>
            <p className='font-bold text-sm'>
              {`${group?.members.length} Members`}{' '}
            </p>
          </div>
        </div>
        <div className='flex flex-col justify-center'>
          <p className='text-xs text-start  mb-1'>
            Texto del ultimo Mensaje...{' '}
          </p>
          <p className='text-[10px] text-end'>23/09/2023</p>
        </div>
      </div>
    </>
  );
};

export default PrivateChatCard;
