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
import { useMessage } from '../context/MessagesContext';

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
  const { room } = useMessage();

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
  }, [user, usersChanges, room]);

  return (
    <div className='grid grid-cols-12 h-[100vh] bg-gray-900'>

{/* Panel */}
      <div className='col-span-3 overflow-auto p-4'>
{/* botones */}
<div className='flex flex-wrap items-center justify-center gap-x-4 mt-2 mb-7'>
  <CreateGroupButton />
  <ButtonDropDown userContacts={allUsers} />
</div>

{/* Chats */}
        <hr className='h-[1px] my-2 bg-gray-400 border-0' />
        <div className='text-md flex items-center justify-around gap-3'>
          <h1 className='text-xs font-bold text-white'>Chats Privados</h1>
          <TiMessages className='text-white' />
        </div>

        <hr className='h-[1px] my-2 bg-gray-400 border-0' />
        {privateGroups?.length === 0 && (
          <div className='flex items-center justify-center text-xs font-bold'>
            No tienes chats privados.
          </div>
        )}
        {privateGroups?.map((group) => (
          <PrivateChatCard
            key={group.id}
            group={group}
          />
        ))}
        <hr className='h-[1px] my-2 bg-gray-400 border-0 mt-4' />

{/* Paneles */}
        <div className='text-md flex items-center justify-around gap-3'>
          <h1 className='text-xs font-bold text-white'>Paneles de Grupo</h1>
          <LuLayoutPanelLeft className='text-white' />
        </div>

        <hr className='h-[1px] my-2 bg-gray-400 border-0' />
        {groups?.length === 0 && (
          <div className='flex items-center justify-center text-xs font-bold'>
            No tienes grupos.
          </div>
        )}
        {groups?.map((group) => (
          <GroupChatCard
            key={group.id}
            group={group}
          />
        ))}
      </div>

{/* CHAT GRANDE */}
      <div
        className='col-span-9 border-x-2 border-gray-700 flex flex-col 
      items-center justify-start mb-1 overflow-aut'>
        <ChatPage />
      </div>
    </div>
  );
};

export default ProfilePage;
