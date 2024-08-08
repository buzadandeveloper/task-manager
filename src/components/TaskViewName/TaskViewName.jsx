import React from "react";
import "./TaskViewName.css";

const TaskViewName = ({
  isEditing,
  editFormData,
  setEditFormData,
  handleOnDoubleClick,
  handleOnTouchStart,
  name,
  errors
}) => {
  return (
    <>
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
          <p
            className="pointer-name"
            onDoubleClick={handleOnDoubleClick}
            onTouchStart={handleOnTouchStart}
          >
            {name}
          </p>
        )}
      </div>
      {errors.editableTaskName && (
        <span className="edit-name-error">{errors.editableTaskName}</span>
      )}
    </>
  );
};

export default TaskViewName;
