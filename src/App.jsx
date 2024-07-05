import React from "react";
import "./App.css";
import TaskViewer from "./components/TaskViewer/TaskViewer";
import { TaskProvider } from "./components/Context/TaskContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Auth from "./components/Auth/Auth";

export default function App() {
  return (
    <TaskProvider>
      <Router>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/tasks" element={<TaskViewer />} />
            </Routes>
      </Router>
    </TaskProvider>
  );
}
