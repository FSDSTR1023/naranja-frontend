/* eslint-disable react/prop-types */

const GroupCard = ({ group }) => {
  return (
    <div
      className='flex flex-col border-2 border-gray-400 rounded-md cursor-pointer w-full p-2 mx-2'
      onClick={() => {
        console.log('click en el grupo');
        alert(group._id);
      }}>
      <p className='font-bold text-sm'>{group?.name}</p>
      <p className='font-bold text-xs text-gray-700'>
        Descripcion:{group?.description}
      </p>

      {group.members.map((member) => (
        <span
          key={member?._id}
          className='border-2 border-gray-300 p-1 mt-3 text-[15px] rounded-md'>
          {member?.name}
        </span>
      ))}
    </div>
  );
};

export default GroupCard;
