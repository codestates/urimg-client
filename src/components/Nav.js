import React from "react";
import Search from './Search';
import { withRouter } from "react-router-dom";

const Nav = ({ handleButtonClick, handleLogoClick, openModal, history }) => {
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
        <button className="upload-btn" onClick={() => {openModal()}}>
          사진 업로드
        </button>
        <button className="login-btn" onClick={() => {history.push("/login")}}>
          로그인
        </button>
        <div className="nav-mypage" onClick={() => {history.push("/mypage")}}>
          mypage
        </div>
      </div>
    </nav>
  );
}

export default withRouter(Nav);