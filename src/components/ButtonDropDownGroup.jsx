/* eslint-disable react/prop-types */
import { Dropdown } from 'keep-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../context/MessagesContext';
import { useGroups } from '../context/GroupContext';

const ButtonDropDownGroup = ({ groups }) => {
  const navigate = useNavigate();
  const { setRoom } = useMessage();

  const { setCurrentGroup } = useGroups();

  const handleClick = async (groupId) => {
    console.log(groupId);
    setCurrentGroup(groupId);
    setRoom(groupId);

    navigate(`/groupboard/${groupId}`);
  };

  const [search, setSearch] = useState('');
  let filteredGroups = [];

  if (search.length > 0) {
    const filtered = groups?.filter((group) => {
      return group?.name.toLowerCase().startsWith(search.toLowerCase());
    });
    console.log(filtered);
    filteredGroups = filtered;
  }

  return (
    <div className='flex flex-col justify-center items-center focus:outline-none'>
      <Dropdown
        className='bg-orange-500 text-white mt-1 mb-1 text-[9px] 
        font-bold rounded-md hover:bg-orange-400 hover:border-orange-400 
        m-2 pointer-events-auto whitespace-nowrap focus:outline-none outline-none focus:ring-0 focus:shadow-none focus:border-none'
        label='Group Boards'
        type='primary'
        size='xs'
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
        {filteredGroups?.length > 0
          ? filteredGroups?.map((group) => (
              <Dropdown.Item
                key={group?._id}
                id={group?.name}
                onClick={() => handleClick(group?._id)}>
                <div className='flex text-sm items-center justify-between w-full'>
                  <div className='flex items-center justify-center'>
                    {' '}
                    {group?.members?.map((member) => (
                      <img
                        key={member?._id}
                        className='w-4 h-4 rounded-full'
                        src={member?.avatar}
                        alt='avatar'
                      />
                    ))}
                  </div>
                  <div className=''>
                    {' '}
                    <p>{group?.name}</p>
                  </div>
                </div>
              </Dropdown.Item>
            ))
          : groups?.map((group) => (
              <Dropdown.Item
                key={group?._id}
                id={group?.name}
                onClick={() => handleClick(group?._id)}>
                <div className='flex text-sm items-center justify-between w-full cursor-pointer'>
                  <div className='flex items-center justify-center'>
                    {group?.members?.map((member) => (
                      <img
                        key={member?._id}
                        className='w-4 h-4 rounded-full'
                        src={member?.avatar}
                        alt='avatar'
                      />
                    ))}
                  </div>
                  <div className=''>
                    <p>{group?.name}</p>
                  </div>
                </div>
              </Dropdown.Item>
            ))}
      </Dropdown>
    </div>
  );
};

export default ButtonDropDownGroup;
