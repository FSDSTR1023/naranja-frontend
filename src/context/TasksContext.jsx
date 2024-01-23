/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';
import {
  getAllTasksRequest,
  createTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
  updateManyTasksRequest,
  updateTitleTaskRequest,
} from '../api/task';

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks debe estar dentro del proveedor TaskProvider');
  }
  return context;
};

export function TaskProvider({ children }) {
  const [allTasks, setAllTasks] = useState([]);
  const [myOwnTasks, setMyOwnTasks] = useState([]);
  const [myAssignedTasks, setMyAssignedTasks] = useState([]);
  const [containers, setContainers] = useState([]);

  const createNewTask = async (newTask) => {
    try {
      const response = await createTaskRequest(newTask);
      console.log(response);
      if (response.status === 200) {
        console.log(response.data);
        // setContainers([...containers, response.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTask = async (taskId) => {
    try {
      const response = await deleteTaskRequest(taskId);
      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (taskId, updatedTasks) => {
    try {
      const response = await updateTaskRequest(taskId, updatedTasks);
      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTasks = async (groupId) => {
    try {
      const response = await getAllTasksRequest(groupId);
      if (response.status === 200) {
        const allTasks = response.data;
        const allTasksSorted = allTasks.sort((a, b) => a.index - b.index);
        setContainers(allTasksSorted);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateManyTasks = async (groupId, updatedTasks) => {
    try {
      const response = await updateManyTasksRequest(groupId, updatedTasks);
      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTitleContainer = async (containerId, updatedContainer) => {
    try {
      const response = await updateTitleTaskRequest(
        containerId,
        updatedContainer
      );
      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // crear estados y funciones relacionadas con las tareas

  return (
    <TaskContext.Provider
      value={{
        allTasks,
        setAllTasks,
        myOwnTasks,
        setMyOwnTasks,
        myAssignedTasks,
        setMyAssignedTasks,
        createNewTask,
        deleteTask,
        updateTask,
        getAllTasks,
        containers,
        setContainers,
        updateManyTasks,
        updateTitleContainer,
        // <-- van todas las funciones de las tasks para exportarlas
      }}>
      {children}
    </TaskContext.Provider>
  );
}
