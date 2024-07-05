import React from "react";
import "./Signup.css";
const Signup = () => {
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
        <button type="submit">Sign Up</button>
        <span>Already have an account? Sign In</span>
      </form>
    </div>
  );
};

export default Signup;
