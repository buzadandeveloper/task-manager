import React from "react";
import "./ProfileImageEditor.css";
import AvatarEditor from "react-avatar-editor";

const ProfileImageEditor = ({
  editUserProfile,
  handleChangeImage,
  imgaeFile,
  scale,
  editorRef,
  userProfileData
}) => {
  return (
    <div className="up-img">
      {editUserProfile ? (
        <div className="file-input-container">
          <input
            type="file"
            id="file-input"
            className="file-input"
            onChange={handleChangeImage}
          ></input>
          <label
            htmlFor="file-input"
            className={imgaeFile ? "" : "file-label"}
          ></label>
          {imgaeFile && (
            <AvatarEditor
              ref={editorRef}
              image={URL.createObjectURL(imgaeFile)}
              width={100}
              height={100}
              borderRadius={50}
              color={[255, 255, 255, 0.6]}
              scale={scale}
              rotate={0}
            />
          )}
        </div>
      ) : (
        <img className="profile-image" src={userProfileData.image} alt="" />
      )}
    </div>
  );
};

export default ProfileImageEditor;
