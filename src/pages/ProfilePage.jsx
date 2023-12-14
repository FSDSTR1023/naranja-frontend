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
    <div className='flex-1 w-screen h-screen'>
      <h1 className='text-center text-3xl font-bold mt-10'>Perfil</h1>
      <div
        className='flex items-center justify-center border-2 
      border-gray-400 rounded-md  m-10 mb-10 w-[calc(100%-50px)] h-full '>
        <AvatarHandler
          user={user}
          uploadProfilePicture={uploadProfilePicture}
        />
        <PasswordUpdate
          user={user}
          updateUserPassword={updateUserPassword}
        />
        <UserStatusHandler user={user} />
        <button onClick={handleClick}>LogOut ⌽</button>
      </div>
    </div>
  );
};

export default ProfilePage;
