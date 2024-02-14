/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';
import {
  registerRequest,
  sendTokenToServer,
  sendLoginUserRequest,
  updateUserRequest,
  getAllUsersRequest,
  editUserPasswordRequest,
  logOutRequest,
  logInWithTokenRequest,
  sendForgotPasswordRequest,
} from '../api/user';

import axios from 'axios';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

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
  const [selectedUser, setSelectedUser] = useState({});
  const [usersChanges, setUsersChanges] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const logWithToken = async () => {
      const response = await logInWithTokenRequest();
      console.log(
        response.data,
        '<-- response.data en useEffect de UserContext'
      );
      if (response.status === 200) {
        setUser(response.data);
        setIsAuthenticated(true);
        setIsOnline(response.data.isOnline);
        socket.emit('new-user', response.data);
      }
    };
    logWithToken();
  }, []);

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
      const userToLogIn = {
        ...data,
        isOnline: 'Online',
      };
      const response = await sendLoginUserRequest(userToLogIn);

      const userToLogin = response.data;

      if (userToLogin.status === false) {
        throw new Error('No se pudo loguear, verifique su correo electronico');
      }

      setIsOnline(userToLogin.isOnline);
      setUser(userToLogin);
      setIsAuthenticated(true);
      socket.emit('new-user', userToLogin);
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
      axios.post(import.meta.env.VITE_COUDINARY, formData).then((response) => {
        setUser({ ...user, avatar: response.data.url });
        updateUserRequest(user);
      });
    } catch (error) {
      console.log(error, '<-- error en uploadProfilePicture');
    }
  };

  const updateUserPassword = async (user, password) => {
    const data = {
      _id: user._id,
      password: password,
    };
    try {
      const userFound = await editUserPasswordRequest(data);
      setUser({ ...user, password: userFound.password });
    } catch (error) {
      console.log(error, '<-- error en updateUserPassword');
    }
  };

  const updateIsOnline = async (user, state) => {
    console.log(state, '<-- state en updateIsOnline');
    const data = {
      ...user,
      isOnline: state,
    };
    try {
      const userFound = await updateUserRequest(data);
      setUser({ ...user, isOnline: userFound.isOnline });
      socket.emit('user-status');
    } catch (error) {
      console.log(error, '<-- error en updateIsOnline');
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await getAllUsersRequest();
      console.log(response.data, '<-- response.data en getAllUsers');
      const users = response.data;
      const filteredUsers = users.filter((contact) => {
        return contact.email !== user.email;
      });

      setAllUsers(filteredUsers);
    } catch (error) {
      console.log(error, '<-- error en getAllUsers');
    }
  };

  const recoverPasswordRequest = async (data) => {
    console.log(data, '<-- data en recoverPasswordRequest');
    try {
      await sendForgotPasswordRequest(data);
    } catch (error) {
      console.log(error, '<-- error en recoverPasswordRequest');
    }
  };

  const logOutUser = async () => {
    socket.emit('disconnect-user', user);
    updateIsOnline(user, 'Offline');
    logOutRequest(user);
    setUser(null);
    setIsAuthenticated(false);
    console.log('deslogueado');
    navigate('/');
  };
  const socket = io.connect('http://localhost:4000');

  useEffect(() => {
    // socket.on('connect', () => {
    //   console.log('conectado');
    // });

    socket.on('user-disconnected', (user) => {
      console.log('user desconectado', user);
      setUsersChanges(!usersChanges);
    });

    socket.on('new-user-online', () => {
      console.log('nuevo usuario conectado', user);
      setUsersChanges(!usersChanges);
    });

    socket.on('user-status-change', () => {
      setUsersChanges(!usersChanges);
    });

    return () => {
      socket.off();
    };
  }, [socket, usersChanges]);

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
        logOutUser,
        selectedUser,
        setSelectedUser,
        socket,
        usersChanges,
        recoverPasswordRequest,

        // <-- van todas las funciones del los grupos para exportarlas
      }}>
      {children}
    </UserContext.Provider>
  );
};
