/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within an AuthProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const registerUserRecuest = async (data) => {
    console.log(data);
    // cosas con los datos y envio de datos al servidor
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        registerUserRecuest,
        isAuthenticated,
        setIsAuthenticated,
        // <-- van todas las funciones del los grupos para exportarlas
      }}>
      {children}
    </UserContext.Provider>
  );
};
