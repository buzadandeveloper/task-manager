import React from "react";
import "./TaskViewDetails.css";

const TaskViewDetails = ({
  isEditing,
  editFormData,
  setEditFormData,
  handleOnDoubleClick,
  handleOnTouchStart,
  taskDetails
}) => {
  return (
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
          className="pointer-details"
          onDoubleClick={handleOnDoubleClick}
          onTouchStart={handleOnTouchStart}
        >
          {taskDetails}
        </p>
      )}
    </div>
  );
};

export default TaskViewDetails;
