import clsx from 'clsx';
import ChatComponent from '../components/ChatComponent';
import { useEffect, useState } from 'react';
import { useGroups } from '../context/GroupContext';
import DragDropContext from '../components/DragDropContext';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '../context/UserContext';
import { useTasks } from '../context/TasksContext';

import ButtonDropDownGroup from '../components/ButtonDropDownGroup';

const GroupPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [addContainerInput, setAddContainerInput] = useState(false);

  const [containerName, setContainerName] = useState('');
  const { currentGroup, groups } = useGroups();
  const { user } = useUser();
  const { createNewTask, containers, setContainers, getAllTasks } = useTasks();

  useEffect(() => {
    getAllTasks(currentGroup?._id);
  }, [currentGroup?._id]);

  const onAddContainer = () => {
    if (!containerName) return;
    const id = `container-${uuidv4()}`;
    const newContainer = {
      id,
      title: containerName,
      groupId: currentGroup?._id,
      userId: user?._id,

      items: [],
    };
    setContainers([
      ...containers,
      {
        id,
        title: containerName,
        groupId: currentGroup?._id,
        userId: user?._id,

        items: [],
      },
    ]);
    setContainerName('');
    setAddContainerInput(!addContainerInput);
    createNewTask(newContainer);
  };

  return (
    <div className='flex flex-col bg-gray-500 w-full h-full'>
      <div className='flex w-full h-[50px] bg-orange-500 items-center justify-between gap-3'>
        <div className='ml-3 flex flex-row gap-3 justify-center items-center'>
          <ButtonDropDownGroup groups={groups} />
          <h1 className='text-sm font-bold text-gray-700'>
            {currentGroup?.name}
          </h1>
        </div>

        {addContainerInput ? (
          <div className='flex flex-row w-[60%] justify-center items-center gap-3'>
            <button
              onClick={onAddContainer}
              className='bg-gray-200 p-2 text-center text-gray-700 text-[11px]               
              font-bold rounded-md hover:bg-gray-300 m-2 pointer-events-auto'>
              Add
            </button>
            <input
              className='border-2 border-gray-500 rounded-lg py-1 px-1 w-full mr-3'
              type='text'
              placeholder='Container Title'
              name='containername'
              onKeyDown={(e) =>
                (e.key === 'Escape' &&
                  setAddContainerInput(!addContainerInput)) ||
                (e.key === 'Enter' && onAddContainer())
              }
              value={containerName}
              onChange={(e) => setContainerName(e.target.value)}
            />
          </div>
        ) : (
          <div className='mr-3 flex flex-row'>
            <button
              className='bg-gray-200 p-2 text-center text-gray-700 text-[11px]               
              font-bold rounded-md hover:bg-gray-300 m-2 pointer-events-auto'
              onClick={() => setAddContainerInput(!addContainerInput)}>
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
              <button
                className='bg-gray-200 p-2 text-center text-gray-700 text-[11px]               
              font-bold rounded-md hover:bg-gray-300 m-2 pointer-events-auto'>
                Añadir Participante
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className='bg-gray-200 p-2 text-center text-gray-700 text-[11px]               
              font-bold rounded-md hover:bg-gray-300 m-2 pointer-events-auto'>
                Open Chat
              </button>
            </div>
          </div>
        )}
      </div>
      <div className='flex flex-row h-full w-full '>
        <div className='h-[90%] w-full bg-gray-300 overflow-auto'>
          <DragDropContext
            containerName={containerName}
            setContainerName={setContainerName}
            containers={containers}
            setContainers={setContainers}
          />
        </div>

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
