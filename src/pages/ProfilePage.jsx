/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import AvatarHandler from '../components/AvatarHandler';
import PasswordUpdate from '../components/PasswordUpdate';
import UserStatusHandler from '../components/UserStatusHandler';
import FormsTaskCreate from '../components/FormsTaskCreate';
import { useUser } from '../context/UserContext';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import TaskCard from '../components/TaskCard';
import { useTasks } from '../context/TasksContext';
import GroupPage from './GroupPage';
import { useGroups } from '../context/GroupContext';
import GroupCard from '../components/GroupCard';
import ButtonDropDown from '../components/ButtonDropDown';
import { TiMessages } from 'react-icons/ti';

const ProfilePage = () => {
  const {
    user,
    setUser,
    setIsAuthenticated,
    allUsers,
    getAllUsers,
    logOutUser,
    usersChanges,
  } = useUser();

  const { getAllGroups, groups } = useGroups();
  const { allTasks, getAllTasks } = useTasks();
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    logOutUser();
  };

  const handleForm = () => {
    setShowForm(true);
  };

  useEffect(() => {
    getAllUsers();
    getAllTasks();
    getAllGroups(user?._id);
    if (!user) {
      navigate('/');
      setUser(null);
      setIsAuthenticated(false);
      Cookies.remove('token');
    }
  }, [user, usersChanges]);

  return (
    <div className='grid grid-cols-12 h-[100vh] bg-grey-900'>
      <div className='col-span-2 bg-gray-200'>
        <div className='flex items-center justify-center'>
          <ButtonDropDown userContacts={allUsers} />
        </div>
        <hr className='h-[1px] my-2 bg-gray-400 border-0' />

        <div className='text-md flex items-center justify-around gap-3'>
          <h1>Private Chats</h1>
          <TiMessages />
        </div>
      </div>
      <div
        className='col-span-5 bg-gray-200 border-x-2 border-gray-700 flex flex-col 
      items-center justify-start mb-1 overflow-x-scroll'>
        <button
          className='bg-orange-600 mt-4 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-800 mb-2'
          onClick={handleForm}>
          Crear Tarea
        </button>

        {showForm && <FormsTaskCreate users={allUsers} />}

        <div className='flex flex-wrap justify-center -mx-2'>
          {allTasks?.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
            />
          ))}
        </div>
      </div>
      <div
        className='col-span-2 bg-gray-200 border-x-2 border-gray-700 flex flex-col 
      items-center justify-start mb-1 gap-2 overflow-y-scroll '>
        <GroupPage />
        {groups?.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
          />
        ))}
      </div>
      <div className='col-span-3 bg-gray-200 flex flex-col justify-between'>
        <h1 className=' text-center text-2xl font-bold mt-6'>Perfil</h1>
        <h3 className=''>
          {user?.name} {user?.surname}
        </h3>
        <AvatarHandler />
        <PasswordUpdate />
        <UserStatusHandler />
        <div className='flex flex-col items-center justify-center'>
          <button
            className='bg-red-600 mt-4 text-white font-bold py-2 px-4 rounded-md hover:bg-red-800'
            onClick={handleClick}>
            LogOut →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
