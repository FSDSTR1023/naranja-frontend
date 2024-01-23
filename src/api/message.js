import axios from './axios';

export const getAllMessagesRequest = (id_group) =>
  axios.get(`/messages/${id_group}`);

export const createMessageRequest = (message) =>
  axios.post('/messages/message', message);

export const getLiveKitToken = (room, username) =>
  axios.get(`/video/${room}&${username}`);
