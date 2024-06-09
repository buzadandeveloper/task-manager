import React from "react";
import "../control-panel/ControlPanel.css"
const ControlPanel = ({openModal}) => {
    return(
        <div className="control-panel-container">
          <h3>Task Manager</h3>
          <button onClick={openModal}  className="create-task-btn">
            Create Task
          </button>
        </div>
    );
}
export default ControlPanel;