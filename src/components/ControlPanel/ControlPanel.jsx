import React, { useContext } from "react";
import "./ControlPanel.css";
import CreateButton from "../CreateTaskButton/CreateTaskButton";
import FilterStatus from "../FilterStatus/FilterStatus";
import { TaskContext } from "../Context/TaskContext";
import { useAuth } from "../Context/AuthContext";

function ControlPanel() {
  const { openModal, taskList, setFilter, filteredLength } =
    useContext(TaskContext);
  const { user, toggleProfile } = useAuth();
  return (
    <div className="control-panel-wrapper">
      <div className="control-panel-container">
        <div className="cp-up">
          <h3>Task Manager</h3>
          <div className="buttons-pr-cr">
            <img
              className="profile-btn-img"
              src={user.image}
              alt="profile-image"
              onClick={toggleProfile}
            />
            {taskList.length > 0 && <CreateButton openModal={openModal} />}
          </div>
        </div>
        <FilterStatus setFilter={setFilter} filteredLength={filteredLength} />
      </div>
    </div>
  );
}
export default ControlPanel;
