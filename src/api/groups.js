import axios from './axios';

export const getAllGroupsRequest = () => axios.post('/groups');
