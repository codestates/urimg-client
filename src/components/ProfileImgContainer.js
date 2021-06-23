import React from "react";
import defaultImage from "../images/default-profile-picture_150.jpg";

const ProfileImgContainer = ({profileImage, handleProfileImgEdit, handleFileChange, imageUrl})=>{       
  if (profileImage === 'default-profile-picture_150.jpg') {
    profileImage = defaultImage;
  }

  return (
    <div className='profile-container'>
      <div className="bold-letter subject">프로필 이미지</div>
      { imageUrl ? (
        <div
        className="user-profile-img modify-profile-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
        >
        </div>
      ) : (
        <label
        className="user-profile-img modify-profile-image"
        style={{ backgroundImage: `url(${profileImage})` }}
        >
        <div className="profile-upload-overlay">
          <div className="profile-upload-text">이미지 업로드</div>
        </div>

        <input                                     
          type="file" 
          id="image_uploads" 
          accept=".jpg, .jpeg, .png"
          style={{ display: "none" }}
          onChange={(e) => {
            handleFileChange(e);
          }}
        />
      </label>   
      ) }

      <div>
      <button className="btn btn-edit profile" onClick={handleProfileImgEdit}>변경</button>
      </div>
    </div>
  )
}

export default ProfileImgContainer;