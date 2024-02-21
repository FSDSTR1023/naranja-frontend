import axios from './axios';

export const getAllTasksRequest = (groupId) => axios.get(`/task/${groupId}`);

export const createTaskRequest = (task) => axios.post('/task/newTask', task);

export const updateTaskRequest = (groupId, tasks) =>
  axios.put(`/task/${groupId}`, tasks);

export const deleteTaskRequest = (id) => axios.delete(`/task/deleted/${id}`);

export const updateManyTasksRequest = (groupId, tasks) =>
  axios.post(`/task/updateMany/${groupId}`, tasks);

export const updateTitleTaskRequest = (containerId, task) =>
  axios.put(`/task/updateTitle/${containerId}`, task);

export const updateTaskInfoRequest = (containerId, task) =>
  axios.put(`/task/updateTaskInfo/${containerId}`, task);

export const sendNotificationEmail = (email, task, groupName) =>
  axios.post('/task/assignedTo/sendNotification', { email, task, groupName });
