import React from "react";
import "./Signup.css";
const Signup = ({handleChangeAuth}) => {
  return (
    <div className="sign-up-container">
      <form action="" className="sign-up-content">
        <h2>Sign Up</h2>
        <div className="inputs">
          <input type="text" name="name" placeholder="Name" />
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
        </div>
        <button type="submit" className="sign-up-btn">Sign Up</button>
        <span onClick={handleChangeAuth}>Already have an account? Sign In</span>
      </form>
    </div>
  );
};

export default Signup;
