import React, { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    setIsAuthenticated(!!loggedInUser);
  }, []);

  const login = (email) => {
    localStorage.setItem("loggedInUser", email);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
