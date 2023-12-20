import axios from './axios';

export const getAllGroupsRequest = () => axios.get('/groups');
