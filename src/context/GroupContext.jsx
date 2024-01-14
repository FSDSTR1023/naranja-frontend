/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';
import {
  createGroupRequest,
  getAllGroupsRequest,
  getGroupByIdOrCreate,
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

      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].description === 'chat-privado') {
          setPrivateGroups([...privateGroups, response.data[i]]);
        } else {
          setGroups([...groups, response.data[i]]);
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

  // <-- van todas las funciones del los grupos

  return (
    <GroupContext.Provider
      value={{
        groups,
        setGroups, // You can remove this if you don't intend to directly set groups from components
        getAllGroups,
        getGroupById,
        createGroup,
        currentGroup,
        setCurrentGroup,
        groupError,
        setGroupError,
        privateGroups,
        setPrivateGroups,

        // <-- van todas las funciones del los grupos para exportarlas
      }}>
      {children}
    </GroupContext.Provider>
  );
};
