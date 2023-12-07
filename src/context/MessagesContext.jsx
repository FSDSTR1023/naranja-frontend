/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext } from 'react';

export const MessageContext = createContext();

export const useMessage = () => {
  const context = useContext(MessageContext);

  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }

  return context;
};

export const MessageProvider = ({ children }) => {
  // <-- van todas las funciones del los grupos

  return (
    <MessageContext.Provider
      value={
        {
          // <-- van todas las funciones del los grupos para exportarlas
        }
      }>
      {children}
    </MessageContext.Provider>
  );
};
