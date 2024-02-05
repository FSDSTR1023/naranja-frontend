/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
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
import clsx from 'clsx';

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
  const [panelOpen, setPanelOpen] = useState(true);

  const togglePanel = () => {
    setPanelOpen(!panelOpen);
  };

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
      {/* CHAT GRANDE */}
      <div
        className={clsx(
          ` flex flex-col items-center justify-start mb-1 overflow-auto p-4 sm:p-0 sm:mb-0`,
          panelOpen ? 'hidden' : 'col-span-12'
        )}>
        <ChatPage />
      </div>

      {/* Button to open/close the panel */}
      <button
        onClick={togglePanel}
        className={clsx(
          `bg-orange-500 absolute mt-[0px] right-0 px-3 py-4 z-10 text-white text-xs rounded-lg rounded-r-none md:hidden`,
          panelOpen ? 'hidden' : ''
        )}>
        Abrir
      </button>
      <button
        onClick={togglePanel}
        className={clsx(
          `absolute mt-[7px] right-4 z-10 text-white text-2xl`,
          panelOpen ? '' : 'hidden'
        )}>
        x
      </button>

      {/* Panel */}
      <div
        className={clsx(
          `col-span-3 overflow-auto p-4 scrollbar border-x-2 border-gray-400 bg-gray-900`,
          panelOpen ? 'absolute top-13 h-full right-0' : 'hidden'
        )}>
        {/* botones */}
        <div className='flex flex-wrap items-center justify-center gap-4 mt-10 mb-7'>
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
    </div>
  );
};

export default ProfilePage;
