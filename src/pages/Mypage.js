import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import ImageList from "../components/ImageList";
import axios from "axios";

const Mypage = ({ userInfo, isLogin, redirectToImage, history }) => {
  if (!isLogin) {
    history.push("/login");
  }

  const [ images, setImages ] = useState([]);
  let profileImage = userInfo.profile_image;

  useEffect(() => getImages('upload'), []);

  const getImages = (type) => {
    axios.get(`${process.env.REACT_APP_API_URL}/img/mypage/?type=${type}`, {
      headers : {
        Authorization: `Bearer ${localStorage.accessToken}`
      }
    })
    .then((res) => {
      setImages(res.data.data.images);
    })
    .catch((err) => {
      if (err) throw err;
    })
  }

  return (
      <div className="Mypage">
        <div className="user-info-area">
          <div
            className="user-profile-img"
            style={{ backgroundImage: `url(${profileImage})` }}>
          </div>
          <div className="user-info">
            <p className="username">{userInfo.user_name}</p>
            <p>{userInfo.email}</p>
            <button
              className="btn userInfo-modify"
              onClick={() => history.push("/setting/profile")
            }>
            회원정보 수정
            </button>
          </div>
        </div>
        <div className="image-list-type">
          <ul>
            <li onClick={() => getImages('upload')}>Photo</li>
            <li onClick={() => getImages('like')}>Like</li>
          </ul>
        </div>
        <ImageList images={images} redirectToImage={redirectToImage} />
      </div>
    )
  }
  
  export default withRouter(Mypage);
