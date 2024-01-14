/* eslint-disable react/prop-types */
import { Dropdown, TextInput } from 'keep-react';

const ButtonDropDown = ({ userContacts }) => {
  return (
    <Dropdown
      className='bg-orange-600 mt-4 text-white text-sm font-bold rounded-md hover:bg-orange-800 m-2'
      label='Contacts'
      type='primary'
      size='sm'
      dismissOnClick={true}>
      <div className='px-5 pt-3 pb-2'>
        <TextInput
          id='#id-z3rxdy'
          placeholder='Search...'
          color='gray'
          sizing='md'
        />
      </div>
      <Dropdown.Item>
        <div className='flex text-sm'>
          <img
            className='w-10 h-10 rounded-full'
            src={userContacts?.avatar}
            alt='avatar'
          />
          <p>
            {userContacts?.name} {userContacts?.surname}
          </p>
          <span>
            {userContacts?.isOnline === 'Online' ? (
              <div className='w-2 h-2 bg-green-500 rounded-full'></div>
            ) : userContacts?.isOnline === 'Busy' ? (
              <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
            ) : (
              <div className='w-2 h-2 bg-red-500 rounded-full'></div>
            )}
          </span>
        </div>
      </Dropdown.Item>
    </Dropdown>
  );
};

export default ButtonDropDown;
