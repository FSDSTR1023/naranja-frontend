/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useContext, useState } from 'react';

import {
  getAllMessagesRequest,
  createMessageRequest,
  editMessageRequest,
  deleteMessageRequest,
} from '../api/message';
import { updateLastMessageRequest } from '../api/groups.js';

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
    const groupId = newMessage.group;
    try {
      const response = await createMessageRequest(newMessage);

      console.log(response.data, 'response.data del createMessage');
      setMessage([...message, response.data]);
      const messageBody = response.data._id;

      updateLastMessage(groupId, messageBody);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessage = (groupId, messageBody) => {
    const interval = setTimeout(async () => {
      await updateLastMessageRequest(groupId, messageBody);
    }, 1000);
    return () => clearTimeout(interval);
  };

  const editMessage = async (message) => {
    const { messageId } = message;

    try {
      const response = await editMessageRequest(messageId, message);
      return response.data;
    } catch (error) {
      console.log(error, '<-- error del editMessage');
    }
  };
  const deleteMessage = async (messageId) => {
    try {
      const response = await deleteMessageRequest(messageId);
      return response.data;
    } catch (error) {
      console.log(error, '<-- error del deleteMessage');
    }
  };
  // <-- van todas las funciones del los grupos

  return (
    <MessageContext.Provider
      value={{
        message,
        setMessage,
        getAllMessages,
        createMessage,
        room,
        setRoom,
        editMessage,
        deleteMessage,

        // <-- van todas las funciones del los grupos para exportarlas
      }}>
      {children}
    </MessageContext.Provider>
  );
};
