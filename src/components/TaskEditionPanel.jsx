import { HiOutlineCreditCard } from 'react-icons/hi2';
import { GrTextAlignFull } from 'react-icons/gr';
import { FaRegEye } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa';
import { FaRegClock } from 'react-icons/fa';
import { SlPaperClip } from 'react-icons/sl';
import { useRef, useState } from 'react';

const TaskEditionPanel = ({ toggleEditTask, taskInfoToEdit }) => {
  const calendarRef = useRef(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const task = taskInfoToEdit.item;
  const containerTitle = taskInfoToEdit.containerTitle;
  const containerId = taskInfoToEdit.containerId;
  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario Enviado');
  };
  const handleChangeDate = () => {
    console.log(calendarRef.current.value);
    setCalendarOpen(!calendarOpen);
  };

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
            <div className='w-fit'>
              <p className='text-sm font-bold'>Notificaciones</p>
              <div className='flex items-center justify-center gap-3'>
                <button
                  className='flex items-center justify-center py-1 px-2 rounded-md gap-2 border-2 shadow-md
               border-gray-800 w-full text-sm mt-1'
                  onClick={() => {
                    console.log('ContainerId: ', task.id, containerId);
                  }}>
                  <FaRegEye /> Seguir
                </button>
                {/*Si Hay Fecha la pondremos aqui */}
              </div>
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
              onSubmit={onSubmit}
              className='flex w-full flex-col items-start justify-center gap-2'>
              <textarea
                className='w-[90%] h-28 p-2 border-2 border-gray-800 rounded-md resize-none text-sm outline-none 
              focus:ring-2 focus:ring-gray-500'
                placeholder='Añadir una descripción mas detallada ...'
                cols='20'
                rows='20'></textarea>
              <button
                type='submit'
                className='flex items-center justify-center py-1 px-2 rounded-md gap-2 border-2 shadow-md
               border-gray-800 w-fit text-sm mt-1'>
                Guardar
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center justify-start col-span-2 h-full  w-full ml-1 bg-white rounded-md'>
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
                  onClick={handleChangeDate}>
                  Guardar
                </button>
              </div>
            ) : (
              <button
                className='flex items-center justify-center py-1 px-2 rounded-md gap-2 border-2 shadow-md
               border-gray-800 w-full text-xs mt-1'
                onClick={() => {
                  setCalendarOpen(!calendarOpen);
                  calendarRef.current.click();
                }}>
                <FaRegClock />
                Fechas
              </button>
            )}
          </div>
          <div className='flex items-center justify-center py-1 px-2 rounded-md gap-2  w-full text-sm mt-1'>
            <button
              className='flex items-center justify-center py-1 px-2 rounded-md gap-2 border-2 shadow-md
               border-gray-800 w-full text-xs mt-1'
              onClick={toggleEditTask}>
              <SlPaperClip />
              Adjunto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskEditionPanel;
