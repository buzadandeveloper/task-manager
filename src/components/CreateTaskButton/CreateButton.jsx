import React from "react";
import "./CreateButton.css";

function CreateButton({ openModal }) {
  return (
    <button onClick={openModal} className="create-task-btn">
      Create Task
    </button>
  );
}
export default CreateButton;
