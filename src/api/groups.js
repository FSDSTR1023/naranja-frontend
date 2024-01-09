import axios from './axios';

export const getAllGroupsRequest = (userId) =>
  axios.post('/group/groups', userId);

export const createGroupRequest = (group) => axios.post('/group', group);

export const getGroupByIdOrCreate = (group) =>
  axios.post('/group/group', group);
