import React from "react";
import "./TaskViewInfoHeader.css";
import CloseButton from "../CloseButton/CloseButton";

const TaskViewInfoHeader = ({ closeModal }) => {
  return (
    <div className="task-info-header">
      <h3>Task Information</h3>
      <CloseButton closeModal={closeModal} />
    </div>
  );
};

export default TaskViewInfoHeader;
