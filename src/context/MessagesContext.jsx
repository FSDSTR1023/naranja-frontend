/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { getAllMessagesRequest, createMessageRequest } from '../api/message';
import { useUser } from './UserContext';

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

  const [room, setRoom] = useState(''); // <-- cambiar por el id del grupo
  const { user, getAllUsers } = useUser();

  const socket = io.connect('http://localhost:4000');
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conectado al servidor', socket.id);
      console.log(user, '<-- user en el useEffect');
      getAllUsers();
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const getAllMessages = async (groupId) => {
    try {
      setMessage([]);
      const response = await getAllMessagesRequest(groupId);
      console.log(response.data, '<-- response.data del getAllMessages');
      setMessage(response.data);
    } catch (error) {
      console.log(error, '<-- error del getAllMessages');
    }
  };

  const createMessage = async (newMessage) => {
    console.log(newMessage, '<-- newMessage en createMessage');
    try {
      const response = await createMessageRequest(newMessage);
      console.log(response.data, 'response.data del createMessage');
      setMessage([...message, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  // <-- van todas las funciones del los grupos

  return (
    <MessageContext.Provider
      value={{
        socket,
        message,
        setMessage,

        getAllMessages,
        createMessage,
        room,
        setRoom,

        // <-- van todas las funciones del los grupos para exportarlas
      }}>
      {children}
    </MessageContext.Provider>
  );
};
