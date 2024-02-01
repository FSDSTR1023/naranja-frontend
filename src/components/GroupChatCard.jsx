/* eslint-disable react/prop-types */
import { format } from 'date-fns';

import { useNavigate } from 'react-router-dom';
import { useMessage } from '../context/MessagesContext';
import { BiPlusCircle } from 'react-icons/bi';
import clsx from 'clsx';
import { useState } from 'react';

const GroupChatCard = ({ group }) => {
  const navigate = useNavigate();
  const { setRoom } = useMessage();
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();

    setRoom(group?._id);

    navigate(`/groupboard/${group?._id}`);
  };

  return (
    <div
      className=' flex flex-col flex-wrap w-full border-2 border-gray-400 rounded-md p-2 my-1 cursor-pointer bg-orange-500/90'
      onClick={(e) => handleClick(e, group?._id)}>
      <div className='relative flex w-full justify-between items-center p-2'>
        <div className='flex w-full'>
          <div className='  flex flex-col'>
            <div className='flex flex-col items-start mb-2'>
              <p className='font-bold text-sm text-black'>{group?.name}</p>
              <p className='text-[9px] text-white'>
                {`${group?.members.length} Members`}{' '}
              </p>
              <BiPlusCircle
                className=' absolute z-10 top-0 right-0 text-gray-800 w-5 h-5 rounded-full'
                onMouseEnter={() => setShowDetails(true)}
                onMouseLeave={() => setShowDetails(false)}
              />
            </div>

            {group?.members?.map((member) => (
              <div
                className={clsx(
                  'transition ease-in-out duration-1000',
                  showDetails ? 'flex' : 'hidden'
                )}
                key={member?._id}>
                <div className='flex items-center gap-2 mb-1 '>
                  <img
                    className='w-6 h-6 rounded-full'
                    src={member?.avatar}
                    alt='avatar'
                  />
                  <div className='flex flex-col items-start gap-0.5'>
                    <div className='flex items-center'>
                      <span className='text-gray-800 text-[9px] mr-0.5'>
                        {member?.name}
                      </span>
                      <span className='text-gray-800 text-[9px]'>
                        {' '}
                        {member?.surname}
                      </span>
                    </div>
                    <p className='text-[9px] text-gray-600'>{member?.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {group?.hasLastMessage ? (
        <div className='flex flex-col justify-center w-full'>
          <p className='text-xs text-start font-bold text-gray-700 mb-1 truncate max-w-[70%]'>
            {group?.lastMessage?.body}
          </p>
          <p className='text-[10px] text-end'>
            {format(new Date(group?.lastMessage?.createdAt || Date.now()), 'p')}
          </p>
        </div>
      ) : (
        <p className='text-xs text-start max-w-[70%] mb-1 text-white truncate'>
          No hay mensajes ...
        </p>
      )}
    </div>
  );
};

export default GroupChatCard;
