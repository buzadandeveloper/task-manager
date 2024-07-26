import React from "react";
import "./UserProfile.css";
import { useAuth } from "../Context/AuthContext";
import Calendar from "../Calendar/Calendar";
import image from "../../assets/task-icon/task-icon.png";

const UserProfile = () => {
  const { logout } = useAuth();
  return (
    <div className="main-container-up">
      <div className="edit-up">
          <button>Edit</button>
          <button onClick={logout}>Log Out</button>
        </div>
      <div className="content-up">
        <div className="up-img">
          <img src={image} alt="" />
        </div>
        <div className="up-details">
          <p className="name">Buza Dan</p>
          <p className="email">buzadanfx@gmail.com</p>
        </div>
        <Calendar/>
      </div>
    </div>
  );
};

export default UserProfile;
