import React, { useState } from "react";
import "./Auth.css";
import Signup from "./Signup/Signup";
import Signin from "./Signin/Signin";

function Auth() {
  const [authType, setAuthType] = useState(true);

  const handleChangeAuth = () => {
    authType ? setAuthType(false) : setAuthType(true);
  };

  return (
    <div className="auth-container">
      {authType ? (
        <Signup handleChangeAuth={handleChangeAuth} />
      ) : (
        <Signin handleChangeAuth={handleChangeAuth} />
      )}
    </div>
  );
}

export default Auth;
