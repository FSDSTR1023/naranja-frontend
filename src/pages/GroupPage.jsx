import clsx from 'clsx';
import ChatComponent from '../components/ChatComponent';
import { useState } from 'react';
import { useGroups } from '../context/GroupContext';

const GroupPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentGroup } = useGroups();

  return (
    <div className='flex flex-col bg-gray-500 w-full h-full'>
      <div className='flex w-full h-[45px] bg-orange-500 items-center justify-between gap-3'>
        <div className='ml-3 flex flex-row gap-3 justify-center items-center'>
          <button className='text-[11px] border-2 border-gray-500 rounded-lg py-2 px-1 '>
            Mis Grupos ↓
          </button>
          <h1 className='text-sm font-bold text-gray-700'>
            {currentGroup?.name}
          </h1>
        </div>
        <div className='mr-3 flex flex-row'>
          <button className='text-[11px] border-2 border-gray-500 rounded-lg py-2 px-1'>
            Añadir Tablero
          </button>
          <div className='relative flex flex-row mr-3 items-center justify-center ml-3'>
            {currentGroup?.members?.map((member) => (
              <img
                key={member._id}
                className='w-6 h-6 rounded-full relative left-0 top-0'
                src={member?.avatar}
                alt='Avatar'
              />
            ))}
          </div>
          <div className='flex gap-2 items-center justify-center'>
            <button className='text-[11px] border-2 border-gray-500 rounded-lg py-2 px-1'>
              Añadir Participante
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='text-[11px] border-2 border-gray-500 rounded-lg py-2 px-1'>
              Open Chat
            </button>
          </div>
        </div>
      </div>
      <div className='flex flex-row h-full w-full'>
        <div className='h-full w-full bg-gray-300'></div>

        <div
          className={clsx(
            'h-full w-[90%] transition',
            !isOpen ? 'hidden' : null
          )}>
          <ChatComponent />
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
