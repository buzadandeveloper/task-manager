import React, { useState } from "react";
import "./UserProfile.css";
import { useAuth } from "../Context/AuthContext";
import Calendar from "../Calendar/Calendar";
import image from "../../assets/task-icon/task-icon.png";

const UserProfile = () => {
  const { logout, user } = useAuth();
  const [editUserProfile, setEditUserProfile] = useState(false);
  const [userProfileData, setUserProfileData] = useState({
    profileImage: user.ProfileImage,
    name: user.name,
    email: user.email,
    password: "",
    newPassword: ""
  });
  const [errors, setErrors] = useState({});
  const handleEdit = () => {
    setEditUserProfile(true);
  };
  const validateEditProfile = () => {
    const newErrors = {};
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    !userProfileData.name && (newErrors.name = "Name is required!");
    !userProfileData.email 
  };

  return (
    <div className="main-container-up">
      <div className="edit-up">
        <button className="edit-btn" onClick={handleEdit}>
          Edit
        </button>
        <button className="logout-btn" onClick={logout}>
          Log Out
        </button>
      </div>
      <div className="content-up">
        <div className="up-img">
          <img src={image} alt="" />
        </div>
        <div className="up-details">
          <p className="name">{user.name}</p>
          <p className="email">{user.email}</p>
        </div>
        <Calendar />
      </div>
    </div>
  );
};

export default UserProfile;
