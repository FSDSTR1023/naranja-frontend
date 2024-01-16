/* eslint-disable react/prop-types */
import { format } from 'date-fns';

import { useEffect } from 'react';
import { useUser } from '../context/UserContext';

const PrivateChatCard = ({ group }) => {
  const { user } = useUser();
  useEffect(() => {}, []);
  const handleClick = async () => {};

  return (
    <>
      <div
        className='flex flex-col flex-wrap w-full border-2 border-gray-400 rounded-md p-2 my-1 cursor-pointer'
        onClick={() => handleClick(group?._id)}>
        <div className='flex w-full justify-between items-center p-2'>
          <div>
            {group?.members?.length > 2 && (
              <>
                <p className='font-bold text-sm'>{group?.name}</p>
                <p className='font-bold text-sm'>
                  {`${group?.members.length} Members`}{' '}
                </p>
              </>
            )}
            {group?.members?.length === 2 &&
            group?.members[0]?._id !== user?._id ? (
              <p className='font-bold text-sm'>{group?.members[0].name}</p>
            ) : (
              <p className='font-bold text-sm'>{group?.members[1].name}</p>
            )}
          </div>
        </div>
        <div className='flex flex-col justify-center'>
          <p className='text-xs text-start  mb-1 truncate'>
            {group?.lastMessage?.body}
          </p>
          <p className='text-[10px] text-end'>
            {format(new Date(group?.lastMessage?.createdAt), 'p')}
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivateChatCard;
