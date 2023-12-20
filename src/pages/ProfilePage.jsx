/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import AvatarHandler from '../components/AvatarHandler';
import PasswordUpdate from '../components/PasswordUpdate';
import UserStatusHandler from '../components/UserStatusHandler';
import FormsTaskCreate from '../components/FormsTaskCreate';
import { useUser } from '../context/UserContext';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import UserCard from '../components/UserCard';
import TaskCard from '../components/TaskCard';
import { useTasks } from '../context/TasksContext';

const ProfilePage = () => {
  
  const { user, setUser, setIsAuthenticated, allUsers, getAllUsers } = useUser();
  const { allTasks, getAllTasks } = useTasks();
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setUser(null);
    setIsAuthenticated(false);
    Cookies.remove('token');
    navigate('/');
  };

  const handleForm = () => {
    setShowForm(true);
  };

  useEffect(() => {
    console.log('ProfilePage useEffect');
    getAllUsers();
    getAllTasks();
    if (!user) {
      navigate('/');
      setUser(null);
      setIsAuthenticated(false);
      Cookies.remove('token');
    }
  }, [user]);

  return (
    <div className='grid grid-cols-12 gap-1 md:gap-1 min-h-screen bg-grey-900 overflow-auto'>
      {/* users */}
      <div className='col-span-4 md:col-span-3 bg-gray-200 p-4'>
        {allUsers?.map((contact) => (
          <UserCard key={contact._id} contact={contact} />
        ))}
      </div>

      {/* tasks */}
      <div className='col-span-4 md:col-span-6 bg-gray-200 p-4 overflow-auto'>
        <button
          className='bg-orange-600 mt-4 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-800 mb-2'
          onClick={handleForm}
        >
          Crear Tarea
        </button>

        {showForm && <FormsTaskCreate users={allUsers} />}

        <div className="flex flex-wrap justify-center -mx-2">
          {allTasks?.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      </div>

      {/* profile */}
      <div className='col-span-4 md:col-span-3 bg-gray-200 p-4'>
        <h1 className='text-center text-2xl font-bold mt-6'>Perfil</h1>
        <h3>{user?.name} {user?.surname}</h3>
        <AvatarHandler />
        <PasswordUpdate />
        <UserStatusHandler />
        <div className='flex flex-col items-center justify-center'>
          <button
            className='bg-red-600 mt-4 text-white font-bold py-2 px-4 rounded-md hover:bg-red-800'
            onClick={handleClick}
          >
            LogOut →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
