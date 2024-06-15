import React from "react";
import "../control-panel/ControlPanel.css"
import CreateButton from "../create-task-button/CreateButton";
const ControlPanel = ({openModal, taskList}) => {
    return(
        <div className="control-panel-container">
          <h3>Task Manager</h3>
         {taskList.length > 0 && (<CreateButton openModal={openModal}/>)}
        </div>
    );
}
export default ControlPanel;