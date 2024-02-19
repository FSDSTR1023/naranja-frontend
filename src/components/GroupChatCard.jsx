/* eslint-disable react/prop-types */
import { format } from 'date-fns';

import { useNavigate } from 'react-router-dom';
import { useMessage } from '../context/MessagesContext';
import { BiPlusCircle } from 'react-icons/bi';
import clsx from 'clsx';
import { useState } from 'react';
import { TbTrash } from 'react-icons/tb';
import { useUser } from '../context/UserContext';

import { useGroups } from '../context/GroupContext';

const GroupChatCard = ({ group }) => {
  const navigate = useNavigate();
  const { setRoom } = useMessage();
  const [showDetails, setShowDetails] = useState(false);
  const { user } = useUser();
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const { deleteGroup } = useGroups();

  const handleClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    setRoom(group?._id);

    navigate(`/groupboard/${group?._id}`);
  };
  const handleDeleteGroup = async (groupId) => {
    await deleteGroup(groupId);
    setIsConfirmationVisible(false);
  };
  return (
    <div
      className=' flex flex-col flex-wrap w-full rounded-md p-2 my-1 mt-4 cursor-pointer bg-orange-500'
      onClick={(e) => handleClick(e, group?._id)}>
      {isConfirmationVisible && (
        <div className='z-20 fixed top-0 left-0  w-screen h-screen bg-gray-500/20'>
          <div className='absolute top-56 right-56 translate-y-32 -translate-x-24 bg-white p-6 rounded-md'>
            <div className='flex flex-col items-center justify-center p-2 h-auto w-[250px]'>
              <p className='text-sm font-bold text-gray-700'>
                Are sure you want to delete{' '}
                <em className='text-red-500'>{group?.name} </em>
                group ?
              </p>
              <div className='flex items-center justify-center p-2 mt-2 gap-6'>
                <button
                  className='bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600'
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsConfirmationVisible(false);
                  }}>
                  Cancel
                </button>
                <button
                  className='bg-red-500 text-white p-2 rounded-md hover:bg-red-600'
                  onClick={() => handleDeleteGroup(group?._id)}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='relative flex w-full justify-between items-center p-2'>
        <div className='flex w-full'>
          <div className='  flex flex-col'>
            <div className='flex flex-col items-start mb-2'>
              <p className='font-bold text-sm text-black'>{group?.name}</p>
              <p className='text-[9px] text-white'>
              {group?.members?.length ? `${group.members.length} Members` : '0 Members'}
              </p>
              {user?._id === group?.ownerUser && (
                <TbTrash
                  className=' absolute z-10 top-0 right-8 text-gray-200 w-5 h-5 rounded-full'
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsConfirmationVisible(true);
                  }}
                />
              )}
              <BiPlusCircle
                className=' absolute z-10 top-0 right-0 text-gray-200 w-5 h-5 rounded-full'
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDetails(!showDetails);
                }}
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
          <p className='text-xs text-start text-gray-200 font-light pl-2 mb-1 truncate max-w-[70%]'>
            {group?.lastMessage?.body}
          </p>
          <p className='text-[10px] text-end text-gray-200'>
            {format(new Date(group?.lastMessage?.createdAt || Date.now()), 'p')}
          </p>
        </div>
      ) : (
        <p className='text-xs text-start mb-1 text-gray-200 pl-2 truncate'>
          No hay mensajes ...
        </p>
      )}
    </div>
  );
};

export default GroupChatCard;
