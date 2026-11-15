/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";
import { getTasks, addTask as apiAddTask, updateTask as apiUpdateTask, deleteTask as apiDeleteTask } from "../services/api";
import { useAuth } from "./AuthContext";

export const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTasks = async () => {
    if (!user?.token) return;
    try {
      setIsLoading(true);
      const data = await getTasks(user.token);
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async (taskData) => {
    const updatedTasks = await apiAddTask(user.token, taskData);
    setTasks(updatedTasks);
  };

  const updateTask = async (id, taskData) => {
    const updatedTasks = await apiUpdateTask(user.token, id, taskData);
    setTasks(updatedTasks);
  };

  const deleteTask = async (id) => {
    const updatedTasks = await apiDeleteTask(user.token, id);
    setTasks(updatedTasks);
  };

  return (
    <TaskContext.Provider value={{ tasks, isLoading, error, loadTasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks должен использоваться внутри TaskProvider");
  }
  return context;
}