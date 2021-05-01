import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import ImageList from "../components/ImageList";

import { imagesData } from "../fakeData/images";

const Mypage = ({ userInfo }) => {
  const [ images, setImages ] = useState([]);

  if (JSON.stringify(userInfo) === '{}') {
    userInfo = {
      "id": "8LaX7CyhXx4",
      "user_name": "fake name",
      "email": "fake@email.com",
      "profile_image": "default-profile_640.png",
    }
  }

  useEffect(() => getUserImages(), [])

  const getUserImages = () => {
    // 서버에 요청해서 유저가 올린 이미지 데이터 리스트를 받아오는 함수 작성 예정
    const userImages = imagesData.filter((image) => image.user.id === userInfo.id );
    setImages(userImages);
  }

  const getLikedImages = () => {
    // 서버에 요청해서 유저가 좋아요 표시한 이미지 데이터 리스트를 받아오는 함수 작성 예정
    setImages(imagesData);
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
        <div className="image-list-type">
          <ul>
            <li onClick={getUserImages}>Photo</li>
            <li onClick={getLikedImages}>Like</li>
          </ul>
        </div>
        <ImageList images={images} />
      </div>
    )
  }
  
  export default withRouter(Mypage);
