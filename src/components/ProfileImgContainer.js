import React from "react";

const ProfileImgContainer = ({profileImage,handleProfileImgEdit,handleFileChange})=>{       
    return(
        <div className='profile-container'>
            <div
                className="user-profile-img"
                style={{ backgroundImage: `url(/${profileImage})` }}
            >
            </div>
            <div>    
                <label htmlFor="image_uploads">프로필 사진 바꾸기</label>   {/* lable의 for 속성으로 input 태그와 연결한 후 input style 속성으로 숨김 */}
                <input                                           
                type="file" 
                id="image_uploads" 
                accept=".jpg, .jpeg, .png" multiple
                style={{display:"none"}}
                onChange={(e)=>{
                    handleFileChange(e)
                    handleProfileImgEdit()
                }}
                />
            </div>
        </div>
    )
}

export default ProfileImgContainer