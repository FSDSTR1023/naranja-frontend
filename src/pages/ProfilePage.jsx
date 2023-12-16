/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import AvatarHandler from '../components/AvatarHandler';
import PasswordUpdate from '../components/PasswordUpdate';
import UserStatusHandler from '../components/UserStatusHandler';
import { useUser } from '../context/UserContext';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import UserCard from '../components/UserCard';
import TaskCard from '../components/TaskCard';
import { useTasks } from '../context/TasksContext';

const ProfilePage = () => {
  const {
    user,
    uploadProfilePicture,
    updateUserPassword,
    setUser,
    setIsAuthenticated,
    allUsers,
    getAllUsers,
  } = useUser();

  const { allTasks, getAllTasks } = useTasks();
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState('tasks');

  const handleClick = () => {
    setUser(null);
    setIsAuthenticated(false);
    Cookies.remove('token');
    navigate('/');
  };

  useEffect(() => {
    getAllUsers();
    getAllTasks();
    if (!user) {
      navigate('/');
      handleClick();
      setExpandedSection(null);
    }
  }, [user]);

  return (
    <div className='grid grid-cols-12 h-screen bg-grey-900'>
      <div className={`col-span-3 bg-gray-200 ${expandedSection === 'contacts' ? 'col-span-8' : 'col-span-2'}`}>
      <button className=' text-center text-2xl font-bold p-4 border-2 rounded-2xl border-gray-900 mt-4 mb-2' onClick={() =>
          setExpandedSection('contacts')
        }>Contactos</button>
        {allUsers?.map((contact) => (
          <UserCard
            key={contact._id}
            contact={contact}
          />
        ))}
      </div>
      <div
        className={`col-span-6 bg-gray-200 border-x-2 border-gray-700 flex flex-col items-center justify-center mb-1 ${expandedSection === 'tasks' ? 'col-span-8' : 'col-span-2'}`}>
        <button className='text-center text-2xl font-bold p-4 border-2 rounded-2xl border-gray-900 mt-4' onClick={() =>
          setExpandedSection('tasks')
        }>Tareas</button>
        <button
          className='bg-orange-400 mt-4 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-700 mb-2'
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
      <div className={`col-span-3 bg-gray-200 ${expandedSection === 'profile' ? 'col-span-8' : 'col-span-2'}`}>
        <button className='text-center text-2xl font-bold p-4 border-2 rounded-2xl border-gray-900 mt-4 mb-2' onClick={() =>
          setExpandedSection('profile')
        }>Perfil</button>
        <h3 className=''>
          {user?.name} {user?.surname}
        </h3>
        <AvatarHandler
          user={user}
          uploadProfilePicture={uploadProfilePicture}
        />
        <PasswordUpdate
          user={user}
          updateUserPassword={updateUserPassword}
        />
        <UserStatusHandler user={user} />
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
