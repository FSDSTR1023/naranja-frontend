/* eslint-disable react/prop-types */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import ToolTip from './ToolTip';
import { useState } from 'react';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { GoPlusCircle } from 'react-icons/go';

import { v4 as uuidv4 } from 'uuid';
import { useTasks } from '../context/TasksContext';

const DragDropContainer = ({
  id,
  children,
  title,
  setCurrentContainerId,
  itemName,
  setItemName,
  containers,
  setContainers,
}) => {
  const [addNewItem, setAddNewItem] = useState(false);
  const [edittingContainer, setEdittingContainer] = useState(false);
  const [titleContainer, setTitleContainer] = useState('');

  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: 'container',
    },
  });

  const { deleteTask, updateTask, updateTitleContainer } = useTasks();
  const onAddItem = (itemName, currentId) => {
    setCurrentContainerId(currentId);
    if (!itemName) return;
    const id = `item-${uuidv4()}`;
    const container = containers.find((item) => item.id === currentId);

    const updatedItems = [
      ...container.items,
      {
        id,
        title: itemName,
        description: '',
        fileAt: '',
        completed: false,
        assignedTo: null,
        followers: [],
      },
    ];

    updateTask(container.id, updatedItems);
    if (!container) return;
    container.items.push({
      id,
      title: itemName,
      description: '',
      fileAt: '',
      completed: false,
      assignedTo: null,
      followers: [],
    });

    setContainers([...containers]);
    setItemName('');
    setAddNewItem(!addNewItem);
  };
  const onDeleteContainer = (id) => {
    deleteTask(id);
    const filteredContainers = containers.filter(
      (container) => container.id !== id
    );

    setContainers(filteredContainers);
  };

  const onEditContainer = (id) => {
    setEdittingContainer(false);
    const container = containers.find((item) => item.id === id);

    const updatedContainer = { ...container, title: titleContainer };

    updateTitleContainer(container.id, updatedContainer);
    if (!container) return;
    container.title = titleContainer;
    setContainers([...containers]);
  };

  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx(
        'card-container w-full h-full p-4 bg-orange-300 rounded-xl flex flex-col gap-y-4 justify-between',
        isDragging && 'opacity-50'
      )}>
      <div className='flex items-center justify-between flex-wrap'>
        <div className='gap-y-1'>
          {edittingContainer ? (
            <input
              autoFocus={true}
              type='text'
              value={titleContainer}
              onChange={(e) => setTitleContainer(e.target.value)}
              onKeyDown={(e) =>
                (e.key === 'Escape' &&
                  setEdittingContainer(!edittingContainer)) ||
                (e.key === 'Enter' && onEditContainer(id))
              }
              className='border-2 border-gray-500 rounded-md p-1 w-full'
            />
          ) : (
            <h1 className='text-gray-800 text-md'>{title}</h1>
          )}
        </div>
        <div className='flex gap-1 '>
          <button
            onClick={() => onDeleteContainer(id)}
            className='border p-2 text-xs rounded-xl shadow-lg hover:shadow-xl bg-gray-200'>
            <ToolTip label='Delete Panel'>
              <BiTrash size={10} />
            </ToolTip>
          </button>
          <button
            onClick={() => {
              setEdittingContainer(true);
              setTitleContainer(title);
            }}
            className='border p-2 text-xs rounded-xl shadow-lg hover:shadow-xl bg-gray-200'>
            <ToolTip label='Edit Panel'>
              <BiPencil size={10} />
            </ToolTip>
          </button>
        </div>
      </div>
      <div className='flex flex-col justify-start h-full'>{children}</div>
      {!addNewItem ? (
        <button
          className='border-2 p-2 rounded-md hover:border-2 hover:p-2 text-xs hover:rounded-md hover:border-gray-300 hover:bg-slate-50/10 flex font-bold items-center bg-gray-200'
          onClick={() => setAddNewItem(!addNewItem)}>
          <GoPlusCircle
            size={14}
            className='mr-2'
          />
          Add Task
        </button>
      ) : (
        <div className='flex flex-col w-full items-start gap-4 '>
          <h1 className='text-gray-800 text-sm font-bold text-start'>
            Add Task
          </h1>
          <input
            type='text'
            placeholder='Item Title'
            name='itemname'
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            onKeyDown={(e) =>
              (e.key === 'Escape' && setAddNewItem(!addNewItem)) ||
              (e.key === 'Enter' && onAddItem(itemName, id))
            }
            className='border-2 border-gray-500 rounded-md p-1 w-full'
          />
          <button
            className='border-2 p-2 rounded-md hover:border-2 
            hover:p-2 text-xs hover:rounded-md hover:border-gray-300
             hover:bg-slate-50/10 flex w-full '
            onClick={() => {
              onAddItem(itemName, id);
            }}>
            Add Task
          </button>
        </div>
      )}
    </div>
  );
};

export default DragDropContainer;
