import React, { useState } from "react";
import "./CreateTaskForm.css";
import CloseButton from "../CloseButton/CloseButton";

const CreateTaskForm = ({ addNewTask, closeModal }) => {
  const [formData, setFormData] = useState({
    taskName: "",
    taskDate: "",
    taskDetails: "",
  });

  const [errors, setErrors] = useState({});
  const handleInputData = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    setErrors((prevState) => ({
      ...prevState,
      [e.target.name]: "",
    }));
  };

  const resetForm = () => {
    setFormData({
      taskName: "",
      taskDate: "",
      taskDetails: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};
    !formData.taskName && (newErrors.taskName = "Task Name is required.");
    !formData.taskDate && (newErrors.taskDate = "Task Date is required.");

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      const newTask = {
        name: formData.taskName,
        dueDate: formData.taskDate,
        taskDetails: formData.taskDetails,
        status: "To Do",
      };
      addNewTask(newTask);
      resetForm();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="task-form-container">
      <div className="create-task-card">
        <h3>Create Task</h3>
        <CloseButton closeModal={closeModal} />
      </div>
      <form>
        <div className="task-name">
          <label className="label-md">Task Name</label>
          <input
            value={formData.taskName}
            name="taskName"
            onChange={handleInputData}
            className="input-primary"
            type="text"
          />
          {errors.taskName && <span className="error">{errors.taskName}</span>}
        </div>
        <div className="task-date">
          <label className="label-md">Due Date</label>
          <input
            value={formData.taskDate}
            name="taskDate"
            onChange={handleInputData}
            className="input-primary"
            type="date"
          />
          {errors.taskDate && <span className="error">{errors.taskDate}</span>}
        </div>
        <div className="task-details">
          <label className="label-md">Task Details</label>
          <textarea
            value={formData.taskDetails}
            name="taskDetails"
            onChange={handleInputData}
            className="input-primary"
            cols={30}
            rows={10}
          ></textarea>
        </div>
        <button onClick={handleSubmit} className="button-primary" type="submit">
          Create Task
        </button>
      </form>
    </div>
  );
};
export default CreateTaskForm;
