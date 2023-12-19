import axios from './axios';

export const getAllGroupsRequest = () => axios.post('/group/groups');
export const createGroupRequest = (group) => axios.post('/group', group);
