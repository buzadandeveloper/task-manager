import React from "react";
import "./TaskCard.css";
import Badge from "../BadgetTask/BadgetTask";
import DueDate from "../DueDate/DueDate";

export default function TaskCard({
  id,
  status,
  name,
  taskDetails,
  dueDate,
  openTaskInfo
}) {
  const handleOpenTaskInfo = () => {
    openTaskInfo({ id, status, name, taskDetails, dueDate });
  };

  return (
    <div className="card-wrapper">
      <div className="card-header">
        <p className="task-id">{id}</p>
        <Badge status={status} />
      </div>
      <div className="card-content">
        <p>{name}</p>
      </div>
      <div className="card-footer">
        <button className="open-task-btn" onClick={handleOpenTaskInfo}>
          Open Task
        </button>
        <DueDate dueDate={dueDate} />
      </div>
    </div>
  );
}
