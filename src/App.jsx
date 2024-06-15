import React, { useState } from "react";
import "./App.css";
import TaskViewer from "./components/task-viewer/TaskViewer";
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

export default function App() {
  const [taskList, setTaskList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskViewOpen, setIsTaskViewOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

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
  }
  
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
  

  return (
    <>
      <div className="app-container">
        <div className="app-content">
          <TaskViewer
           taskList={taskList}
           openModal={openModal}
           openTaskInfo={openTaskInfo}
           isModalOpen={isModalOpen}
           addNewTask={addNewTask}
           closeModal={closeModal}
           isTaskViewOpen={isTaskViewOpen}
           closeTaskInfo={closeTaskInfo}
           updateTaskStatus={updateTaskStatus}
           selectedTask={selectedTask}
           handleDeleteTask={handleDeleteTask}
          />
        </div>
      </div>
    </>
  );
}
