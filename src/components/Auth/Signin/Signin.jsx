import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";

const Signin = ({ handleChangeAuth }) => {
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
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

  const hadnleAuthData = (e) => {
    setAuthData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [e.target.name]: "",
    }));
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    let newErrors = validateSignIn();
    if (Object.keys(newErrors).length === 0) {
      console.log(authData);
      navigate("/taskviewer");
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
            placeholder="Email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <input
            value={authData.password}
            onChange={hadnleAuthData}
            type="password"
            name="password"
            placeholder="Password"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button type="submit" className="sign-in-btn" onClick={handleSignIn}>
          Sign In
        </button>
        <span className="alt-sign" onClick={handleChangeAuth}>Don't have an account? Sign up</span>
      </form>
    </div>
  );
};

export default Signin;
