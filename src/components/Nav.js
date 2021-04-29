import React from 'react';
import Search from './Search';

const Nav = ({ handleButtonClick }) => {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        logo
      </div>
      <div className="nav-search">
        <Search handleButtonClick={handleButtonClick}/> 
      </div>
      <div className="nav-user-control">
        <button className="upload-btn">
          사진 업로드
        </button>
        <button className="login-btn">
          로그인
        </button>
      </div>
    </nav>
  );
}

export default Nav;