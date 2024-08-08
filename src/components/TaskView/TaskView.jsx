import React, { useState } from "react";
import "./TaskView.css";
import TaskViewInfoHeader from "../TaskViewInfoHeader/TaskViewInfoHeader";
import TaskViewHeader from "../TaskViewHeader/TaskViewHeader";
import TaskViewName from "../TaskViewName/TaskViewName";
import TaskViewDetails from "../TaskViewDetails/TaskViewDetails";
import TaskViewFooter from "../TaskViewFooter/TaskViewFooter";

function TaskView({
  openTaskInfo,
  closeModal,
  selectedTask,
  updateTaskStatus,
  handleDeleteTask
}) {
  const { id, status, name, taskDetails, dueDate } = selectedTask;

  const [editFormData, setEditFormData] = useState({
    editableTaskName: name,
    editableTaskDetails: taskDetails,
    editableTaskDueDate: new Date(dueDate)
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSaveChanges = () => {
    const newErrors = validateEditForm();
    if (Object.keys(newErrors).length === 0) {
      const updateTask = {
        ...selectedTask,
        name: editFormData.editableTaskName,
        taskDetails: editFormData.editableTaskDetails,
        dueDate: editFormData.editableTaskDueDate
      };
      updateTaskStatus(id, status, updateTask);
      setIsEditing(false);
      setErrors(prevState => ({
        ...prevState,
        editableTaskName: ""
      }));
    } else {
      setErrors(newErrors);
    }
  };

  const handleOnDoubleClick = () => {
    setIsEditing(true);
  };

  const handleOnTouchStart = () => {
    setIsEditing(true);
  };

  const validateEditForm = () => {
    const newErrors = {};
    !editFormData.editableTaskName &&
      (newErrors.editableTaskName = "Task Name is required.");
    console.log("Eroarea:", newErrors);
    return newErrors;
  };

  return (
    <div className="task-info-wrapper">
      <TaskViewInfoHeader closeModal={closeModal} />
      <div className="task-info-content">
        <TaskViewHeader
          id={id}
          status={status}
          openTaskInfo={openTaskInfo}
          updateTaskStatus={updateTaskStatus}
        />
        <div className="task-content">
          <TaskViewName
            isEditing={isEditing}
            editFormData={editFormData}
            setEditFormData={setEditFormData}
            handleOnDoubleClick={handleOnDoubleClick}
            handleOnTouchStart={handleOnTouchStart}
            name={name}
            errors={errors}
          />
          <TaskViewDetails
            isEditing={isEditing}
            editFormData={editFormData}
            setEditFormData={setEditFormData}
            handleOnDoubleClick={handleOnDoubleClick}
            handleOnTouchStart={handleOnTouchStart}
            taskDetails={taskDetails}
          />
        </div>
        <TaskViewFooter
          isEditing={isEditing}
          handleSaveChanges={handleSaveChanges}
          handleDeleteTask={handleDeleteTask}
          id={id}
          editFormData={editFormData}
          setEditFormData={setEditFormData}
          dueDate={dueDate}
        />
      </div>
    </div>
  );
}

export default TaskView;
