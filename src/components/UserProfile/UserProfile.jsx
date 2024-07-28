import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import { useAuth } from "../Context/AuthContext";
import Calendar from "../Calendar/Calendar";
import { isEmailRegistered } from "../Utils/AuthUtils";
import image from "../../assets/task-icon/task-icon.png";

const UserProfile = () => {
  const { logout, name, email, password, updateProfile } = useAuth();
  const [editUserProfile, setEditUserProfile] = useState(false);
  const [userProfileData, setUserProfileData] = useState({
    name: name || "",
    email: email || "",
    password: "",
    newPassword: ""
  });

  useEffect(() => {
    setUserProfileData({
      name: name || "",
      email: email || "",
      password: password,
      newPassword: ""
    });
  }, [name, email, password]);

  const [errors, setErrors] = useState({});
  const handleEdit = () => {
    setEditUserProfile(true);
    console.log(userProfileData);
  };
  const handleCancel = () => {
    setEditUserProfile(false);
  };

  const handleChange = e => {
    setUserProfileData({
      ...userProfileData,
      [e.target.name]: e.target.value
    });
    setErrors({
      ...errors,
      [e.target.name]: ""
    });
  };

  const handleSave = () => {
    const newErrors = validateEditProfile();
    if (Object.keys(newErrors).length === 0) {
      updateProfile(
        userProfileData.name,
        userProfileData.email,
        userProfileData.password
      );
      setEditUserProfile(false);
    } else {
      setErrors(newErrors);
    }
  };

  const validateEditProfile = () => {
    const newErrors = {};
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    !userProfileData.name && (newErrors.name = "Name is required.");
    if (!userProfileData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(userProfileData.email)) {
      newErrors.email = "Invalid email format.";
    } else if (
      isEmailRegistered(userProfileData.email) &&
      userProfileData.email !== email
    ) {
      newErrors.email = "Email is already registered.";
    }

    return newErrors;
  };

  return (
    <div className="main-container-up">
      <div className="head-up">
        {editUserProfile ? (
          <>
            <button className="save-btn-up" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-btn-up" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="edit-btn" onClick={handleEdit}>
              Edit
            </button>
            <button className="logout-btn" onClick={logout}>
              Log Out
            </button>
          </>
        )}
      </div>
      <div className="content-up">
        <div className="up-img">
          <img src={image} alt="" />
        </div>
        <div className="up-details">
          {editUserProfile ? (
            <>
              <input
                name="name"
                value={userProfileData.name}
                type="text"
                className="edit-name"
                onChange={handleChange}
                placeholder="Name"
              />
              {errors.name && <span className="error">{errors.name}</span>}
              <input
                name="email"
                value={userProfileData.email}
                type="text"
                className="edit-email"
                onChange={handleChange}
                placeholder="Email"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </>
          ) : (
            <>
              <p className="name">{name}</p>
              <p className="email">{email}</p>
            </>
          )}
        </div>
        <Calendar />
      </div>
    </div>
  );
};

export default UserProfile;
