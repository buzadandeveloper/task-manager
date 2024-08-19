import React from "react";
import "./EmptyListView.css";
import CreateButton from "../CreateTaskButton/CreateTaskButton";
import TaskIcon from "../../assets/task-icon/task-icon.png";

function EmptyListView({ openModal, filter }) {
  let message;
  let showDefaultMessage = false;
  switch (filter) {
    case "To Do":
      return (message = "No Tasks To Do");
    case "In Progress":
      return (message = "No Tasks In Progress");
    case "Completed":
      return (message = "No Tasks Completed");
    default:
      message = "No Tasks";
      showDefaultMessage = true;
  }
  return (
    <div className="empty-list-container">
      <img src={TaskIcon} alt="task-icon" />
      <div className="empty-list-message">
        <h5>{message}</h5>
        {showDefaultMessage && (
          <>
            <p>Be productive. Create Tasks.</p>
            <CreateButton openModal={openModal} />
          </>
        )}
      </div>
    </div>
  );
}
export default EmptyListView;
