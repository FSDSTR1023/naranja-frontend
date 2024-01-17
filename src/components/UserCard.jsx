/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../context/MessagesContext';
import { useUser } from '../context/UserContext';

const UserCard = ({ contact }) => {
  const navigate = useNavigate();
  const { setRoom } = useMessage();
  const { user, setSelectedUser } = useUser();

  const handleClick = async () => {
    setSelectedUser(contact);
    contact._id > user._id
      ? setRoom(contact._id + user._id)
      : setRoom(user._id + contact._id);

    navigate(`/chat-page`);
  };

  return (
    <div
      className='flex flex-col flex-wrap w-full border-2 border-gray-400 rounded-md my-1 cursor-pointer p-1'
      onClick={() => handleClick(contact)}>
      <div className='flex w-full justify-between items-center p-1'>
        <img
          className='w-6 h-6 rounded-full'
          src={contact?.avatar}
          alt='avatar'
        />
        <div>
          <p className='font-bold text-[10px]'>{contact?.name}</p>
          <p className='font-bold text-[10px]'>{contact?.surname}</p>
        </div>
        {contact?.isOnline === 'Online' ? (
          <div className='w-2 h-2 bg-green-500 rounded-full'></div>
        ) : contact?.isOnline === 'Busy' ? (
          <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
        ) : (
          <div className='w-2 h-2 bg-red-500 rounded-full'></div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
