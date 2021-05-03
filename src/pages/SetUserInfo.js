import React,{useState} from "react";
import { Link, withRouter,useHistory } from "react-router-dom";
import axios from "axios";
import InputContainer from '../components/InputContainer';
import ProfileImgContainer from '../components/ProfileImgContainer';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginStatus } from '../actions/index';
import {refreshAccessToken} from '../functions/Request';       //엑세스 토큰 재요청 함수
axios.defaults.withCredentials = true;

const SetUserInfo = ({handleFileChange, imageUrl})=>{  
  
  const history = useHistory(); //  히스토리
  const[userName,setUserName] = useState('')
  const state = useSelector(state=>state.userReducer);
  const { loginStatus, userinfo } = state
  const dispatch = useDispatch();
  const {accessToken} = loginStatus
  let profileImage = userinfo.profile_image

  if (!profileImage) {
    profileImage = 'default-profile-picture_640.png'
  }



  const handleProfileEdit = ()=>{
    axios.patch(process.env.REACT_APP_API_URL+'/user/userinfo',{ 
      user_name:userName
    },{
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      } 
    })
    .then(resp=>{
      history.push('/setting/profile')
    })
    .catch((err)=>{
      if(err.response.status===401){              
        refreshAccessToken( dispatch(setLoginStatus(accessToken)) )     //엑세스 토큰 재요청
      }
    })
  }

  const handleProfileImgEdit = ()=>{

    console.log(imageUrl)
    axios.patch(process.env.REACT_APP_API_URL+'/user/userinfo',{ 
      profile_image:imageUrl
    },{
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      } 
    })
    .then(resp=>{
      history.push('/setting/profile')
    })
    .catch((err)=>{
      if(err.response.status===401){              
        refreshAccessToken( dispatch(setLoginStatus(accessToken)) )     //엑세스 토큰 재요청
      }
    })
  }
  const handleWithdrawal = ()=>{              //회원 탈퇴 로직
    axios.delete(process.env.REACT_APP_API_URL+'/user/userinfo',{
        headers:{
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        } 
      })
      .then(resp=>{
        dispatch(setLoginStatus("", false));
        history.push('/')
      })
      .catch((err)=>{
        if(err.response.status===401){              
          refreshAccessToken( dispatch(setLoginStatus(accessToken)) )     //엑세스 토큰 재요청
        }
      })
  }

  return(
      <div className='setting-user-info' >
          <div className='profile-image-container'>
            <ProfileImgContainer
              handleFileChange={handleFileChange}
              profileImage={profileImage}
              handleProfileImgEdit={handleProfileImgEdit}
            />
          </div>
          <div className='setting-center'>
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
              <button className='btn btn-edit' type='submit' onClick={handleWithdrawal}>   {/* 탈퇴 위치 애매 */}
                회원탈퇴
              </button>
            </form>
          </div>
          <div className='setting-link'>
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