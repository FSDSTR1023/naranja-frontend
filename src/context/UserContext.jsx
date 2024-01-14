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
} from '../api/user';
import Cookies from 'js-cookie';
import axios from 'axios';
import io from 'socket.io-client';

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

      const token = Cookies.get('token');

      if (!token) {
        throw new Error('No hay token');
      }
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

  const logOutUser = () => {
    socket.emit('disconnect-user', user);
    updateIsOnline(user, 'Offline');
    setUser(null);
    setIsAuthenticated(false);
    Cookies.remove('token');
  };
  const socket = io.connect('http://localhost:4000');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('conectado');
    });

    socket.on('user-disconnected', (userId) => {
      console.log('user desconectado', userId);
      setUsersChanges(!usersChanges);
    });

    socket.on('new-user-online', () => {
      setUsersChanges(!usersChanges);
    });

    socket.on('user-status-change', () => {
      setUsersChanges(!usersChanges);
    });

    return () => {
      console.log('desconectado');
      socket.off();
    };
  }, [socket]);

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

        // <-- van todas las funciones del los grupos para exportarlas
      }}>
      {children}
    </UserContext.Provider>
  );
};
