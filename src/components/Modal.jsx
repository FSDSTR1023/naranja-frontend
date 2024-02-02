import { RxCross1 } from 'react-icons/rx';
// Componente Modal prueba
const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div className='absolute top-0 left-0 w-full h-full bg-gray-300/70 z-20'>
      <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-30'>
        <div className='bg-white p-6 rounded border border-gray-300 relative'>
          <button
            onClick={onClose}
            className='absolute right-3 top-3'>
            <RxCross1 />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
