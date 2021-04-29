import Search from './Search';
import { withRouter } from "react-router-dom";

const Nav = ({ handleButtonClick, history }) => {
  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => {}}>
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

export default withRouter(Nav);