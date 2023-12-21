/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';
import { createGroupRequest, getAllGroupsRequest } from '../api/groups.js';

export const GroupContext = createContext();

export const useGroups = () => {
  const context = useContext(GroupContext);

  if (!context) {
    throw new Error('useGroups must be used within a GroupProvider');
  }

  return context;
};

export const GroupProvider = ({ children }) => {
  // <-- van todas las funciones del los grupos
  const [groups, setGroups] = useState([]);

  const getAllGroups = async (userId) => {
    try {
      const response = await getAllGroupsRequest(userId);
      console.log(response, '<-- response del getAllGroups');
      console.log(response.data, '<-- response.data del getAllGroups');
      const groups = response.data;
      setGroups(groups);
    } catch (error) {
      console.log(error, '<-- error del getAllGroups');
    }
  };
  const getGroupById = async () => {};
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
        setGroups,
        getAllGroups,
        getGroupById,
        createGroup,

        // <-- van todas las funciones del los grupos para exportarlas
      }}>
      {children}
    </GroupContext.Provider>
  );
};
