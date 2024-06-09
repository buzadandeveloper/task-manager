import React, { useState } from "react";
import "./Badge.css";
function Badge({ status, taskId, openTaskInfo, updateTaskStatus }) {
  const [showDropDown, setShowDropDown] = useState(false);
  const statusTask = ["To Do", "In Progress", "Completed"];

  const toggleDropDown = () => openTaskInfo && setShowDropDown(!showDropDown);
  const handleStatusChange = (newStatus) => {
    updateTaskStatus(taskId, newStatus);
    setShowDropDown(false);
  };

  return (
    <div className="badge-container">
      <div
        className={`badge ${openTaskInfo && "badge-pointer"}`}
        onClick={toggleDropDown}
      >
        <p>{status}</p>
      </div>
        <div className={`dropdown-menu ${showDropDown && "show"}`}>
          {statusTask.map((statusOption) => (
            <div
              className="dropdown-item"
              key={statusOption}
              onClick={() => handleStatusChange(statusOption)}
            >
              {statusOption}
            </div>
          ))}
        </div>
    </div>
  );
}
export default Badge;
