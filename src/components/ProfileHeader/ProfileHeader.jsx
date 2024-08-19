import React, { useContext } from "react";
import "./ProfileHeader.css";
import { useAuth } from "../Context/AuthContext";
import { IoIosClose } from "react-icons/io";

const ProfileHeader = ({
  editUserProfile,
  handleSave,
  handleCancel,
  handleEdit,
  changePassword,
  logout
}) => {
  const { toggleProfile } = useAuth();
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
        <div className="edits-btn">
          <div className="btns-head-up">
            <button className="edit-btn" onClick={handleEdit}>
              Edit
            </button>
            <button className="logout-btn" onClick={logout}>
              Log Out
            </button>
          </div>
          <div className="close-button-up">
            <IoIosClose size={30} onClick={toggleProfile} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
