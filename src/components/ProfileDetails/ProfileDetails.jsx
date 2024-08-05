import React from "react";
import "./ProfileDetails.css";
const ProfileDetails = ({
  editUserProfile,
  changePassword,
  userProfileData,
  handleChange,
  errors,
  handleBackPassword,
  handleSavePassword,
  handleChangePassword,
  name,
  email
}) => {
  return (
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
                <span className="error long-text">{errors.newPassword}</span>
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
              <button className="back-pass-btn" onClick={handleBackPassword}>
                Back
              </button>
              <button className="save-pass-btn" onClick={handleSavePassword}>
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
  );
};

export default ProfileDetails;
