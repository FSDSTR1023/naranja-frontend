/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';
import { getAllTasksRequest } from '../api/task';

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

  const getAllTasks = async () => {
    try {
      const response = await getAllTasksRequest();
      setAllTasks(response.data);
    } catch (error) {
      console.log(error, '<-- error en getAllTasks');
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
        getAllTasks,
        // <-- van todas las funciones de las tasks para exportarlas
      }}>
      {children}
    </TaskContext.Provider>
  );
}
