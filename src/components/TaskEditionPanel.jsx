import { HiOutlineCreditCard } from 'react-icons/hi2';
import { GrTextAlignFull } from 'react-icons/gr';
import { FaRegEye } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa';
import { FaRegClock } from 'react-icons/fa';
import { SlPaperClip } from 'react-icons/sl';
import { useEffect, useRef, useState } from 'react';
import { useUser } from '../context/UserContext';

import { useTasks } from '../context/TasksContext';
import { useGroups } from '../context/GroupContext';
import Dropzone from 'react-dropzone';
import { uploadImage } from '../api/services';
import clsx from 'clsx';

const TaskEditionPanel = ({ toggleEditTask, taskInfoToEdit }) => {
  const task = taskInfoToEdit.item;
  const { editTaskInfo } = useTasks();
  const { user } = useUser();
  const { currentGroup } = useGroups();
  const calendarRef = useRef(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [description, setDescription] = useState('');
  const checkedRef = useRef();
  const [showMembers, setShowMembers] = useState();

  useEffect(() => {}, [taskInfoToEdit]);

  console.log(taskInfoToEdit);
  const containerTitle = taskInfoToEdit.containerTitle;
  const onSubmit = (e, task) => {
    e.preventDefault();
    const taskData = { ...task, description: description };
    taskInfoToEdit.item.description = description;
    editTaskInfo(taskInfoToEdit.containerId, taskData, currentGroup._id);
  };
  const handleChangeDate = (task) => {
    console.log(typeof calendarRef.current.value);
    const date = new Date(calendarRef.current.value);
    console.log(date);
    const taskData = { ...task, dateEnd: date };
    taskInfoToEdit.item.DateEnd = date;

    editTaskInfo(taskInfoToEdit.containerId, taskData, currentGroup._id);
    setCalendarOpen(!calendarOpen);
  };

  const handleImageUpload = async (task, file) => {
    console.log(file);
    const imageUrl = await uploadImage(file);
    console.log(imageUrl);
    const taskData = { ...task, fileAt: imageUrl };
    taskInfoToEdit.item.fileAt = imageUrl;
    editTaskInfo(taskInfoToEdit.containerId, taskData, currentGroup._id);
  };

  const handleFollowNotifications = (userId, task) => {
    if (task.followers && task.followers.length === 0) {
      const followers = [userId];
      console.log(followers);
      const taskData = {
        id: task.id,
        _id: task._id,
        title: task.title,
        description: task.description || '',
        dateEnd: task.dateEnd || null,
        dateStart: task.dateStart,
        fileAt: task.fileAt || '',
        completed: task.completed || false,
        assignedTo: task.assignedTo || null,
        followers: followers,
      };
      taskInfoToEdit.item.followers = followers;
      editTaskInfo(taskInfoToEdit.containerId, taskData, currentGroup._id);
    } else {
      console.log(userId);
      const followersId = task.followers?.map((follower) => follower._id);
      const followers = followersId?.includes(userId)
        ? task.followers
        : [...task.followers, userId];
      console.log(followers);
      console.log(followersId);

      const taskData = {
        id: task.id,
        _id: task._id,
        title: task.title,
        description: task.description || '',
        dateEnd: task.dateEnd || null,
        dateStart: task.dateStart,
        fileAt: task.fileAt || '',
        completed: task.completed || false,
        assignedTo: task.assignedTo || null,
        followers: followers,
      };
      taskInfoToEdit.item.followers = followers;
      editTaskInfo(taskInfoToEdit.containerId, taskData, currentGroup._id);
    }
  };

  const handleTaskCompleted = async (task) => {
    const taskData = { ...task, isCompleted: checkedRef.current.checked };
    taskInfoToEdit.item.isCompleted = checkedRef.current.checked;
    editTaskInfo(taskInfoToEdit.containerId, taskData, currentGroup._id);
  };

  const handelAssignTo = (member, task) => {
    const taskData = { ...task, assignedTo: member._id };
    taskInfoToEdit.item.assignedTo = member;
    editTaskInfo(taskInfoToEdit.containerId, taskData, currentGroup._id);

    setShowMembers(!showMembers);

    // enviar notificacion de que se le ha asignado una tarea
  };
  // Crear una Funcion que mire si hay usuarios siguiendo la tarea para notificarles por email cualquier cambio en la misma
  return (
    <div className='grid grid-cols-9 items-center justify-center p-2 bg-gray-800 rounded-md w-[600px] h-[800px]'>
      <div className='flex flex-col items-center justify-start col-span-7 bg-white h-full rounded-md'>
        <div className='flex justify-start items-center w-full h-auto'>
          <div className='p-1.5 w-auto h-full'>
            <HiOutlineCreditCard className='w-8 h-8' />
          </div>
          <div className='flex flex-col items-start justify-center ml-2 gap-2 text-center h-auto w-full '>
            <h1 className=' text-xl first-letter:uppercase pt-2'>
              {task.title}
            </h1>
            <p className='px-2 mt-0 text-xs'>en el tablero {containerTitle}</p>
            <div className='w-fit flex flex-col items-start'>
              <p className='text-sm font-bold text-start'>Notificaciones</p>
              <div className='flex items-center justify-center gap-3 self-start'>
                <button
                  className='flex items-center justify-center py-1 px-2 rounded-md gap-2 border-2 shadow-md
               border-gray-800 w-full text-sm mt-2'
                  onClick={() => {
                    handleFollowNotifications(user?._id, task);
                  }}>
                  <FaRegEye />
                  Seguir
                </button>

                {task.followers && task.followers.length > 0
                  ? task.followers.map((follower) => (
                      <img
                        key={follower._id}
                        src={follower.avatar}
                        alt={follower.name}
                        className='w-8 h-8 rounded-full'
                      />
                    ))
                  : null}
                {/*Si Hay Fecha la pondremos aqui */}
              </div>
              {task.dateEnd && (
                <div
                  className={clsx(
                    `flex items-center gap-4 flex-shrink-0 mt-2 border-2 shadow-md
               border-gray-800 w-full text-sm p-2 rounded-lg`,
                    task.isCompleted ? 'bg-green-600 text-white' : ''
                  )}>
                  <div className='text-xs'>
                    {' '}
                    {new Date(task.dateEnd).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                    {task.isCompleted ? ' - Completada' : ''}
                  </div>
                  <input
                    className='w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded
                     focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 
                     focus:ring-2 dark:bg-gray-700 dark:border-gray-60 accent-orange-600'
                    type='checkbox'
                    ref={checkedRef}
                    checked={task.isCompleted}
                    onChange={() => handleTaskCompleted(task)}
                  />
                </div>
              )}
              {task.assignedTo && (
                <div
                  className='flex items-center justify-center w-full rounded-lg 
             py-1 text-xs px-1 gap-1 whitespace-nowrap box-content overflow-hidden overflow-ellipsis
              hover:bg-gray-300 mt-2 border-2 shadow-md
               border-gray-800'
                  key={task.assignedTo._id}>
                  <p>Asignada a : </p>
                  <img
                    className='w-6 h-6 rounded-full'
                    src={task.assignedTo.avatar}
                    alt={task.assignedTo.name}
                  />
                  <span className='flex flex-wrap'>{task.assignedTo.name}</span>
                  <span className='flex flex-wrap'>
                    {task.assignedTo.surname}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='flex justify-start items-center w-full h-auto mt-[20px]'>
          <div className='p-2 w-auto h-full'>
            <GrTextAlignFull className='w-6 h-6' />
          </div>
          <div className='flex flex-col items-start justify-center ml-2 gap-2 text-center h-auto w-full '>
            <h1 className=' text-xl first-letter:uppercase pt-2'>
              Descripción
            </h1>
            <form
              onSubmit={(e) => onSubmit(e, task)}
              className='flex w-full flex-col items-start justify-center gap-2'>
              <textarea
                className='w-[90%] h-28 p-2 border-2 border-gray-800 rounded-md resize-none text-sm outline-none 
              focus:ring-2 focus:ring-gray-500'
                defaultValue={task.description || ''}
                placeholder='Añadir una descripción mas detallada ...'
                cols='20'
                rows='20'
                onChange={(e) => setDescription(e.target.value)}></textarea>
              <button
                type='submit'
                className='flex items-center justify-center py-1 px-2 rounded-md gap-2 border-2 shadow-md
               border-gray-800 w-fit text-sm mt-1'>
                Guardar
              </button>
            </form>
            <div className='h-[0.5px] bg-black w-[90%] mt-3 mb-3 ' />
            {task.fileAt && (
              <div className='flex items-center justify-center h-auto w-[90%]'>
                <a
                  href={task.fileAt}
                  target='_blank'
                  rel='noopener noreferrer'>
                  <img
                    src={task.fileAt}
                    alt='Archivo Adjunto'
                  />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className=' flex flex-col items-center justify-start col-span-2 h-full  w-full ml-1 bg-white rounded-md'>
        <div className='flex flex-col items-center justify-center p-2 w-full h-auto bg-white rounded-md shadow-md'>
          <h1 className='text-[13px] text-start w-full'>Sugerencias</h1>
          <div className='flex items-center justify-center py-1 px-2 rounded-md gap-2  w-full text-sm mt-1'>
            <button
              className='flex items-center justify-center py-1 px-2 rounded-md gap-2 border-2 shadow-md
               border-gray-800 w-full text-xs mt-1'
              onClick={toggleEditTask}>
              <FaRegUser />
              Unirse
            </button>
          </div>
          <div className='relative h-auto flex flex-col items-center justify-center py-1 px-2 rounded-md gap-2  w-full text-sm mt-1'>
            <button
              className='flex items-center justify-center py-1 px-2 rounded-md gap-2 border-2 shadow-md
               border-gray-800 w-full text-xs mt-1'
              onClick={() => {
                setShowMembers(!showMembers);
              }}>
              <FaRegUser />
              {task.assignedTo ? 'Asignada' : 'Asignar a'}
            </button>

            {showMembers && (
              <div className='flex flex-col items-center justify-center bg-white gap-2 w-[220px] p-1 rounded-lg'>
                {currentGroup.members.map((member) => (
                  <div
                    className='flex items-center justify-start gap-2 p-1 w-full rounded-md hover:bg-gray-300 cursor-pointer'
                    key={member._id}
                    onClick={() => handelAssignTo(member, task)}>
                    <img
                      className='w-8 h-8 rounded-full'
                      src={member.avatar}
                      alt={member.name}
                    />

                    <div className='flex flex-col items-start text-xs gap-1 '>
                      <div>
                        {' '}
                        <span>{member.name}</span>
                        <span>{member.surname}</span>
                      </div>

                      <p className='text-[10px] text-gray-400'>
                        {member.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <h1 className='text-[13px] text-start w-full mt-[10px]'>
            Añadir a la Tarjeta
          </h1>
          <div className='flex items-center justify-center py-1 px-2 rounded-md gap-2  w-full text-sm mt-1'>
            {calendarOpen ? (
              <div className='flex flex-col items-center justify-center gap-2'>
                <input
                  type='date'
                  className='w-full h-8 p-1 border-2 border-gray-800 rounded-md  text-xs outline-none '
                  ref={calendarRef}
                  defaultValue={
                    task.dateEnd
                      ? new Date(task.dateEnd).toISOString().split('T')[0]
                      : new Date().toISOString().split('T')[0]
                  }
                  onContextMenuCapture={(e) => {
                    e.stopPropagation();
                    setCalendarOpen(!calendarOpen);
                  }}
                  onChange={() => {
                    console.log(calendarRef.current.value);
                  }}
                />
                <button
                  className='flex items-center justify-center py-1 px-2 rounded-md gap-2 border-2 shadow-md
               border-gray-800 w-full text-xs mt-1'
                  onClick={() => handleChangeDate(task)}>
                  Guardar
                </button>
              </div>
            ) : (
              <button
                className='flex items-center justify-center py-1 px-2 rounded-md gap-2 border-2 shadow-md
               border-gray-800 w-full text-xs mt-1'
                onClick={() => {
                  setCalendarOpen(!calendarOpen);
                }}>
                <FaRegClock />
                Fechas
              </button>
            )}
          </div>
          <div
            className='flex items-center justify-center py-1 px-2 rounded-md gap-2 
               border-gray-800 w-full text-xs mt-1'>
            <Dropzone
              acceptedFiles='.jpg, .png, .jpeg, .gif, .svg, .pdf'
              multiple={false}
              noClick={true}
              onDrop={(acceptedFiles) => {
                handleImageUpload(task, acceptedFiles[0]);
              }}>
              {({ getRootProps, getInputProps, open }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />

                    <button
                      className='flex items-center justify-center py-1 px-4 rounded-md gap-2 border-2 shadow-md
               border-gray-800 w-full text-xs mt-1'
                      onClick={open}>
                      <SlPaperClip />
                      Adjunto
                    </button>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskEditionPanel;
