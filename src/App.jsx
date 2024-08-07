import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import TaskViewer from "./components/TaskViewer/TaskViewer";
import { TaskProvider } from "./components/Context/TaskContext";
import Auth from "./components/Auth/Auth";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { AuthProvider } from "./components/Context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/taskviewer"
              element={
                <ProtectedRoute>
                  <TaskViewer />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/auth" />} />
          </Routes>
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
}
