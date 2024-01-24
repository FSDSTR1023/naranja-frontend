/* eslint-disable react/prop-types */
import { format } from 'date-fns';

import { useNavigate } from 'react-router-dom';
import { useMessage } from '../context/MessagesContext';

const GroupChatCard = ({ group }) => {
  const navigate = useNavigate();
  const { setRoom } = useMessage();

  const handleClick = async (e) => {
    e.preventDefault();

    setRoom(group?._id);

    navigate(`/groupboard/${group?._id}`);
  };

  return (
    <div
      className='flex flex-col flex-wrap w-full border-2 border-gray-400 rounded-md p-2 my-1 cursor-pointer bg-orange-500/90'
      onClick={(e) => handleClick(e, group?._id)}>
      <div className='flex w-full justify-between items-center p-2'>
        <div className='flex w-full'>
          <div className='flex flex-col'>
            <div className='flex flex-col items-start ml-6 mb-2'>
              <p className='font-bold text-sm'>{group?.name}</p>
              <p className='text-[9px] text-gray-600'>
                {`${group?.members.length} Members`}{' '}
              </p>
            </div>
            {group?.members?.map((member) => (
              <>
                <div
                  key={member?._id}
                  className='flex items-center gap-2 mb-1 '>
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
              </>
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
        <p className='text-xs text-start max-w-[70%] mb-1 font-bold text-gray-700 truncate'>
          No hay mensajes ...
        </p>
      )}
    </div>
  );
};

export default GroupChatCard;
