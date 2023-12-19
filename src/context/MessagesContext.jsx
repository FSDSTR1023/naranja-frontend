/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

export const MessageContext = createContext();

export const useMessage = () => {
  const context = useContext(MessageContext);

  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }

  return context;
};

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState([]);
  const [mySocket, setMySocket] = useState('');

  const socket = io.connect('http://localhost:4000');
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conectado al servidor', socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  // <-- van todas las funciones del los grupos

  return (
    <MessageContext.Provider
      value={{
        socket,
        message,
        setMessage,
        mySocket,
        setMySocket,
        // <-- van todas las funciones del los grupos para exportarlas
      }}>
      {children}
    </MessageContext.Provider>
  );
};
