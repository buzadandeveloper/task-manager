import React, { useContext } from "react";
import "./TaskViewer.css";
import TaskCard from "../TaskCard/TaskCard";
import ControlPanel from "../ControlPanel/ControlPanel";
import CreateTaskForm from "../Form/CreateTaskForm";
import Modal from "../Modal/Modal";
import TaskView from "../TaskView/TaskView";
import EmptyListView from "../EmptyListView/EmptyListView";
import { TaskContext } from "../Context/TaskContext";

const TaskViewer = () => {
  const {
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
  } = useContext(TaskContext);
  return (
    <div className="task-view-container">
      <div className="task-list-container">
        <ControlPanel openModal={openModal} taskList={taskList} />
        <div className={"task-list-grid"}>
          {taskList.length > 0 ? (
            taskList.map((task) => (
              <TaskCard key={task.id} {...task} openTaskInfo={openTaskInfo} />
            ))
          ) : (
            <div className="empty-list-container">
              <EmptyListView openModal={openModal} />
            </div>
          )}
          {isModalOpen && (
            <Modal isModalOpen={isModalOpen}>
              <CreateTaskForm addNewTask={addNewTask} closeModal={closeModal} />
            </Modal>
          )}
          {isTaskViewOpen && (
            <Modal isModalOpen={isTaskViewOpen}>
              <TaskView
                closeModal={closeTaskInfo}
                selectedTask={selectedTask}
                openTaskInfo={openTaskInfo}
                updateTaskStatus={updateTaskStatus}
                handleDeleteTask={handleDeleteTask}
              />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskViewer;
