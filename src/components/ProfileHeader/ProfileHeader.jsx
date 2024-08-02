import React from "react";
import "./ProfileHeader.css";

const ProfileHeader = ({
  editUserProfile,
  handleSave,
  handleCancel,
  handleEdit,
  changePassword,
  logout
}) => {
  return (
    <div className="head-up">
      {editUserProfile ? (
        <>
          {!changePassword && (
            <>
              <button className="save-btn-up" onClick={handleSave}>
                Save
              </button>
              <button className="cancel-btn-up" onClick={handleCancel}>
                Cancel
              </button>
            </>
          )}
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
  );
};

export default ProfileHeader;
