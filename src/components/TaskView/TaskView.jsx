import React, { useState } from "react";
import "./TaskView.css";
import CloseButton from "../CloseButton/CloseButton";
import Badge from "../Badget/Badge";
import DueDate from "../DateContainer/DueDate";

function TaskView({
  openTaskInfo,
  closeModal,
  selectedTask,
  updateTaskStatus,
  handleDeleteTask
}) {
  const { id, status, name, taskDetails, dueDate } = selectedTask;

  const [editFormData, setEditFormData] = useState({
    editableTaskName: name,
    editableTaskDetails: taskDetails,
    editableTaskDueDate: new Date(dueDate)
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSaveChanges = () => {
    const newErrors = validateEditForm();
    if (Object.keys(newErrors).length === 0) {
      const updateTask = {
        ...selectedTask,
        name: editFormData.editableTaskName,
        taskDetails: editFormData.editableTaskDetails,
        dueDate: editFormData.editableTaskDueDate
      };
      updateTaskStatus(id, status, updateTask);
      setIsEditing(false);
      setErrors(prevState => ({
        ...prevState,
        editableTaskName: ""
      }));
    } else {
      setErrors(newErrors);
    }
  };

  const handleOnDoubleClick = () => {
    setIsEditing(true);
  };

  const handleOnTouchStart = () => {
    setIsEditing(true);
  };

  const validateEditForm = () => {
    const newErrors = {};
    !editFormData.editableTaskName &&
      (newErrors.editableTaskName = "Task Name is required.");
    console.log("Eroarea:", newErrors);
    return newErrors;
  };

  return (
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
                maxLength={42}
                onChange={e =>
                  setEditFormData({
                    ...editFormData,
                    editableTaskName: e.target.value
                  })
                }
              />
            ) : (
              <h4
                onDoubleClick={handleOnDoubleClick}
                onTouchStart={handleOnTouchStart}
              >
                {name}
              </h4>
            )}
          </div>
          {errors.editableTaskName && (
            <span className="edit-name-error">{errors.editableTaskName}</span>
          )}
          <div className="task-details">
            <h2>Task Details:</h2>
            {isEditing ? (
              <textarea
                value={editFormData.editableTaskDetails}
                cols={10}
                rows={5}
                onChange={e =>
                  setEditFormData({
                    ...editFormData,
                    editableTaskDetails: e.target.value
                  })
                }
              />
            ) : (
              <p
                onDoubleClick={handleOnDoubleClick}
                onTouchStart={handleOnTouchStart}
              >
                {taskDetails}
              </p>
            )}
          </div>
        </div>
        <div className="task-footer">
          {isEditing ? (
            <button className="save-btn" onClick={handleSaveChanges}>
              Save
            </button>
          ) : (
            <button
              className="delete-task"
              onClick={() => handleDeleteTask(id)}
            >
              Delete
            </button>
          )}

          {isEditing ? (
            <div className="edited-due-date">
              <h2>Due Date</h2>
              <input
                type="date"
                value={
                  editFormData.editableTaskDueDate.toISOString().split("T")[0]
                }
                onChange={e =>
                  setEditFormData({
                    ...editFormData,
                    editableTaskDueDate: new Date(e.target.value)
                  })
                }
              />
            </div>
          ) : (
            <DueDate dueDate={dueDate} />
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskView;
