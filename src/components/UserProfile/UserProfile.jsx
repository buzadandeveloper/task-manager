import React, { useState, useEffect, useRef } from "react";
import "./UserProfile.css";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import ProfileImageEditor from "../ProfileImageEditor/ProfileImageEditor";
import { useAuth } from "../Context/AuthContext";
import Calendar from "../Calendar/Calendar";
import { isEmailRegistered } from "../Utils/AuthUtils";
import imageDefault from "../../assets/task-icon/task-icon.png";

const UserProfile = () => {
  const { logout, image, name, email, password, updateProfile } = useAuth();
  const [editUserProfile, setEditUserProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [userProfileData, setUserProfileData] = useState({
    image: image || imageDefault,
    name: name || "",
    email: email || "",
    currentPassword: password,
    newPassword: ""
  });

  const [imgaeFile, setImageFile] = useState(null);
  const [scale, setScale] = useState(1);
  const editorRef = useRef(null);

  useEffect(() => {
    setUserProfileData({
      image: image || imageDefault,
      name: name || "",
      email: email || "",
      currentPassword: password,
      newPassword: ""
    });
  }, [name, email, password]);

  const [errors, setErrors] = useState({});
  const handleEdit = () => {
    setEditUserProfile(true);
  };
  const handleCancel = () => {
    setEditUserProfile(false);
    setChangePassword(false);
    setImageFile(null);
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

  const handleChangeImage = e => {
    const file = e.target.files[0];
    file && setImageFile(file);
  };

  const handleChangePassword = () => {
    setChangePassword(true);
  };

  const handleBackPassword = () => {
    setChangePassword(false);
    setUserProfileData(prevState => ({
      ...prevState,
      currentPassword: password,
      newPassword: ""
    }));
  };

  const handleSavePassword = () => {
    const newErrors = validateEditProfile();
    if (Object.keys(newErrors).length === 0) {
      const updatedUserProfile = {
        ...userProfileData,
        password: userProfileData.newPassword,
        currentPassword: "",
        newPassword: ""
      };
      updateProfile(
        userProfileData.image,
        userProfileData.name,
        userProfileData.email,
        userProfileData.newPassword
      );
      setUserProfileData(updatedUserProfile);
      setChangePassword(false);
    } else {
      setErrors(newErrors);
    }
  };

  const handleSave = () => {
    if (changePassword) return;
    const newErrors = validateEditProfile();
    if (Object.keys(newErrors).length === 0) {
      let canvas = userProfileData.image;
      if (editorRef.current) {
        canvas = editorRef.current.getImage().toDataURL();
      }
      setUserProfileData(prevState => ({
        ...prevState,
        image: canvas
      }));
      updateProfile(
        canvas,
        userProfileData.name,
        userProfileData.email,
        userProfileData.currentPassword
      );
      setEditUserProfile(false);
      setImageFile(null);
      setChangePassword(false);
    } else {
      setErrors(newErrors);
    }
  };

  const validateEditProfile = () => {
    const newErrors = {};
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
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
    if (changePassword) {
      !userProfileData.currentPassword &&
        (newErrors.currentPassword = "Current password is required");
      !passwordRegex.test(userProfileData.newPassword) &&
        (newErrors.newPassword =
          "Password must include a digit, lowercase, uppercase, special character, and be 8+ chars.");
    }

    return newErrors;
  };

  return (
    <div className="main-container-up">
      <ProfileHeader
        editUserProfile={editUserProfile}
        handleSave={handleSave}
        handleCancel={handleCancel}
        handleEdit={handleEdit}
        changePassword={changePassword}
        logout={logout}
      />
      <div className="content-up">
        <ProfileImageEditor
          editUserProfile={editUserProfile}
          handleChangeImage={handleChangeImage}
          imgaeFile={imgaeFile}
          scale={scale}
          editorRef={editorRef}
          userProfileData={userProfileData}
        />
        <div className="up-details">
          {editUserProfile ? (
            <>
              {changePassword && (
                <>
                  <input
                    name="currentPassword"
                    value={userProfileData.currentPassword}
                    type="password"
                    className="ch-pass"
                    onChange={handleChange}
                    placeholder="Current Password"
                  />
                  {errors.currentPassword && (
                    <span className="error">{errors.currentPassword}</span>
                  )}
                  <input
                    name="newPassword"
                    value={userProfileData.newPassword}
                    type="password"
                    className="ch-pass"
                    onChange={handleChange}
                    placeholder="New Password"
                  />
                  {errors.newPassword && (
                    <span className="error long-text">
                      {errors.newPassword}
                    </span>
                  )}
                </>
              )}
              {!changePassword && (
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
                </>
              )}
              {changePassword ? (
                <div className="btn-pass">
                  <button
                    className="back-pass-btn"
                    onClick={handleBackPassword}
                  >
                    Back
                  </button>
                  <button
                    className="save-pass-btn"
                    onClick={handleSavePassword}
                  >
                    Save Password
                  </button>
                </div>
              ) : (
                <button className="ch-pass-btn" onClick={handleChangePassword}>
                  Change password ?
                </button>
              )}
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
