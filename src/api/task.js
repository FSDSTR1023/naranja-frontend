import axios from './axios';

export const getAllTasksRequest = () => axios.get('/task');

export const getTaskById = (id) => axios.get(`/task/${id}`);

export const createNewTask = (task) => axios.post('/task/create', task);

export const editTask = (id, task) => axios.put(`/task/${id}`, task);
