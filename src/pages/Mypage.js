import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from 'react-redux';
import ImageList from "../components/ImageList";
import axios from "axios";

import { imagesData } from "../fakeData/images";

axios.defaults.withCredentials = true;

const Mypage = ({ userInfo, loginStatus }) => {
  const dispatch = useDispatch();
  const [ images, setImages ] = useState([]);
  let profileImage = loginStatus.profile_image;

  useEffect(() => getImages('upload'), [])

  const getImages = (type) => {
    // axios.get(`${process.env.REACT_APP_API_URL}/img/mypage`, {
    //   type: type
    // }, {
    //   headers : {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${loginStatus.accessToken}`,
    //     withCredentials: true
    //   }
    // })
    // .then((res) => {
    //   setImages(res.data.data.images)
    // })
    // .catch((err) => {
    //   if(err.response.status === 401){              
    //     // 리프레시 토큰으로 액세스 토큰 재발급
    //   }
    // })

    const userImages = imagesData.filter((image) => image.user.id === userInfo.id );
    setImages(userImages);
  }

  if (!profileImage) {
    profileImage = 'default-profile-picture_640.png'
  }

  return (
      <div className="Mypage">
        <div className="user-info-area">
          <div
            className="user-profile-img"
            style={{ backgroundImage: `url(${profileImage})` }}>
          </div>
          <div className="user-info">
            <p>{userInfo.user_name}</p>
            <p>{userInfo.email}</p>
            <button>회원정보 수정</button>
          </div>
        </div>
        <div className="image-list-type">
          <ul>
            <li onClick={() => getImages('upload')}>Photo</li>
            <li onClick={() => getImages('like')}>Like</li>
          </ul>
        </div>
        <ImageList images={images} />
      </div>
    )
  }
  
  export default withRouter(Mypage);
