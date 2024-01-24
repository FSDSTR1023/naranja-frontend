import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from '../context/UserContext';
import logotask from '../assets/logotask.png';
import { TbLogout } from 'react-icons/tb';
import Profile from './Profile';

const NavBar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isAuthenticated, logOutUser, user } = useUser();
  return (
    <nav className='bg-white border-gray-200 dark:bg-gray-900 p-4 block'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto'>
        {/* Logo will go here */}
        <a
          href='/'
          className='flex items-center rtl:space-x-reverse'>
          <img
            className='h-[50px] '
            src={logotask}
            alt='LOGOTASK'
          />
        </a>
        {/* Hamburger Menu Button (Shown only on small screens) */}
        {isAuthenticated ? (
          <>
            <div className='flex items-center justify-center md:hidden gap-2'>
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
                  <div className='w-fit mx-auto md:hidden absolute top-14 right-10 pointer-events-auto z-10'>
                    <div className='bg-white p-4 rounded-lg  '>
                      <Profile className='md:hidden ' />
                    </div>
                  </div>
                </>
              )}
              <button
                onClick={logOutUser}
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
              className='md:hidden block py-2 px-3 text-gray-900 rounded hover:bg-gray-100
               dark:text-white dark:hover:text-orange-500
               dark:hover:bg-gray-700 text-sm'>
              Login
            </Link>
            <Link
              to='/register-page'
              className='md:hidden block py-2 px-3 text-gray-900 rounded hover:bg-gray-100
               dark:text-white dark:hover:text-orange-500 text-sm
               dark:hover:bg-gray-700 '>
              Register
            </Link>
          </div>
        )}

        <div
          className='hidden w-full  md:w-auto md:flex md:items-center md:justify-center'
          id='navbar-default'>
          <ul
            className='font-medium flex flex-col p-4 md:p-0 mt-4 border
            border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:items-center md:justify-center
            md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
            {isAuthenticated ? (
              <div className='flex items-center justify-end gap-4'>
                <li>
                  <Link
                    to='/profile-page'
                    className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100
               dark:text-white dark:hover:text-orange-500
               dark:hover:bg-gray-700 text-sm '
                    aria-current='page'>
                    Home
                  </Link>
                </li>
                <div className='dark:hover:bg-gray-700 p-2 rounded-md '>
                  <img
                    src={user?.avatar}
                    alt='Avatar'
                    className='w-6 h-6 rounded-full justify-center mx-auto cursor-pointer dark:hover:bg-gray-700 '
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  />
                </div>
                {isProfileOpen && (
                  <>
                    <div className='w-fit mx-auto absolute top-14 right-10 pointer-events-auto z-10'>
                      <div className='bg-white p-4 rounded-lg'>
                        <Profile />
                      </div>
                    </div>
                  </>
                )}
                <button
                  onClick={logOutUser}
                  className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100
               dark:text-white dark:hover:text-orange-500
               dark:hover:bg-gray-700 '
                  title='Logout'>
                  <TbLogout
                    size={25}
                    strokeWidth={1}
                  />
                </button>
              </div>
            ) : (
              <>
                <Link
                  to='/login-page'
                  className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100
               dark:text-white dark:hover:text-orange-500
               dark:hover:bg-gray-700 text-sm'>
                  Login
                </Link>
                <Link
                  to='/register-page'
                  className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100
               dark:text-white dark:hover:text-orange-500 text-sm
               dark:hover:bg-gray-700 '>
                  Register
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
