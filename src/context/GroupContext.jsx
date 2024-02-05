/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';
import {
  createGroupRequest,
  editGroupRequest,
  getAllGroupsRequest,
  getCurrentGroupRequest,
  getGroupByIdOrCreate,
  deleteMemberFromGroupRequest,
  deleteGroupRequest,
} from '../api/groups.js';

export const GroupContext = createContext();

export const useGroups = () => {
  const context = useContext(GroupContext);

  if (!context) {
    throw new Error('useGroups must be used within a GroupProvider');
  }

  return context;
};

export const GroupProvider = ({ children }) => {
  // State to store the groups
  const [groups, setGroups] = useState([]);
  const [groupError, setGroupError] = useState([]);
  const [currentGroup, setCurrentGroup] = useState({});
  const [privateGroups, setPrivateGroups] = useState([]);

  const getAllGroups = async (userId) => {
    try {
      const response = await getAllGroupsRequest(userId);
      setGroups([]);
      setPrivateGroups([]);
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].description === 'chat-privado') {
          setPrivateGroups((prevPrivateGroups) => [
            ...prevPrivateGroups,
            response.data[i],
          ]);
        } else {
          setGroups((prevGroups) => [...prevGroups, response.data[i]]);
        }
      }
    } catch (error) {
      console.log(error, '<-- error del getAllGroups');
    }
  };
  const getGroupById = async (group) => {
    try {
      const response = await getGroupByIdOrCreate(group);
      setCurrentGroup(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      setGroupError(error);
    }
  };
  const createGroup = async (newGroup) => {
    try {
      const response = await createGroupRequest(newGroup);
      console.log(response.data, 'response.data del createGroup');
      setGroups([...groups, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentGroup = async (groupId) => {
    try {
      const response = await getCurrentGroupRequest(groupId);
      setCurrentGroup(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const editMembersFromGroup = async (groupId, group, contact) => {
    try {
      const response = await editGroupRequest(groupId, group, contact);
      setCurrentGroup(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMemberFromGroup = async (groupId, member) => {
    try {
      const response = await deleteMemberFromGroupRequest(groupId, member);
      setCurrentGroup(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteGroup = async (groupId) => {
    try {
      await deleteGroupRequest(groupId);
    } catch (error) {
      console.log(error);
    }
  };

  // <-- van todas las funciones del los grupos

  return (
    <GroupContext.Provider
      value={{
        groups,
        setGroups,
        getAllGroups,
        getGroupById,
        createGroup,
        currentGroup,
        setCurrentGroup,
        groupError,
        setGroupError,
        privateGroups,
        setPrivateGroups,
        getCurrentGroup,
        editMembersFromGroup,
        deleteMemberFromGroup,
        deleteGroup,

        // <-- van todas las funciones del los grupos para exportarlas
      }}>
      {children}
    </GroupContext.Provider>
  );
};
