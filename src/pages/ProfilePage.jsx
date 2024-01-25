/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import { useUser } from '../context/UserContext';

import { useNavigate } from 'react-router-dom';

import { useGroups } from '../context/GroupContext';

import ButtonDropDown from '../components/ButtonDropDown';
import { TiMessages } from 'react-icons/ti';
import PrivateChatCard from '../components/PrivateChatCard';
import CreateGroupButton from '../components/CreateGroupButton';
import GroupChatCard from '../components/GroupChatCard';
import ChatPage from './ChatPage';
import { LuLayoutPanelLeft } from 'react-icons/lu';

const ProfilePage = () => {
  const {
    user,
    setUser,
    setIsAuthenticated,
    allUsers,
    getAllUsers,
    usersChanges,
  } = useUser();

  const { getAllGroups, groups, privateGroups } = useGroups();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
      setUser(null);
      setIsAuthenticated(false);

      return;
    }
    getAllUsers();

    getAllGroups(user?._id);
  }, [user, usersChanges]);

  return (
    <div className='grid grid-cols-12 h-[100vh] bg-grey-900'>
      <div className='col-span-3 bg-gray-700  overflow-auto p-1'>
        <div className='flex flex-col items-center justify-center lg:flex-row '>
          <CreateGroupButton />
          <ButtonDropDown userContacts={allUsers} />
        </div>
        <hr className='h-[1px] my-2 bg-gray-400 border-0' />
        <div className='text-md flex items-center justify-around gap-3'>
          <h1 className='text-xs font-bold text-white'>Chats Privados</h1>
          <TiMessages className='text-white' />
        </div>
        <hr className='h-[1px] my-2 bg-gray-400 border-0' />
        {privateGroups?.length === 0 && (
          <div className='flex items-center justify-center text-xs font-bold'>
            No tienes chats privados
          </div>
        )}

        {privateGroups?.map((group) => (
          <PrivateChatCard
            key={group.id}
            group={group}
          />
        ))}
        <hr className='h-[1px] my-2 bg-gray-400 border-0 mt-4' />
        <div className='text-md flex items-center justify-around gap-3'>
          <h1 className='text-xs font-bold text-white'>Paneles de Grupo</h1>
          <LuLayoutPanelLeft className='text-white' />
        </div>
        <hr className='h-[1px] my-2 bg-gray-400 border-0' />
        {groups?.length === 0 && (
          <div className='flex items-center justify-center text-xs font-bold'>
            No tienes chats privados
          </div>
        )}
        {groups?.map((group) => (
          <GroupChatCard
            key={group.id}
            group={group}
          />
        ))}
      </div>

      <div
        className='col-span-9 border-x-2 border-gray-700 flex flex-col 
      items-center justify-start mb-1 overflow-auto bg-gray-700'>
        <ChatPage />
      </div>
    </div>
  );
};

export default ProfilePage;
