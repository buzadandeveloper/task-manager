import React, { createContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const TaskContext = createContext();
const initialTasks = [
  {
    id: "T-1",
    status: "Completed",
    name: "Create a Design System for Enum Workspace.",
    taskDetails: "iasfioasnf saolfnasof  aosfaosf",
    dueDate: new Date(2024, 4, 13)
  },
  {
    id: "T-2",
    status: "In Progress",
    name: "Create a Design System for Enum Workspace.",
    taskDetails: "iasfioasnf saolfnasof  aosfaosf",
    dueDate: new Date(2024, 4, 13)
  },
  {
    id: "T-3",
    status: "To Do",
    name: "Create a Design System for Enum Workspace.",
    taskDetails: "iasfioasnf saolfnasof  aosfaosf",
    dueDate: new Date(2024, 4, 14)
  }
];

function TaskProvider({ children }) {
  const [taskList, setTaskList] = useState(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskViewOpen, setIsTaskViewOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState("All Tasks");
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      const savedTasks = JSON.parse(
        localStorage.getItem(`tasks_${user.email}`)
      );
      savedTasks ? setTaskList(savedTasks) : setTaskList(initialTasks);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem(`tasks_${user.email}`, JSON.stringify(taskList));
    }
  }, [taskList, isAuthenticated]);

  const addNewTask = newTask => {
    setTaskList(prevState => [
      ...prevState,
      {
        ...newTask,
        dueDate: new Date(newTask.dueDate),
        id: `T-${prevState.length + 1}`
      }
    ]);
    setIsModalOpen(false);
  };

  const updateTaskStatus = (id, newStatus, updateTask = null) => {
    setTaskList(prevTaskList =>
      prevTaskList.map(task =>
        task.id === id
          ? { ...task, status: newStatus, ...(updateTask || {}) }
          : task
      )
    );
    setSelectedTask(prevTask => ({
      ...prevTask,
      status: newStatus,
      ...(updateTask || {})
    }));
  };

  const handleDeleteTask = id => {
    const newTaskList = taskList.filter(li => li.id !== id);
    setTaskList(newTaskList);
    setIsTaskViewOpen(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openTaskInfo = task => {
    setSelectedTask(task);
    setIsTaskViewOpen(true);
  };
  const closeTaskInfo = () => {
    setIsTaskViewOpen(false);
    setIsTaskViewOpen(null);
  };
  const filteredTasks =
    filter === "All Tasks"
      ? taskList
      : taskList.filter(task => task.status === filter);

  const totalTasks = taskList.length;

  const filteredLength = filter => {
    switch (filter) {
      case "To Do":
        return taskList.filter(task => task.status === "To Do").length;
      case "In Progress":
        return taskList.filter(task => task.status === "In Progress").length;
      case "Completed":
        return taskList.filter(task => task.status === "Completed").length;
      case "All Tasks":
      default:
        return totalTasks;
    }
  };

  return (
    <TaskContext.Provider
      value={{
        taskList,
        openModal,
        openTaskInfo,
        isModalOpen,
        addNewTask,
        closeModal,
        isTaskViewOpen,
        closeTaskInfo,
        updateTaskStatus,
        selectedTask,
        handleDeleteTask,
        filteredTasks,
        setFilter,
        filteredLength,
        filter
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export { TaskProvider, TaskContext };
