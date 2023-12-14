import { useEffect } from 'react';
import AvatarHandler from '../components/AvatarHandler';
import PasswordUpdate from '../components/PasswordUpdate';
import UserStatusHandler from '../components/UserStatusHandler';
import { useUser } from '../context/UserContext';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const {
    user,
    uploadProfilePicture,
    updateUserPassword,
    setUser,
    setIsAuthenticated,
  } = useUser();
  const navigate = useNavigate();

  const handleClick = () => {
    setUser(null);
    setIsAuthenticated(false);
    Cookies.remove('token');
    navigate('/');
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
      handleClick();
    }
  }, [user]);
  return (
    <div className='grid grid-cols-6 gap-4 h-screen'>
      <div className='col-span-1 bg-gray-200'>
        <h1 className=' text-3xl font-bold mt-6'>Usuarios</h1>
      </div>
      <div className='col-span-4 bg-gray-200'>
        <h1 className=' text-3xl font-bold mt-6'>Tareas</h1>
      </div>
      <div className='col-span-1 bg-gray-200'>
        <h1 className='text-center text-3xl font-bold mt-6'>Perfil</h1>
        <AvatarHandler
          user={user}
          uploadProfilePicture={uploadProfilePicture}
        />
        <PasswordUpdate
          user={user}
          updateUserPassword={updateUserPassword}
        />
        <UserStatusHandler user={user} />
        <button className='bg-red-600 mt-4 text-white font-bold py-2 px-4 rounded-md hover:bg-red-800' onClick={handleClick}>LogOut →</button>
      </div>
    </div>
  );
};

export default ProfilePage;
