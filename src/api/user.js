import axios from './axios';

export const login = async (email, password) =>
  axios.post('/login', { email, password });
