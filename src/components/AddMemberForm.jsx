import { useUser } from '../context/UserContext';
import { useState } from 'react';
import { useGroups } from '../context/GroupContext';

const AddMemberForm = ({ toggleModal }) => {
  const [filteredUsers, setFilteredUsers] = useState(null);
  const { allUsers } = useUser();
  const { editMembersFromGroup, currentGroup } = useGroups();
  const handleAddMember = async (contact) => {
    console.log(contact);
    const group = currentGroup;

    const groupId = currentGroup?._id;
    await editMembersFromGroup(groupId, group, contact);
    toggleModal();
  };
  return (
    <div className='h-[500px] w-[400px] text-xl p-5 rounded-md'>
      <h1 className='text-xl font-bold text-black p-1'>
        Agrega un Nuevo Miembro
      </h1>
      <div className='flex flex-col items-center justify-center mt-8 text-sm'>
        <input
          onChange={(e) => {
            setFilteredUsers(
              allUsers.filter((user) =>
                user.name.toLowerCase().includes(e.target.value.toLowerCase())
              )
            );
          }}
          type='text'
          placeholder='Nombre'
          className='w-[300px] h-[40px] border-2 border-gray-300 
          rounded-lg p-2 ring-0 ring-inset-0 focus:ring-2 focus:ring-orange-500 focus:outline-none mb-1'
        />
        <ul className=' flex flex-col  items-center overflow-y-auto scrollbar  overflow-x-hidden rounded-md  bg-orange-400 w-[300px]'>
          {filteredUsers
            ? filteredUsers.map((contact) => (
                <li key={contact._id}>
                  <div
                    onClick={() => handleAddMember(contact)}
                    className='flex flex-col
                   text-gray-700 items-start justify-center w-[300px] px-3 py-1 hover:bg-orange-600 cursor-pointer '>
                    <p className='text-sm'>{contact?.name}</p>
                    <p className='text-xs'>
                      <em>{contact?.email}</em>
                    </p>
                  </div>
                </li>
              ))
            : allUsers?.map((contact) => (
                <li key={contact._id}>
                  <div
                    onClick={() => handleAddMember(contact)}
                    className='flex flex-col text-gray-700 
                    items-start justify-center w-[300px] px-3 py-1 hover:bg-orange-600 cursor-pointer '>
                    <p className='text-sm'>{contact?.name}</p>
                    <p className='text-xs'>
                      <em>{contact?.email}</em>
                    </p>
                  </div>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default AddMemberForm;
