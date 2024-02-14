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
import './styles/slider.css';

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
    <div className='flex h-[100vh] bg-gray-100'>
      {/* CHAT GRANDE */}
      <div
        className={clsx(
          `chat-column flex-grow flex flex-col items-center justify-start mb-1 overflow-auto p-4`,
          `transition-all duration-300 ease-in-out w-full`
        )}>
        <ChatPage />
      </div>


      {/* Button to open/close the panel */}
      <button
        onClick={togglePanel}
        className={clsx(
          `panel-toggle-button absolute mt-[0px] right-0 px-3 py-4 z-10 text-xs rounded-lg rounded-r-none`,
          panelOpen
            ? 'text-white'
            : 'bg-orange-400 text-white border-2 border-gray-200'
        )}>
        {panelOpen ? 'X' : 'Open'}
      </button>

      {/* Panel */}
      <div
        className={clsx(
          `panel-column overflow-auto p-4 scrollba bg-chatGray`,
          panelOpen ? 'block' : 'hidden'
        )}>

        <div className='text-md flex items-center justify-between gap-3 mt-4'>
          <h1 className='text-sm text-white'>Menu</h1>
        </div>
        {/* botones */}
        <div className='flex flex-wrap items-center justify-center gap-4 mt-2 mb-7 font-light'>
          <CreateGroupButton />
          <ButtonDropDown userContacts={allUsers} />
        </div>

        {/* Chats */}
        <hr className='h-[1px] my-2 bg-gray-400 border-0 mb-5' />
        <div className='text-md flex items-center justify-between gap-3'>
          <h1 className='text-sm text-white'>Chats Privados</h1>
          <TiMessages className='text-white' />
        </div>
        {privateGroups?.length === 0 && (
          <div className='flex justify-center text-xs text-gray-400 mt-3'>
            No tienes chats privados.
          </div>
        )}
        {privateGroups?.map((group) => (
          <PrivateChatCard
            key={group.id}
            group={group}
          />
        ))}
        <hr className='h-[1px] bg-gray-400 border-0 mt-5 mb-5' />

        {/* Paneles contenido */}
        <div className='text-md flex items-center justify-between gap-3'>
          <h1 className='text-sm text-white'>Paneles de Grupo</h1>
          <LuLayoutPanelLeft className='text-white' />
        </div>
        {groups?.length === 0 && (
          <div className='flex items-center justify-center text-xs text-gray-400'>
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
