import React from "react";
import "./ControlPanel.css";
import CreateButton from "../CreateTaskButton/CreateButton";
const ControlPanel = ({ openModal, taskList }) => {
  return (
    <div className="control-panel-container">
      <h3>Task Manager</h3>
      {taskList.length > 0 && <CreateButton openModal={openModal} />}
    </div>
  );
};
export default ControlPanel;
