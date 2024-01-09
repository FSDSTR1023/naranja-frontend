/* eslint-disable react/prop-types */

const GroupCard = ({ group }) => {
  return (
    <div
      className='flex flex-col border-2 border-gray-400 rounded-md cursor-pointer'
      onClick={() => {
        console.log('click en el grupo');
        alert(group._id);
      }}>
      <p className='font-bold text-sm'>{group?.name}</p>
      <p className='font-bold text-sm'>{group?.description}</p>
      <p className='font-bold text-sm'>Fecha último mensaje </p>
      {group.members.map((member) => (
        <span
          key={member?._id}
          className='border-2 border-gray-300 p-1 text-[15px]'>
          {member?.name}
        </span>
      ))}
    </div>
  );
};

export default GroupCard;
