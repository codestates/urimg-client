import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

const ImageDetail = ({ image, loginStatus, history }) => {
  const likeImage = () => {
      // axios.post(`${process.env.REACT_APP_API_URL}/img/like`, {
      //   image_id: image.id
      // }, {
      //   headers : {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${loginStatus.accessToken}`,
      //     withCredentials: true
      //   }
      // })
      // .then(() => {
      //   console.log('성공!')
      // })
      // .catch((err) => {
      //   if(err.response.status === 401){              
      //     // 리프레시 토큰으로 액세스 토큰 재발급
      //   }
      // })
    }

    return (
      <div className="image-detail">
        <div className="image-detail-header">
          <div className="username">{image.user.username}</div>
          {loginStatus.isLogin ? (
            <button className="like-btn" onClick={likeImage}>like</button> 
            ) : 
            null}
        </div>
        <img className="image" src={image.url} alt={image.alt_description} />
        <span>댓글 컴포넌트 자리</span>
      </div>
    );
  }
  
  export default withRouter(ImageDetail);