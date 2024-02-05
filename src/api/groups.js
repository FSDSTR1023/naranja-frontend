import axios from './axios';

export const getAllGroupsRequest = (userId) =>
  axios.get(`/group/groups/${userId}`);

export const createGroupRequest = (group) => axios.post('/group', group);

export const getGroupByIdOrCreate = (group) =>
  axios.post('/group/group', group);

export const updateLastMessageRequest = (groupId, messageBody) =>
  axios.patch(`/group/group/lastMessage/${groupId}`, { messageBody });

export const getCurrentGroupRequest = (groupId) =>
  axios.get(`/group/currentGroup/${groupId}`);

export const editGroupRequest = (groupId, group, contact) =>
  axios.put(`/group/${groupId}`, { group, contact });

export const deleteMemberFromGroupRequest = (groupId, user) =>
  axios.patch(`/group/member/${groupId}`, { user });
