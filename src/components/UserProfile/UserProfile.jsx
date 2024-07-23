import React from "react";
import "./UserProfile.css";
import { useAuth } from "../Context/AuthContext";

const UserProfile = () => {
  const {logout} = useAuth();
  return (
    <div className="main-container-up">
      <div className="content-up">
        <div className="up-img">
          <img src="" alt="" />
        </div>
        <div className="up-details">
            <p className="name">Name</p>
            <p className="email">Email</p>
            <button onClick={logout}>Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
