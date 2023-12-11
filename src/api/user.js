import axios from './axios';

export const registerRequest = (user) => axios.post('/register', user);

export const sendTokenToServer = (token) => axios.post(`/user/verify/${token}`);

export const sendLoginUserRequest = (data) => axios.post('/login', data);

export const updateUserRequest = (user) => axios.put('/user/update', user);
