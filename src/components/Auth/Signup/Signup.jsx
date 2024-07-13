import React, { useState, useEffect } from "react";
import "./Signup.css";
import { FaRegCheckCircle } from "react-icons/fa";
const Signup = ({ handleChangeAuth }) => {
  const [authData, setAuthData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordCriteria, setPasswordCriteria] = useState({
    hasLowerCase: false,
    hasUpperCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasMinLength: false,
  });

  const lowerCaseRegex = /[a-z]/;
  const upperCaseRegex = /[A-Z]/;
  const numberRegex = /[0-9]/;
  const specialCharRegex = /[.!@#$%^&*]/;
  const minLengthRegex = /.{8,}/;

  useEffect(() => {
    setPasswordCriteria({
      hasLowerCase: lowerCaseRegex.test(authData.password),
      hasUpperCase: upperCaseRegex.test(authData.password),
      hasNumber: numberRegex.test(authData.password),
      hasSpecialChar: specialCharRegex.test(authData.password),
      hasMinLength: minLengthRegex.test(authData.password),
    });
  }, [authData.password]);

  const validateAuth = () => {
    const newErrors = {};
    !authData.name && (newErrors.name = "Name is required.");
    !authData.email && (newErrors.email = "Email is required.");
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    !emailRegex.test(authData.email) &&
      (newErrors.email = "Invalid email format");
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    !passwordRegex.test(authData.password) &&
      (newErrors.password = "Password is required according to the criterion.");
    !authData.confirmPassword &&
      (newErrors.confirmPassword = "Confirm password is required.");
    authData.password !== authData.confirmPassword &&
      (newErrors.confirmPassword = "Password do not match.");
    return newErrors;
  };

  const handleAuthData = (e) => {
    setAuthData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = validateAuth();
    if (Object.keys(newErrors).length === 0) {
      console.log(authData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="sign-up-container">
      <form action="" className="sign-up-content">
        <h2>Sign Up</h2>
        <div className="inputs">
          <input
            value={authData.name}
            type="text"
            name="name"
            onChange={handleAuthData}
            className={errors.name && "error-input"}
            placeholder="Name"
          />
          {errors.name && <span className="error">{errors.name}</span>}
          <input
            value={authData.email}
            type="email"
            name="email"
            onChange={handleAuthData}
            className={errors.email && "error-input"}
            placeholder="Email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <input
            value={authData.password}
            type="password"
            name="password"
            onChange={handleAuthData}
            className={errors.password && "error-input"}
            placeholder="Password"
          />
          {errors.password && <span className="error">{errors.password}</span>}
          <input
            value={authData.confirmPasword}
            type="password"
            name="confirmPassword"
            onChange={handleAuthData}
            className={errors.confirmPassword && "error-input"}
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <span className="error ">{errors.confirmPassword}</span>
          )}
        </div>
        <div className="pass-validation">
          <p className={passwordCriteria.hasLowerCase && "valid"}>
            <FaRegCheckCircle /> At least one lowercase letter
          </p>
          <p className={passwordCriteria.hasUpperCase && "valid"}>
            <FaRegCheckCircle /> At least one uppercase letter
          </p>
          <p className={passwordCriteria.hasNumber && "valid"}>
            <FaRegCheckCircle /> At least one number
          </p>
          <p className={passwordCriteria.hasSpecialChar && "valid"}>
            <FaRegCheckCircle /> At least one special charcter
          </p>
          <p className={passwordCriteria.hasMinLength && "valid"}>
            <FaRegCheckCircle /> At least 8 characters
          </p>
        </div>
        <button type="submit" className="sign-up-btn" onClick={handleSubmit}>
          Sign Up
        </button>
        <span onClick={handleChangeAuth} className="alt-sign">
          Already have an account? Sign In
        </span>
      </form>
    </div>
  );
};

export default Signup;
