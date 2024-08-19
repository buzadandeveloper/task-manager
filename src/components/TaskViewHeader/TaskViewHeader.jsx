import React from "react";
import "./TaskViewHeader.css";
import Badge from "../Badget/Badget";

const TaskViewHeader = ({ id, status, openTaskInfo, updateTaskStatus }) => {
  return (
    <div className="task-header">
      <p className="task-id">{id}</p>
      <Badge
        status={status}
        taskId={id}
        openTaskInfo={openTaskInfo}
        updateTaskStatus={updateTaskStatus}
      />
    </div>
  );
};

export default TaskViewHeader;
