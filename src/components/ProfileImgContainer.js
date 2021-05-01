import React from "react";
import defaultProfile from '../fakeData/default-profile.jpg'

const ProfileImgContainer = ({profile=defaultProfile})=>{       // apps로 부터 유저정보에 있는 profile을 props로 못받으면 default 
    const handleProfileEdit = (e)=>{                        // 이미지 파일 올리는 거는 어떻게 할지,,,    
        
    }
    return(
        <div className='profile-container'>
            <img
            className="profile"
            src={profile}
            width="100" height="100"         // 차후에 크기 수정
            onClick={handleProfileEdit}
            />
            <div>    
                <label for="image_uploads">Choose image</label>   {/* lable의 for 속성으로 input 태그와 연결한 후 input style 속성으로 숨김 */}
                <input                                           
                type="file" 
                id="image_uploads" 
                accept=".jpg, .jpeg, .png" multiple
                style={{display:"none"}}
                />
            </div>
        </div>
    )
}

export default ProfileImgContainer