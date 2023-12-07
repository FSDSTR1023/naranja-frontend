/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext } from 'react';

export const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  return (
    <UserContext.Provider
      value={
        {
          // <-- van todas las funciones del los grupos para exportarlas
        }
      }>
      {children}
    </UserContext.Provider>
  );
};
