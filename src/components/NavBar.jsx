import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from '../context/UserContext';
import logotask from '../assets/logotask.png';
import { TbLogout } from 'react-icons/tb';
const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logOutUser } = useUser();
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
        <button
          type='button'
          className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm
         text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2
         focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          data-collapse-toggle='navbar-default'
          aria-controls='navbar-default'>
          <span className='sr-only'>Open main menu</span>
          <svg
            className='w-5 h-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 17 14'>
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 1h15M1 7h15M1 13h15'
            />
          </svg>
        </button>
        {/* Responsive Menu (for smaller screens, toggled by hamburger button) */}
        {isMenuOpen && (
          <div
            className='w-full md:hidden'
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <ul
              className='flex flex-col p-4 mt-4 border border-gray-100 rounded-lg
            bg-gray-50 dark:bg-gray-800 dark:border-gray-700 gap-1'>
              <li>
                <Link
                  to='/'
                  className='block py-2 px-3 text-white bg-orange-500 rounded md:bg-transparent
                  md:text-orange-700 md:p-0 dark:text-white md:dark:text-orange-500'
                  aria-current='page'>
                  Home
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  <Link
                    to='/profile-page'
                    className='block py-2 px-3 text-white bg-orange-500 rounded md:bg-transparent
                  md:text-orange-700 md:p-0 dark:text-white md:dark:text-orange-500'
                    aria-current='page'>
                    Profile
                  </Link>
                  <button
                    onClick={logOutUser}
                    className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0
               md:hover:text-orange-500 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700
               dark:hover:text-white md:dark:hover:bg-transparent border-2 border-orange-500  '
                    title='Logout'>
                    <TbLogout
                      size={20}
                      strokeWidth={1.5}
                    />
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to='/login-page'
                    className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100
               md:hover:bg-transparent md:border-0 md:hover:text-orange-500 md:p-0 dark:text-white
               md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'>
                    Login
                  </Link>
                  <Link
                    to='/register-page'
                    className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0
               md:hover:text-orange-500 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700
               dark:hover:text-white md:dark:hover:bg-transparent'>
                    Register
                  </Link>
                </>
              )}
            </ul>
          </div>
        )}
        {/* Full-Screen Menu (for larger screens) */}
        <div
          className='hidden w-full  md:w-auto md:flex md:items-center md:justify-center'
          id='navbar-default'>
          <ul
            className='font-medium flex flex-col p-4 md:p-0 mt-4 border
            border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:items-center md:justify-center
            md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
            <li>
              <Link
                to='/'
                className='block py-2 px-3 text-white bg-orange-500 rounded md:bg-transparent
                  md:text-orange-700 md:p-0 dark:text-white md:dark:text-orange-500'
                aria-current='page'>
                Home
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link
                    to='/profile-page'
                    className='block py-2 px-3 text-white bg-orange-500 rounded md:bg-transparent md:text-orange-700 
                  md:p-0 dark:text-white md:dark:text-orange-500'
                    aria-current='page'>
                    Profile
                  </Link>
                </li>
                <button
                  onClick={logOutUser}
                  className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-2 md:border-orange-500
               md:hover:text-orange-500  dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700
               dark:hover:text-white md:dark:hover:bg-transparent border-2 border-orange-600 md:p-1 md:text-center  '
                  title='Logout'>
                  <TbLogout
                    size={20}
                    strokeWidth={1.5}
                  />
                </button>
              </>
            ) : (
              <>
                <Link
                  to='/register-page'
                  className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0
               md:hover:text-orange-500 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700
               dark:hover:text-white md:dark:hover:bg-transparent'>
                  Register
                </Link>
                <Link
                  to='/login-page'
                  className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0
               md:hover:text-orange-500 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700
               dark:hover:text-white md:dark:hover:bg-transparent'>
                  Login
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
