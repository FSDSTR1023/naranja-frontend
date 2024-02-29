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
import './styles/slider.css';
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
  const [panelOpen, setPanelOpen] = useState(false);

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
  //${panelOpen ? 'lg:w-1/5' : 'w-0 hidden'}

  return (
    <div className='flex h-[100vh] bg-gray-100 relative'>
      {/* CHAT GRANDE */}
      <div className='w-full md:mr-[230px] mt-6 pl-3 pr-3'>
        <ChatPage />
      </div>
      <button
        onClick={togglePanel}
        className='panel-toggle-button flex text-center 
        justify-center absolute w-full px-4 py-2 text-xs z-7 bg-orange-500 text-white font-medium md:hidden'>
        {panelOpen ? (
          <span>
            Cerrar <span className='chevron fas fa-chevron-down'></span>
          </span>
        ) : (
          <span>
            Abrir <span className='chevron fas fa-chevron-up'></span>
          </span>
        )}
      </button>

      {/* Panel */}
      <div
        className={clsx(
          `panel-column absolute top-0 bottom-0 right-0 w-full overflow-auto p-4 scrollbar bg-chatGray md:w-[230px]`,
          panelOpen ? 'w-full' : 'hidden md:block '
        )}>
        <div className='text-md md:flex items-center justify-between gap-3 mt-4 hidden '>
          <h1 className='text-sm text-white '>Menu</h1>
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
            panelOpen={panelOpen}
            setPanelOpen={setPanelOpen}
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
