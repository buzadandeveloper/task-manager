import React from "react";
import "./TaskViewFooter.css";
import DueDate from "../DateContainer/DueDate";

const TaskViewFooter = ({
  isEditing,
  handleSaveChanges,
  handleDeleteTask,
  id,
  editFormData,
  setEditFormData,
  dueDate
}) => {
  return (
    <div className="task-footer">
      {isEditing ? (
        <button className="save-btn" onClick={handleSaveChanges}>
          Save
        </button>
      ) : (
        <button className="delete-task" onClick={() => handleDeleteTask(id)}>
          Delete
        </button>
      )}
      {isEditing ? (
        <div className="edited-due-date">
          <h2>Due Date</h2>
          <input
            type="date"
            value={editFormData.editableTaskDueDate.toISOString().split("T")[0]}
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
  );
};

export default TaskViewFooter;
