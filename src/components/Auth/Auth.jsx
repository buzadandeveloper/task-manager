import React from "react";
import "./Auth.css"
import Signup from "./Signup/Signup";
import Signin from "./Signin/Signin";

const Auth = () => {
    return (
        <div className="auth-container">
            <Signin/>
        </div>
    );
}

export default Auth;