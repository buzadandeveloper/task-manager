import React, { useState } from "react";
import "./TaskView.css";
import CloseButton from "../CloseButton/CloseButton";
import Badge from "../Badget/Badge";
import DueDate from "../DateContainer/DueDate";

const TaskView = ({
  openTaskInfo,
  closeModal,
  selectedTask,
  updateTaskStatus,
  handleDeleteTask,
}) => {
  const { id, status, name, taskDetails, dueDate } = selectedTask;

  const [editFormData, setEditFormData] = useState({
    editableTaskName: name,
    editableTaskDetails: taskDetails,
    editableTaskDueDate: dueDate,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveChanges = () => {
    const updateTask = {
      ...selectedTask,
      name: editFormData.editableTaskName,
      taskDetails: editFormData.editableTaskDetails,
      dueDate: editFormData.editableTaskDueDate,
    };
    updateTaskStatus(id, status, updateTask);
    setIsEditing(false);
  };

  const handleOnDoubleClick = () => {
    setIsEditing(true);
  };

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
              {isEditing ? (
                <input
                  type="text"
                  value={editFormData.editableTaskName}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      editableTaskName: e.target.value,
                    })
                  }
                />
              ) : (
                <h4 onDoubleClick={handleOnDoubleClick}>{name}</h4>
              )}
            </div>
            <div className="task-details">
              <h2>Task Details:</h2>
              {isEditing ? (
                <textarea
                  value={editFormData.editableTaskDetails}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      editableTaskDetails: e.target.value,
                    })
                  }
                />
              ) : (
                <p onDoubleClick={handleOnDoubleClick}>{taskDetails}</p>
              )}
            </div>
          </div>
          <div className="task-footer">
            <button
              className="delete-task"
              onClick={() => handleDeleteTask(id)}
            >
              Delete
            </button>
            {isEditing ? (
              <div className="edited-due-date">
                <h2>Due Date:</h2>
                <input
                  type="date"
                  value={
                    editFormData.editableTaskDueDate.toISOString().split("T")[0]
                  }
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      editableTaskDueDate: new Date(e.target.value),
                    })
                  }
                />
              </div>
            ) : (
              <DueDate dueDate={dueDate}/>
            )}
            {isEditing && (
              <button className="save-btn" onClick={handleSaveChanges}>Save</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskView;
