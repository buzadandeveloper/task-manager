import React from "react";
import "./TaskView.css";
import CloseButton from "../close-button/CloseButton";
import Badge from "../badget/Badge";
import DueDate from "../date-container/DueDate";

const TaskView = ({
  openTaskInfo,
  closeModal,
  selectedTask,
  updateTaskStatus,
  handleDeleteTask,
}) => {
  const { id, status, name, taskDetails, dueDate } = selectedTask;

  return (
    <>
      <div className="task-info-wrapper">
        <div className="task-info-header">
          <h3>Task Information</h3>
          <CloseButton closeModal={closeModal} />
        </div>
        <div className="task-info-content">
          <div className="task-header">
            <p className="task-id">{id}</p>
            <Badge
              status={status}
              taskId={id}
              openTaskInfo={openTaskInfo}
              updateTaskStatus={updateTaskStatus}
            />
          </div>
          <div className="task-content">
            <div className="task-name">
              <h2>Task Name:</h2>
              <h4>{name}</h4>
            </div>
            <div className="task-details">
              <h2>Task Details:</h2>
              <p>{taskDetails}</p>
            </div>
          </div>
          <div className="task-footer">
            <button
              className="delete-task"
              onClick={() => handleDeleteTask(id)}
            >
              Delete
            </button>
            <DueDate dueDate={dueDate} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskView;
