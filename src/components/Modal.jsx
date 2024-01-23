

// Componente Modal prueba
const Modal = ({ isVisible, onClose, children }) => {
    if (!isVisible) return null;
  
    return (

     <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="bg-white p-6 rounded border border-gray-300 relative">
          <button onClick={onClose} className="absolute right-2 top-0">x</button>
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;
