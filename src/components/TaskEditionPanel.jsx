import { HiOutlineCreditCard } from 'react-icons/hi2';
import { GrTextAlignFull } from 'react-icons/gr';
import { FaRegEye } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa';
const TaskEditionPanel = ({ toggleEditTask, taskInfoToEdit }) => {
  const task = taskInfoToEdit.item;
  const containerTitle = taskInfoToEdit.containerTitle;
  const containerId = taskInfoToEdit.containerId;
  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario Enviado');
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
              Descriptión
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
      <div className='flex flex-col items-center justify-start col-span-2 h-full  w-full ml-1'>
        <div className='flex flex-col items-center justify-center gap-2 p-2 w-full h-auto bg-white rounded-md shadow-md'>
          <h1 className='text-lg'>Sugerencias</h1>
          <div className='flex items-center justify-center py-1 px-2 rounded-md gap-2  w-full text-sm mt-1'>
            <button
              className='flex items-center justify-center py-1 px-2 rounded-md gap-2 border-2 shadow-md
               border-gray-800 w-full text-sm mt-1'
              onClick={toggleEditTask}>
              <FaRegUser />
              Unirse
            </button>
          </div>
          <button
            className='flex items-center justify-center py-1 px-2 rounded-md gap-2 border-2 shadow-md
               border-gray-800 w-full text-sm mt-1'>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskEditionPanel;
