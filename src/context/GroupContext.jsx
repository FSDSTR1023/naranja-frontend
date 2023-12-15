/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

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

  const getAllGroups = async () => {};
  const getGroupById = async () => {};

  return (
    <GroupContext.Provider
      value={{
        groups,
        setGroups,
        getAllGroups,
        getGroupById,

        // <-- van todas las funciones del los grupos para exportarlas
      }}>
      {children}
    </GroupContext.Provider>
  );
};
