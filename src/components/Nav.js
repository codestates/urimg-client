import React from "react";
import Search from './Search';
import { withRouter } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setLoginStatus } from '../actions/index';
import axios from "axios";

const Nav = ({ handleButtonClick, handleLogoClick, openModal, isLogin, history }) => {
  const dispatch = useDispatch();

  async function logout() {
    await axios.post(`${process.env.REACT_APP_API_URL}/user/logout`, null, {
      headers : {
        Authorization: `Bearer ${localStorage.accessToken}`
      }
    })
    .then(() => {
      dispatch(setLoginStatus(false));
      localStorage.removeItem('accessToken');
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
    <nav className="navbar">
      <div className="nav-logo-and-search">
        <div className="nav-logo" onClick={() => {handleLogoClick()}}>
          logo
        </div>
        <div className="nav-search">
          <Search handleButtonClick={handleButtonClick}/> 
        </div>
      </div>
      <div className="nav-user-control">
        {
          isLogin ? (
            <React.Fragment>
            <button className="upload-btn" onClick={openModal}>
              사진 업로드
            </button>
            <button className="upload-btn" onClick={logout}>
              로그아웃
            </button>
            <div className="nav-mypage" onClick={() => {history.push("/mypage")}}>
              mypage
            </div>
            </React.Fragment>
          ) : (
            <button className="login-btn" onClick={() => {history.push("/login")}}>
              로그인
            </button>
          )
        }
      </div>
    </nav>
  );
}

export default withRouter(Nav);