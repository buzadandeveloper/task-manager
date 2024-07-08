import React from "react";
import "./Signin.css"

const Singin = ({handleChangeAuth}) => {
    return (
        <div className="sign-in-container">
        <form action="" className="sign-in-content">
          <h2>Sign In</h2>
          <div className="inputs">
            <input type="email" name="email" placeholder="Email"/>
            <input type="password" name="password" placeholder="Password" />
          </div>
          <button type="submit" className="sign-in-btn">Sign In</button>
          <span onClick={handleChangeAuth}>Don't have an account? Sign up</span>
        </form>
      </div>
    );
}

export default Singin;