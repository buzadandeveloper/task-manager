import React from "react";
import "./CreateTaskButton.css";

function CreateButton({ openModal }) {
  return (
    <button onClick={openModal} className="create-task-btn">
      Create Task
    </button>
  );
}
export default CreateButton;
