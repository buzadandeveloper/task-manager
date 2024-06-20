import React from "react";
import "./DueDate.css";
function DueDate({ dueDate }) {
  return (
    <div className="due-date">
      <p>Due Date</p>
      <p>{dueDate.toLocaleDateString()}</p>
    </div>
  );
}
export default DueDate;
