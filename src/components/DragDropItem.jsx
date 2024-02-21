/* eslint-disable react/prop-types */
import { useSortable } from '@dnd-kit/sortable';
import { useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { BiTrash } from 'react-icons/bi';
import { BiPencil } from 'react-icons/bi';
import { useTasks } from '../context/TasksContext';
import Tooltip from '../components/ToolTip';
import { useUser } from '../context/UserContext';
import { sendNotification } from '../api/services';

const DragDropItem = ({
  id,
  title,
  containerId,
  toggleEditTask,
  setTaskInfoToEdit,
  item,
  containerTitle,
}) => {
  const { containers, setContainers, updateTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [titleEditing, setTitleEditing] = useState(title);
  const { user } = useUser();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: 'item',
    },
  });
  const onDeleteItem = (itemId, containerId) => {
    console.log(itemId, containerId, 'delete item');
    const container = containers.find((item) => item.id === containerId);
    console.log(container, 'container');
    if (!container) return;

    const filteredItems = container.items.filter((item) => item.id !== itemId);
    console.log(filteredItems, 'FilteredItems');

    container.items = filteredItems;

    console.log(container, 'container');
    updateTask(container.id, filteredItems);
    setContainers([...containers]);
  };
  const onEditItem = (itemId, containerId) => {
    setIsEditing(false);

    const container = containers.find((item) => item.id === containerId);

    if (!container) return;
    const taskToEdit = container.items.find((item) => item.id === itemId);
    taskToEdit.title = titleEditing;
    console.log(containerId);
    console.log(container, 'containers');

    updateTask(containerId, container.items);
    //notification to slack

    const data = {
      name: user?.name,
      surname: user?.surname,
      email: user?.email,
      taskTitle: taskToEdit?.title,
      containerTitle: container?.title,
      groupName: container.group?.name,
    };
    sendNotification(data);
    setContainers([...containers]);
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setTaskInfoToEdit({ item, containerId, containerTitle });
        toggleEditTask();
      }}
      className={clsx(
        `flex flex-wrap px-2 py-4 bg-white shadow-md rounded-xl w-full border border-transparent hover:border-gray-200 
        cursor-pointer h-full min-h-[98px] `,
        isDragging && 'opacity-50'
      )}>
      {isEditing ? (
        <input
          autoFocus={true}
          className='w-full h-full  ring-0 focus:ring-0 focus:outline-none inset-0 text-sm'
          value={titleEditing}
          onChange={(e) => setTitleEditing(e.target.value)}
          onKeyDown={(e) =>
            (e.key === 'Escape' && setIsEditing(false)) ||
            (e.key === 'Enter' && onEditItem(id, containerId))
          }
        />
      ) : (
        <div className='group flex justify-between w-full'>
          <p className='text-xs '>{title}</p>
          <div className='flex flex-col items-center justify-center opacity-0  gap-2 group-hover:opacity-100 '>
            <button
              onClick={() => onDeleteItem(id, containerId)}
              className='border p-2 text-xs rounded-xl shadow-lg hover:shadow-xl  '>
              <Tooltip label='Delete Task'>
                <BiTrash size={10} />
              </Tooltip>
            </button>

            <button
              onClick={() => {
                setIsEditing(true);

                console.log(id, title, containerId, 'edit container');
              }}
              className='border p-2 text-xs rounded-xl shadow-lg hover:shadow-xl'>
              <Tooltip label='Edit Task'>
                <BiPencil size={10} />
              </Tooltip>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DragDropItem;
