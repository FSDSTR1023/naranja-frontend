/* eslint-disable react/prop-types */
import { Dropdown } from 'keep-react';
import { useState } from 'react';

import { useMessage } from '../context/MessagesContext';
import { useUser } from '../context/UserContext';

const ButtonDropDown = ({ userContacts }) => {
  const { setRoom } = useMessage();
  const { user, setSelectedUser } = useUser();

  const handleClick = async (contact) => {
    setSelectedUser(contact);
    contact._id > user._id
      ? setRoom(contact._id + user._id)
      : setRoom(user._id + contact._id);
  };

  const [search, setSearch] = useState('');
  let filteredContacts = [];

  if (search.length > 0) {
    const filtered = userContacts?.filter((contact) => {
      return contact?.name.toLowerCase().startsWith(search.toLowerCase());
    });
    console.log(filtered);
    filteredContacts = filtered;
  }

  return (
    <div className='flex flex-col justify-center items-center pt-2'>
      <Dropdown
        className='bg-orange-600 mt-4 text-white text-sm font-bold rounded-md hover:bg-orange-800 m-2 pointer-events-auto'
        label='Contacts'
        type='primary'
        size='sm'
        floatingArrow={true}>
        <div className='px-5 pt-3 pb-2'>
          <input
            id='#id-z3rxdy'
            placeholder='Search...'
            color='gray'
            type='text'
            value={search}
            className='w-full border-2 border-gray-300 rounded-md p-2 my-1 '
            onChange={(e) => {
              console.log(e.target.value);
              setSearch(e.target.value);
            }}
          />
        </div>
        {filteredContacts?.length > 0
          ? filteredContacts?.map((contact) => (
              <Dropdown.Item
                key={contact?._id}
                id={contact?.name}
                onClick={() => handleClick(contact)}>
                <div className='flex text-sm items-center justify-between w-full'>
                  <img
                    className='w-10 h-10 rounded-full'
                    src={contact?.avatar}
                    alt='avatar'
                  />
                  <p>
                    {contact?.name} {contact?.surname}
                  </p>
                  <div>
                    {contact?.isOnline === 'Online' ? (
                      <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    ) : contact?.isOnline === 'Busy' ? (
                      <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
                    ) : (
                      <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                    )}
                  </div>
                </div>
              </Dropdown.Item>
            ))
          : userContacts?.map((contact) => (
              <Dropdown.Item
                key={contact?._id}
                id={contact?.name}
                onClick={() => handleClick(contact)}>
                <div className='flex text-sm items-center justify-between w-full'>
                  <img
                    className='w-10 h-10 rounded-full'
                    src={contact?.avatar}
                    alt='avatar'
                  />
                  <p>
                    {contact?.name} {contact?.surname}
                  </p>
                  <div>
                    {contact?.isOnline === 'Online' ? (
                      <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    ) : contact?.isOnline === 'Busy' ? (
                      <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
                    ) : (
                      <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                    )}
                  </div>
                </div>
              </Dropdown.Item>
            ))}
      </Dropdown>
    </div>
  );
};

export default ButtonDropDown;
