import axios from './axios';

export const getAllGroupsRequest = (userId) =>
  axios.get(`/group/groups/${userId}`);

export const createGroupRequest = (group) => axios.post('/group', group);

export const getGroupByIdOrCreate = (group) =>
  axios.post('/group/group', group);
