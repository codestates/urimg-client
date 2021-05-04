import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Comment from '../components/Comment';
import CreateComment from '../components/CreateComment';
import comments from '../fakeData/comments';

const ImageDetail = ({ image, isLogin, history }) => {
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
    const handleComment = (comment)=>{
      axios.post(`${process.env.REACT_APP_API_URL}/img/comment`, {
        image_id: image.id,
        comment
      }, {
        headers : {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loginStatus.accessToken}`,
          withCredentials: true
        }
      })
      .then(() => {
        console.log('성공!')
      })
      .catch((err) => {
        if(err.response.status === 401){              
          // 리프레시 토큰으로 액세스 토큰 재발급
        }
      })
    }

    return (
      <div className="image-detail">
        <div className="image-description">{image.description}</div>
        <div className="image-detail-header">
          <div className="username">{image.user.username}</div>
          {isLogin ? (
            <button className="like-btn" onClick={likeImage}>like</button> 
            ) : 
            null}
        </div>
        <img className="image" src={image.url} alt={image.alt_description} />
        <CreateComment handleComment={handleComment}/>
        {
          comments.map((comment,i)=>{
            return <Comment 
                key={i} 
                userName={comment.user_name} 
                date={comment.created_at} 
                comment={comment.comment}
              />
          })
        }
      </div>
    );
  }
  
  export default withRouter(ImageDetail);