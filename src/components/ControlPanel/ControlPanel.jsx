import React from "react";
import "./ControlPanel.css";
import CreateButton from "../CreateTaskButton/CreateButton";
import FilterStatus from "../FilterStatus/FilterStatus";
const ControlPanel = ({ openModal, taskList }) => {
  return (
    <div className="control-panel-wrapper">
      <div className="control-panel-container">
        <div className="cp-up">
          <h3>Task Manager</h3>
          {taskList.length > 0 && <CreateButton openModal={openModal} />}
        </div>
        <FilterStatus/>
      </div>
    </div>
  );
};
export default ControlPanel;
