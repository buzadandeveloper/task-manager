import React from "react";
import "./App.css";
import TaskViewer from "./components/TaskViewer/TaskViewer";
import { TaskProvider } from "./components/Context/TaskContext";

export default function App() {
  return (
    <TaskProvider>
      <div className="app-container">
        <div className="app-content">
          <TaskViewer />
        </div>
      </div>
    </TaskProvider>
  );
}
