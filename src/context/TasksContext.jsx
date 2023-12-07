/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext } from 'react';

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks debe estar dentro del proveedor TaskProvider');
  }
  return context;
};

export function TaskProvider({ children }) {
  return (
    <TaskContext.Provider
      value={
        {
          // <-- van todas las funciones de las tasks para exportarlas
        }
      }>
      {children}
    </TaskContext.Provider>
  );
}
