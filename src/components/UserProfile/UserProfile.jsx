import React, { useState, useEffect, useRef, useContext } from "react";
import "./UserProfile.css";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import ProfileImageEditor from "../ProfileImageEditor/ProfileImageEditor";
import ProfileDetails from "../ProfileDetails/ProfileDetails";
import { useAuth } from "../Context/AuthContext";
import Calendar from "../Calendar/Calendar";
import { isEmailRegistered } from "../Utils/authUtils";
import imageDefault from "../../assets/task-icon/task-icon.png";

function UserProfile({ isProfileVisible }) {
  const { logout, user, updateProfile } = useAuth();
  const [editUserProfile, setEditUserProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [userProfileData, setUserProfileData] = useState({
    image: user.image || imageDefault,
    name: user.name || "",
    email: user.email || "",
    currentPassword: user.password,
    newPassword: ""
  });

  const [imgaeFile, setImageFile] = useState(null);
  const [scale, setScale] = useState(1);
  const editorRef = useRef(null);

  useEffect(() => {
    setUserProfileData({
      image: user.image || imageDefault,
      name: user.name || "",
      email: user.email || "",
      currentPassword: user.password,
      newPassword: ""
    });
  }, [user.name, user.email, user.password]);

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
      currentPassword: user.password,
      newPassword: ""
    }));
    setErrors({});
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
      userProfileData.email !== user.email
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
    <div className={`user-profile ${isProfileVisible && "visible"}`}>
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
        <ProfileDetails
          editUserProfile={editUserProfile}
          changePassword={changePassword}
          userProfileData={userProfileData}
          handleChange={handleChange}
          errors={errors}
          handleBackPassword={handleBackPassword}
          handleSavePassword={handleSavePassword}
          handleChangePassword={handleChangePassword}
          name={user.name}
          email={user.email}
        />
        <div>
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
