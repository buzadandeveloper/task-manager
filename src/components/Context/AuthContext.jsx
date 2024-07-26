import React, { useState, createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    try {
      const parsedUser = JSON.parse(storedUser);
      return parsedUser
        ? { ...parsedUser, isAuthenticated: true }
        : { isAuthenticated: false, name: "", email: "", password: "" };
    } catch (error) {
      return { isAuthenticated: false, name: "", email: "", password: "" };
    }
  });

  const login = (name, email, password) => {
    const userData = { name, email, password, isAuthenticated: true };
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setUser({ isAuthenticated: false, name: "", email: "", password: "" });
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: user.isAuthenticated, login, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
