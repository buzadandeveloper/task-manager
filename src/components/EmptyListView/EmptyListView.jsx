import React from "react";
import "./EmptyListView.css";
import CreateButton from "../CreateTaskButton/CreateButton";
import TaskIcon from "../../assets/task-icon/task-icon.png";

const EmptyListView = ({openModal}) => {
  return (
    <>
      <div className="empty-list-container">
      <img src={TaskIcon} alt="task-icon" />
        <div className="empty-list-message">
          <h5>No Tasks</h5>
          <p>Be productive. Create Tasks.</p>
          <CreateButton openModal={openModal}/>
        </div>
      </div>
    </>
  );
};
export default EmptyListView;
