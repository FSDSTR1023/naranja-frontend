/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import AvatarHandler from '../components/AvatarHandler';
import PasswordUpdate from '../components/PasswordUpdate';
import UserStatusHandler from '../components/UserStatusHandler';
import { useUser } from '../context/UserContext';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import UserCard from '../components/UserCard';
import TaskCard from '../components/TaskCard';
import { useTasks } from '../context/TasksContext';
import GroupPage from './GroupPage';
import { useGroups } from '../context/GroupContext';
import GroupCard from '../components/GroupCard';

const ProfilePage = () => {
  const {
    user,
    setUser,
    setIsAuthenticated,
    allUsers,
    getAllUsers,
    logOutUser,
  } = useUser();

  const { getAllGroups, groups } = useGroups();
  const { allTasks, getAllTasks } = useTasks();
  const navigate = useNavigate();

  const handleClick = () => {
    logOutUser();
    navigate('/');
  };

  useEffect(() => {
    console.log('ProfilePage useEffect');
    getAllUsers();
    getAllTasks();
    getAllGroups({ userId: user?._id });
    if (!user) {
      navigate('/');
      setUser(null);
      setIsAuthenticated(false);
      Cookies.remove('token');
    }
  }, [user]);
  return (
    <div className='grid grid-cols-12 h-screen bg-grey-900'>
      <div className='col-span-2 bg-gray-200'>
        <button className='bg-orange-600 mt-4 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-800 mb-2'>
          Contactos
        </button>
        {allUsers?.map((contact) => (
          <UserCard
            key={contact._id}
            contact={contact}
          />
        ))}
      </div>
      <div
        className='col-span-5 bg-gray-200 border-x-2 border-gray-700 flex flex-col 
      items-center justify-center mb-1'>
        <button
          className='bg-orange-600 mt-4 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-800 mb-2'
          onClick={() => {
            console.log('modal tarea');
          }}>
          Crear Tarea
        </button>
        {allTasks?.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
          />
        ))}
      </div>
      <div
        className='col-span-2 bg-gray-200 border-x-2 border-gray-700 flex flex-col 
      items-center justify-center mb-1 gap-2'>
        <GroupPage />
        {groups?.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
          />
        ))}
      </div>
      <div className='col-span-3 bg-gray-200'>
        <h1 className=' text-center text-2xl font-bold mt-6'>Perfil</h1>
        <h3 className=''>
          {user?.name} {user?.surname}
        </h3>
        <AvatarHandler />
        <PasswordUpdate />
        <UserStatusHandler />
        <div className='flex flex-col items-center justify-center'>
          {' '}
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
