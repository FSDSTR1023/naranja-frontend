import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from '../context/UserContext';
import logotask from '../assets/logotask.png';
import { TbLogout } from 'react-icons/tb';
import Profile from './Profile';
import { useMessage } from '../context/MessagesContext';
import { useGroups } from '../context/GroupContext';

const NavBar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isAuthenticated, logOutUser, user } = useUser();
  const { setRoom } = useMessage();
  const { setCurrentGroup } = useGroups();

  return (
    <nav className='bg-white border-gray-200 dark:bg-gray-900 p-4 block'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto'>
        <a
          href='/'
          className='flex items-center rtl:space-x-reverse'>
          <img
            className='h-[50px] '
            src={logotask}
            alt='LOGOTASK'
          />
        </a>

        {isAuthenticated ? (
          <>
            <div className='flex items-center justify-center  gap-2'>
              <Link
                to='/profile-page'
                className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100
               dark:text-white dark:hover:text-orange-500 text-sm
               dark:hover:bg-gray-700 '
                aria-current='page'>
                Home
              </Link>
              <div className='dark:hover:bg-gray-700 p-2 rounded-md '>
                <img
                  src={user?.avatar}
                  alt='Avatar'
                  className='w-6 h-6 rounded-full justify-center mx-auto cursor-pointer'
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                />
              </div>
              {isProfileOpen && (
                <>
                  <div className='w-fit mx-auto  absolute top-14 right-10 pointer-events-auto z-10'>
                    <div className='bg-gray-200 p-4 rounded-lg  '>
                      <Profile />
                    </div>
                  </div>
                </>
              )}
              <button
                onClick={() => {
                  logOutUser();
                  setCurrentGroup({});
                  setRoom('');
                }}
                className='block py-1 px-1 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 
               md:hover:text-orange-500 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700
               dark:hover:text-white md:dark:hover:bg-transparent ml-2'
                title='Logout'>
                <TbLogout
                  size={25}
                  strokeWidth={1}
                />
              </button>
            </div>
          </>
        ) : (
          <div className='flex items-center justify-end'>
            <Link
              to='/login-page'
              className=' block py-2 px-3 text-gray-900 rounded hover:bg-gray-100
               dark:text-white dark:hover:text-orange-500
               dark:hover:bg-gray-700 text-sm'>
              Login
            </Link>
            <Link
              to='/register-page'
              className=' block py-2 px-3 text-gray-900 rounded hover:bg-gray-100
               dark:text-white dark:hover:text-orange-500 text-sm
               dark:hover:bg-gray-700 '>
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
export default NavBar;
