import React, { useContext } from "react";
import "./TaskViewer.css";
import TaskCard from "../TaskCard/TaskCard";
import ControlPanel from "../ControlPanel/ControlPanel";
import CreateTaskForm from "../CreateTaskForm/CreateTaskForm";
import TaskModal from "../TaskModal/TaskModal";
import TaskView from "../TaskView/TaskView";
import EmptyListView from "../EmptyListView/EmptyListView";
import UserProfile from "../UserProfile/UserProfile";
import { TaskContext } from "../Context/TaskContext";
import { useAuth } from "../Context/AuthContext";

function TaskViewer() {
  const {
    taskList,
    openModal,
    openTaskInfo,
    isModalOpen,
    addNewTask,
    closeModal,
    isTaskViewOpen,
    closeTaskInfo,
    updateTaskStatus,
    selectedTask,
    handleDeleteTask,
    filteredTasks,
    filter
  } = useContext(TaskContext);

  const { isProfileVisible } = useAuth();
  return (
    <div className="main-content">
      <div className="main-task-container ">
        <UserProfile isProfileVisible={isProfileVisible} />
        <div className="task-content">
          <div className="task-view-container">
            <div className="task-list-container">
              <ControlPanel openModal={openModal} taskList={taskList} />
              <div className="task-list-grid">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      {...task}
                      openTaskInfo={openTaskInfo}
                    />
                  ))
                ) : (
                  <div className="empty-list-container">
                    <EmptyListView openModal={openModal} filter={filter} />
                  </div>
                )}
                {isModalOpen && (
                  <TaskModal isModalOpen={isModalOpen}>
                    <CreateTaskForm
                      addNewTask={addNewTask}
                      closeModal={closeModal}
                    />
                  </TaskModal>
                )}
                {isTaskViewOpen && (
                  <TaskModal isModalOpen={isTaskViewOpen}>
                    <TaskView
                      closeModal={closeTaskInfo}
                      selectedTask={selectedTask}
                      openTaskInfo={openTaskInfo}
                      updateTaskStatus={updateTaskStatus}
                      handleDeleteTask={handleDeleteTask}
                    />
                  </TaskModal>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskViewer;
