import axios from './axios';

export const getAllMessagesRequest = (groupId) =>
  axios.get(`/messages/${groupId}`);

export const createMessageRequest = (message) =>
  axios.post('/messages/message', message);
