import React, { createContext, useState } from "react";

const TaskContext = createContext();
const data = [
  {
    id: "T-1",
    status: "Completed",
    name: "Create a Design System for Enum Workspace.",
    taskDetails: "iasfioasnf saolfnasof  aosfaosf",
    dueDate: new Date(2024, 4, 13),
  },
  {
    id: "T-2",
    status: "In Progress",
    name: "Create a Design System for Enum Workspace.",
    taskDetails: "iasfioasnf saolfnasof  aosfaosf",
    dueDate: new Date(2024, 4, 13),
  },
  {
    id: "T-3",
    status: "To Do",
    name: "Create a Design System for Enum Workspace.",
    taskDetails: "iasfioasnf saolfnasof  aosfaosf",
    dueDate: new Date(2024, 4, 14),
  },
];

const TaskProvider = ({ children }) => {
  const [taskList, setTaskList] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskViewOpen, setIsTaskViewOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState("All Tasks");

  const addNewTask = (newTask) => {
    setTaskList((prevState) => [
      ...prevState,
      {
        ...newTask,
        dueDate: new Date(newTask.dueDate),
        id: `T-${prevState.length + 1}`,
      },
    ]);
    setIsModalOpen(false);
  };

  const updateTaskStatus = (id, newStatus) => {
    setTaskList((prevTaskList) =>
      prevTaskList.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
    setSelectedTask((prevTask) => ({
      ...prevTask,
      status: newStatus,
    }));
  };

  const handleDeleteTask = (id) => {
    const newTaskList = taskList.filter((li) => li.id !== id);
    setTaskList(newTaskList);
    setIsTaskViewOpen(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openTaskInfo = (task) => {
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
      : taskList.filter((task) => task.status === filter);

  const totalTasks = taskList.length;

  const filteredLength = (filter) => {
    switch (filter) {
      case "To Do":
        return taskList.filter((task) => task.status === "To Do").length;
      case "In Progress":
        return taskList.filter((task) => task.status === "In Progress").length;
      case "Completed":
        return taskList.filter((task) => task.status === "Completed").length;
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
        filter,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskProvider, TaskContext };
