/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';
import {
  registerRequest,
  sendTokenToServer,
  sendLoginUserRequest,
  updateUserRequest,
  getAllUsersRequest,
  editUserPasswordRequest,
} from '../api/user';
import Cookie from 'js-cookie';
import axios from 'axios';

export const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within an AuthProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState([]);
  const [isOnline, setIsOnline] = useState('Offline');
  const [allUsers, setAllUsers] = useState([]);

  const registerUserRequest = async (data) => {
    try {
      console.log(data);
      const response = await registerRequest(data);
      console.log('response --->', response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error, '<-- error en el registerUserRecuest');
      setError(error);
    }

    // cosas con los datos y envio de datos al servidor
  };

  const verifyTokenRequest = async (token) => {
    sendTokenToServer(token);
  };

  const loginUserRequest = async (data) => {
    try {
      const response = await sendLoginUserRequest(data);
      console.log(response.data, '<-- response.data en loginUserRequest');
      const token = Cookie.get('token');
      console.log(token, '<-- token en loginUserRequest');
      if (!token) {
        throw new Error('No hay token');
      }
      const userToLogin = response.data;
      if (userToLogin.status === false) {
        throw new Error('No se pudo loguear, verifique su correo electronico');
      }
      setUser(userToLogin);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error, '<-- error en loginUserRequest');
      setError(error);
    }
  };

  const uploadProfilePicture = async (data) => {
    try {
      console.log(data, '<-- data en uploadProfilePicture');
      const formData = new FormData();
      formData.append('file', data);
      formData.append('upload_preset', 'emnwqxan');
      console.log(formData);
      axios
        .post(
          'https://api.cloudinary.com/v1_1/daoxla1fg/image/upload',
          formData
        )
        .then((response) => {
          setUser({ ...user, avatar: response.data.url });
          updateUserRequest(user);
        });
    } catch (error) {
      console.log(error, '<-- error en uploadProfilePicture');
    }
  };

  const updateUserPassword = async (data) => {
    try {
      const userFound = await editUserPasswordRequest(data);
      setUser(userFound);
    } catch (error) {
      console.log(error, '<-- error en updateUserPassword');
    }
  };

  const updateIsOnline = async (data) => {
    try {
      const userFound = await updateUserRequest(data);
      setUser(userFound);
    } catch (error) {
      console.log(error, '<-- error en updateIsOnline');
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await getAllUsersRequest();
      console.log(response.data, '<-- response.data en getAllUsers');
      const users = response.data;
      const filteredUsers = users.filter((contact) => contact._id !== user._id);
      setAllUsers(filteredUsers);
    } catch (error) {
      console.log(error, '<-- error en getAllUsers');
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        registerUserRequest,
        isAuthenticated,
        setIsAuthenticated,
        error,
        setError,
        verifyTokenRequest,
        loginUserRequest,
        uploadProfilePicture,
        updateUserPassword,
        isOnline,
        setIsOnline,
        updateIsOnline,
        getAllUsers,
        allUsers,
        setAllUsers,

        // <-- van todas las funciones del los grupos para exportarlas
      }}>
      {children}
    </UserContext.Provider>
  );
};
