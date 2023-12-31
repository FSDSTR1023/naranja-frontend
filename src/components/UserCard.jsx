/* eslint-disable react/prop-types */
const UserCard = ({ contact }) => {
  return (
    <>
      <div
        className='flex flex-col flex-wrap w-full border-2 border-gray-400 rounded-md p-2 my-1 cursor-pointer'
        onClick={() => console.log(contact._id)}>
        <div className='flex w-full justify-between items-center p-2'>
          <img
            className='w-10 h-10 rounded-full'
            src={contact?.avatar}
            alt='avatar'
          />
          <div>
            <p className='font-bold text-sm'>{contact?.name}</p>
            <p className='font-bold text-sm'>{contact?.surname}</p>
          </div>
          {contact?.isOnline === 'Online' ? (
            <div className='w-2 h-2 bg-green-500 rounded-full'></div>
          ) : contact?.isOnline === 'Busy' ? (
            <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
          ) : (
            <div className='w-2 h-2 bg-red-500 rounded-full'></div>
          )}
        </div>
        <div className='flex flex-col justify-center'>
          <p className='text-xs text-start  mb-1'>
            Lorem ipsum dolor sit amet...{' '}
          </p>
          <p className='text-[10px] text-end'>23/09/2023</p>
        </div>
      </div>
    </>
  );
};

export default UserCard;
