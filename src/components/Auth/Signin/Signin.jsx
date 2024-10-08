import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import loadingSpinner from "../../Utils/loadingSpinner";
import "./Signin.css";
import { checkAuthDataLocalStorage } from "../../Utils/authUtils";

function Signin({ handleChangeAuth }) {
  const [authData, setAuthData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const validateSignIn = () => {
    const newErrors = {};
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!authData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(authData.email)) {
      newErrors.email = "Invalid email format.";
    }

    !authData.password && (newErrors.password = "Password is required.");

    return newErrors;
  };

  const hadnleAuthData = e => {
    setAuthData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
    setErrors(prevState => ({
      ...prevState,
      [e.target.name]: "",
      general: ""
    }));
  };

  const handleSignIn = async e => {
    e.preventDefault();
    const newErrors = validateSignIn();
    if (Object.keys(newErrors).length === 0) {
      const { success, user, message } = checkAuthDataLocalStorage(authData);
      if (success) {
        login(user.name, user.email, user.password, user.image);
        await loadingSpinner(setIsLoading, navigate);
      } else {
        setErrors({ general: message });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="sign-in-container">
      <form action="" className="sign-in-content">
        <h2>Sign In</h2>
        <div className="inputs">
          <input
            value={authData.email}
            onChange={hadnleAuthData}
            type="email"
            name="email"
            className={errors.email && "error-input"}
            placeholder="Email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <input
            value={authData.password}
            onChange={hadnleAuthData}
            type="password"
            name="password"
            className={errors.password && "error-input"}
            placeholder="Password"
          />
          {errors.password && <span className="error">{errors.password}</span>}
          {errors.general && <span className="error">{errors.general}</span>}
        </div>
        {isLoading ? (
          <div className="spinner" />
        ) : (
          <button type="submit" className="sign-in-btn" onClick={handleSignIn}>
            Sign In
          </button>
        )}
        <span className="alt-sign" onClick={handleChangeAuth}>
          Don't have an account? Sign up
        </span>
      </form>
    </div>
  );
}

export default Signin;
