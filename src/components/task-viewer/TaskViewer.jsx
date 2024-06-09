import React from "react";
import "./TaskViewer.css";
import TaskCard from "../task-card/TaskCard";
import ControlPanel from "../control-panel/ControlPanel";

function TaskViewer({ taskList, openModal, openTaskInfo }) {
  return (
    <div className="task-view-container">
      <div className="task-list-container">
        <ControlPanel openModal={openModal}/>
        <div className="task-list-grid">
          {taskList.map((task) => (
            <TaskCard key={task.id} {...task} openTaskInfo={openTaskInfo}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskViewer;
