import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from "axios";
import { setLoginStatus, setMessageModal } from '../actions/index';
import CreateComment from '../components/CreateComment';
import CommentList from "../components/CommentList";

const ImageDetail = ({ image, isLogin, likeBtnColor, changeBtnColor, setDefaultColor, history }) => {
  const dispatch = useDispatch();
  const [ comments, setComments ] = useState([]);

  useEffect(() => getBasicData(), [])

  async function getBasicData() {
    await axios.get(`${process.env.REACT_APP_API_URL}/img/comment?image_id=${image.id}`)
    .then ((res) => {
      setComments(res.data.comments);
    })
    .catch ((err) => {
      if (err) throw err;
    })

    if (isLogin) {
      await axios.get(`${process.env.REACT_APP_API_URL}/img/like/?image_id=${image.id}}`, {
        headers : {
          Authorization: `Bearer ${localStorage.accessToken}`
        }
      })
      .then (() => {
        changeBtnColor();
      })
      .catch ((err) => {
        if (err) throw err;
      })
    }
  }

  async function likeImage () {
    if (likeBtnColor === '#808080') {
      await axios.post(`${process.env.REACT_APP_API_URL}/img/like`, {
        image_id: image.id
      }, {
        headers : {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.accessToken}`
        }
      })
      .then(() => {
        changeBtnColor();
        dispatch(setMessageModal(true, '사진을 Like 탭에 저장했습니다.'));
      })
      .catch((err) => {
        if (err.response.data === "Refresh token expired") {
          dispatch(setLoginStatus(false));
          localStorage.removeItem('accessToken');
          history.push("/login");
        }
        if (err.response.data === "Image already liked") {
          dispatch(setMessageModal(true, '이미 좋아요를 누른 사진입니다.'));
        }
        if (err) throw err;
      })
    } else if (likeBtnColor === '#fd4f58') {
      console.log('실행됩니까?')
      await axios.delete(`${process.env.REACT_APP_API_URL}/img/like/`, {
        data: {
          image_id: image.id
        }
      }, {
        headers : {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.accessToken}`
        }
      })
      .then(() => {
        setDefaultColor();
        dispatch(setMessageModal(true, '사진을 Like 탭에서 삭제했습니다.'));
      })
      .catch((err) => {
        if (err.response.data === "Refresh token expired") {
          dispatch(setLoginStatus(false));
          localStorage.removeItem('accessToken');
          history.push("/login");
        }
        if (err) throw err;
      })
    }
  }

  const handleComment = (comment)=>{
    axios.post(`${process.env.REACT_APP_API_URL}/img/comment`, {
      image_id: image.id,
      comment
    }, {
      headers : {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.accessToken}`,
      }
    })
    .then(() => {
      dispatch(setMessageModal(true, '댓글을 등록했습니다.'));
      getBasicData();
    })
    .catch((err) => {
      if (err.response.data === "Refresh token expired") {
        dispatch(setLoginStatus(false));
        localStorage.removeItem('accessToken');
        history.push("/login");
      }
      if (err) throw err;
    })
  }

    return (
      <div className="image-detail">
        <div className="image-detail-description">{image.description}</div>
        <div className="image-detail-header">
          <div className="image-detail-username">{image.user.user_name}</div>
        {isLogin ? (
          <button
            className="like-btn"
            style={{
              backgroundColor: likeBtnColor
            }}
            onClick={likeImage}>
            <img className="like-icon" src={"like-icon.png"} alt=""/>
            </button> 
          ) : 
          null}
      </div>
      <img className="image" src={image.image} alt={image.alt_description} />
      { isLogin ? (
        <CreateComment handleComment={handleComment}/>
      ) : null }
      <CommentList comments={comments} />
      </div>
    );
  }
  
  export default withRouter(ImageDetail);