import React from "react";
import { withRouter } from "react-router-dom";
import ImageList from "../components/ImageList";

const Mypage = ({ userInfo }) => {
  if (JSON.stringify(userInfo) === '{}') {
    userInfo = {
      "id": "id",
      "user_name": "fake name",
      "email": "fake@email.com",
      "profile_image": "default-profile_640.png",
    }
  }

  return (
      <div className="Mypage">
        <div className="user-info-area">
          <div
            className="user-profile-img"
            style={{ backgroundImage: `url(${userInfo.profile_image})` }}>
          </div>
          <div className="user-info">
            <p>{userInfo.user_name}</p>
            <p>{userInfo.email}</p>
            <button>회원정보 수정</button>
          </div>
        </div>
      </div>
    )
  }
  
  export default withRouter(Mypage);
