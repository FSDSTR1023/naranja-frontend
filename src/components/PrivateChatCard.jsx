/* eslint-disable react/prop-types */
import { format } from 'date-fns';

import { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../context/MessagesContext';

const PrivateChatCard = ({ group }) => {
  const navigate = useNavigate();
  const { setRoom } = useMessage();
  const { user, setSelectedUser } = useUser();
  useEffect(() => {}, []);
  const handleClick = async () => {
    const contact = group?.members?.filter(
      (member) => member._id !== user?._id
    )[0];
    setSelectedUser(contact);
    setRoom(group?.id);

    navigate(`/chat-page`);
  };

  return (
    <>
      <div
        className='flex flex-col flex-wrap w-full border-2 border-gray-400 rounded-md p-2 my-1 cursor-pointer'
        onClick={() => handleClick(group?.id)}>
        <div className='flex w-full justify-between items-center p-2'>
          <div>
            {group?.members?.length > 2 ? (
              <>
                <p className='font-bold text-sm'>{group?.name}</p>
                <p className='text-sm text-gray-500'>
                  {`${group?.members.length} Members`}{' '}
                </p>
              </>
            ) : group?.members?.length === 2 &&
              group?.members[0]?._id !== user?._id ? (
              <p className='font-bold text-sm'>{group?.members[0].name}</p>
            ) : (
              <p className='font-bold text-sm'>{group?.members[1].name}</p>
            )}
          </div>
        </div>
        {group?.hasLastMessage ? (
          <div className='flex flex-col justify-center'>
            <p className='text-xs text-start font-bold text-gray-700 mb-1 truncate'>
              {group?.lastMessage?.body}
            </p>
            <p className='text-[10px] text-end'>
              {format(new Date(group?.lastMessage?.createdAt), 'p')}
            </p>
          </div>
        ) : (
          <p className='text-xs text-start w-full mb-1 font-bold text-gray-700 truncate'>
            No hay mensajes ...
          </p>
        )}
      </div>
    </>
  );
};

export default PrivateChatCard;
