import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from '../context/UserContext';
import logotask from '../assets/logotask.png';
import { TbLogout } from 'react-icons/tb';
import Profile from './Profile';
import { useMessage } from '../context/MessagesContext';
import { useGroups } from '../context/GroupContext';
import { useRef } from 'react';
import slack from '../assets/slackbtn.webp';
import ToolTip from './ToolTip';

const NavBar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isAuthenticated, logOutUser, user } = useUser();
  const { setRoom, setMessage } = useMessage();
  const { setCurrentGroup } = useGroups();
  const profileRef = useRef(null);

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setIsProfileOpen(false);
    }
  };

  return (
    <nav className='bg-white border-gray-200 md:p-4 block'>
      <div className='flex flex-wrap items-center justify-between'>
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
                className='block py-2 px-3 text-gray-900 rounded hover:bg-orange-600 hover:text-white
              text-sm
              '
                aria-current='page'
                onClick={() => {
                  setRoom('');
                  setMessage([]);
                }}>
                Home
              </Link>
              <div className=''>
                <ToolTip label={'Unite a Slack'}>
                  <a
                    href='https://join.slack.com/t/tasktalkespacio/shared_invite/zt-2ec2qbip1-RLZc6xUpByIQNk_tajA0DA'
                    target='_blank'
                    rel='noreferrer'>
                    <img
                      src={slack}
                      alt='Slack'
                      className='w-6 h-6 rounded-md'
                    />
                  </a>
                </ToolTip>
              </div>
              <div className='hover:bg-orange-600 p-2 rounded-md '>
                <img
                  src={user?.avatar}
                  alt='Avatar'
                  className='w-6 h-6 rounded-full justify-center mx-auto cursor-pointer'
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                />
              </div>
              {isProfileOpen && (
                <>
                  <div
                    className='h-full w-full absolute top-0 right-0 bg-gray-500/75 z-10'
                    onClick={handleClickOutside}>
                    <div className='w-fit mx-auto  absolute top-14 right-10 pointer-events-auto z-100'>
                      <div
                        className='bg-white p-4 rounded-lg z-20'
                        ref={profileRef}>
                        <Profile />
                      </div>
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
                className='block py-1 px-2 text-gray-900 rounded hover:bg-orange-600 md:border-0 
           hover:text-white'
                title='Logout'>
                <TbLogout
                  size={20}
                  strokeWidth={1}
                />
              </button>
            </div>
          </>
        ) : (
          <div className='flex items-center justify-end'>
            <Link
              to='/login-page'
              className=' block py-2 px-3  rounded hover:bg-orange-500 hover:text-white
            
               text-sm'>
              Login
            </Link>
            <Link
              to='/register-page'
              className=' block py-2 px-3  rounded hover:bg-orange-500 hover:text-white
              text-sm
              '>
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
export default NavBar;
