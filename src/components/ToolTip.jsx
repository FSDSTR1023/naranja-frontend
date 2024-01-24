import { useState } from 'react';
const ToolTip = ({ label, children }) => {
  const [show, setShow] = useState(false);
  return (
    <div
      className='relative'
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}>
      {show && (
        <p
          className='absolute flex justify-center items-center z-10
         -top-8 -left-1/2 bg-gray-700 text-white text-[8px] rounded-md min-w-[90px] p-3'>
          {label}
        </p>
      )}
      {children}
    </div>
  );
};

export default ToolTip;
