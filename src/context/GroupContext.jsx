/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';
import {
  getAllGroupsRequest,
} from '../api/groups';

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

  // Function to fetch all groups
  const getAllGroups = async () => {
    try {
      const response = await getAllGroupsRequest();
      console.log("Groups fetched:", response.data);
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  // Call getAllGroups once when the component mounts
  useEffect(() => {
    getAllGroups();
  }, []); 


  return (
    <GroupContext.Provider
      value={{
        groups,
        setGroups, // You can remove this if you don't intend to directly set groups from components
        getAllGroups,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};
