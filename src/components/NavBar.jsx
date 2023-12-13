import { Link } from 'react-router-dom';
import { useState } from 'react';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      className='w-full flex items-center 
      justify-between bg-black mr-10 first-letter:bg-black border-black dark:bg-slate-800  p-4'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto'>
        {/* Logo will go here */}
        <a
          href='/'
          className='flex items-center rtl:space-x-reverse'>
          <span
            className='self-center l md:text-white text-2xl font-semibold whitespace-nowrap
           dark:text-white text-white'>
            COMMUNI TEAM
          </span>
        </a>

        {/* Hamburger Menu Button (Shown only on small screens) */}
        <button
          type='button'
          className='inline-flex items-center p-2 w-10 h-10 
          justify-center text-sm text-black rounded-lg md:hidden
           hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-200
            dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-black'
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
          <div className='w-full md:hidden'>
            <ul
              className='flex flex-col p-4 mt-4 border
             border-black rounded-lg bg-black dark:bg-black dark:border-black'>
              <li>
                <Link
                  to='/'
                  className='block py-2 px-3 md: text-black
                   bg-black rounded md:bg-transparent md:text-lime-600 md:p-0
                    dark:text-white md:dark: black'
                  aria-current='page'>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to='/register-page'
                  className='block py-2 px-3 text-black rounded
                   hover:bg-gray-100 md:hover:bg-transparent md:border-0
                    md:hover:text-orange-500 md:p-0 dark:text-white
                     md:dark:hover:text-orange-500 dark:hover:bg-gray-700
                      dark:hover:text-white md:dark:hover:bg-transparent'>
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to='/login-page'
                  className='block py-2 px-3 text-black rounded
                   hover:bg-gray-100 md:hover:bg-transparent md:border-0
                    md:hover:text-orange-500 md:p-0 dark:text-white
                     md:dark:hover:text-orange-500 dark:hover:bg-gray-700
                      dark:hover:text-white md:dark:hover:bg-transparent'>
                  Login
                </Link>
              </li>
            </ul>
          </div>
        )}

        {/* Full-Screen Menu (for larger screens) */}
        <div
          className='hidden w-full md:block md:w-auto'
          id='navbar-default'>
          <ul
            className='font-medium flex flex-col p-4 md:p-0 mt-4 border
           border-black rounded-lg bg-gray-600 md:flex-row md:space-x-8 
           rtl:space-x-reverse md:mt-0 md:border-0 md:bg-black dark:bg-gray-800
            md:dark:bg-gray-900 dark:border-'>
            <li>
              <Link
                to='/'
                className='block py-2 px-3 md: text-white
                 bg-black rounded md:bg-transparent md:text-white md:p-0 dark:text-white
                  md:hover:text-indigo-900'
                aria-current='page'>
                Home
              </Link>
            </li>
            <li>
              <Link
                to='/register-page'
                className='block py-2 px-3 text-white rounded
                 hover:bg-gray-100 md:hover:bg-transparent md:border-0
                  md:hover:text-indigo-900 md:p-0 dark:text-white
                   md:dark:hover:text-orange-500 dark:hover:bg-gray-700 
                   dark:hover:text-white md:dark:hover:bg-transparent'>
                Register
              </Link>
            </li>
            <li>
              <Link
                to='/login-page'
                className='block py-2 px-3 text-white rounded
                 hover:bg-gray-100 md:hover:bg-transparent md:border-0
                  md:hover:text-indigo-900 md:p-0 dark:text-white md:dark:hover:text-orange-500
                   dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'>
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
