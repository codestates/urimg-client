import React,{useState, useEffect} from "react";
import { Link, withRouter,useHistory } from "react-router-dom";
import axios from "axios";
import InputContainer from '../components/InputContainer';
import ProfileImgContainer from '../components/ProfileImgContainer';
import { useDispatch, useSelector } from 'react-redux';
import { login, getUserInfo } from '../actions/index';
axios.defaults.withCredentials = true;

const SetUserInfo = ()=>{  // 아직 토큰없어서 기본값 null
  
  const history = useHistory(); //  히스토리
  const[userName,setUserName] = useState('')
  const[errorMessage,setErrorMessage] = useState('')
  const state = useSelector(state=>state.userReducer);
  const { loginStatus, userInfo } = state
  const dispatch = useDispatch();
  const {accessToken} = loginStatus

  const handleProfileEdit = ()=>{
    axios.patch(process.env.REACT_APP_API_URL+'/user/userinfo',{ 
    //   profile_image: 'profile object',     // 사진 
      user_name:userName
    },{
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`   
    })
    .then(resp=>{
      history.push('/setting/profile')
    })
    .catch((err)=>{
    })
  }

  return(
      <div>
          <div>
            <ProfileImgContainer/>
          </div>
          <div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div>이름</div>
              <InputContainer
                type={'text'} 
                placeholder={userName} 
                handler={setUserName} 
              />
              <button className='btn btn-edit' type='submit' onClick={handleProfileEdit}>
                변경
              </button>
            </form>
          </div>
          <div>
            <div>
              <Link to='/setting/profile'>프로필 수정</Link>
            </div>
            <div>
              <Link to='/setting/password'>비밀번호 변경</Link> 
            </div>
          </div>
      </div>
  )
} 



export default  withRouter(SetUserInfo);