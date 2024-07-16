import React, { useContext } from "react";
import "./ControlPanel.css";
import CreateButton from "../CreateTaskButton/CreateButton";
import FilterStatus from "../FilterStatus/FilterStatus";
import { TaskContext } from "../Context/TaskContext";
const ControlPanel = () => {
  const { openModal, taskList, setFilter, filteredLength } =
    useContext(TaskContext);

  return (
    <div className="control-panel-wrapper">
      <div className="control-panel-container">
        <div className="cp-up">
          <h3>Task Manager</h3>
          {taskList.length > 0 && <CreateButton openModal={openModal} />}
        </div>
        <FilterStatus setFilter={setFilter} filteredLength={filteredLength} />
      </div>
    </div>
  );
};
export default ControlPanel;
