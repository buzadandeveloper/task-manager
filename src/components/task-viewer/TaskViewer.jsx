import React from "react";
import "./TaskViewer.css";
import TaskCard from "../task-card/TaskCard";
import ControlPanel from "../control-panel/ControlPanel";
import CreateTaskForm from "../form/CreateTaskForm";
import Modal from "../modal/Modal";
import TaskView from "../task-view/TaskView";

function TaskViewer({
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
}) {
  return (
    <div className="task-view-container">
      <div className="task-list-container">
        <ControlPanel openModal={openModal} />
        <div className="task-list-grid">
          {taskList.map((task) => (
            <TaskCard key={task.id} {...task} openTaskInfo={openTaskInfo} />
          ))}
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
              />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskViewer;
