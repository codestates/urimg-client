import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import ProfileImgContainer from '../components/ProfileImgContainer';
import { useDispatch } from 'react-redux';
import { setLoginStatus, setMessageModal, getUserInfo, setImageUrl } from '../actions/index';

const SetUserInfo = ({ handleFileChange, imageUrl, userinfo, history })=>{  
  const[ userName, setUserName ] = useState('');
  const dispatch = useDispatch();

  useEffect(() => deleteImageUrl, [])

  const deleteImageUrl = () => {
    dispatch(setImageUrl(''));
  }

  console.log(`setUserInfo: ${userinfo.profile_image}`);
  console.log(userinfo)

  if (!userinfo.profile_image) {
    userinfo.profile_image = 'default-profile-picture_150.jpg'
  }

  const handleProfileEdit = ()=>{
    axios.patch(process.env.REACT_APP_API_URL+'/user/userinfo',{ 
      user_name:userName
    },{
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.accessToken}`
      } 
    })
    .then(() => {
      dispatch(getUserInfo({...userinfo, user_name: userName}))
      dispatch(setMessageModal(true,'이름이 변경되었습니다.'))
    })
    .catch((err) => {
      if (err) throw err;
    })
  }

  async function handleProfileImgEdit() {
    if (imageUrl === '') {
      dispatch(setMessageModal(true,'이미지를 업로드해주세요.'))
      return;
    }
    await axios.patch(process.env.REACT_APP_API_URL+'/user/userinfo',{ 
      profile_image: imageUrl
    },{
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.accessToken}`
      } 
    })
    .then(() => {
      dispatch(getUserInfo({...userinfo, profile_image: imageUrl}));
      dispatch(setMessageModal(true,'프로필 이미지가 변경되었습니다.'))
    })
    .catch((err)=>{
      if (err) throw err;
    })
  }
  const handleWithdrawal = ()=>{              //회원 탈퇴 로직
    axios.delete(process.env.REACT_APP_API_URL+'/user/userinfo',{
        headers:{
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.accessToken}`
        } 
      })
      .then(resp=>{
        dispatch(setLoginStatus(false));
        localStorage.removeItem('accessToken');
        dispatch(setMessageModal(true,'회원 탈퇴가 완료되었습니다.'))
        history.push('/')
      })
      .catch((err)=>{
        if(err.response.status===401){              
          console.log(err)
        }
      })
  }

  return (
    <div className='setting-user-info'>
      <div className="user-info-modify-area">
        <ProfileImgContainer
          handleFileChange={handleFileChange}
          profileImage={userinfo.profile_image}
          handleProfileImgEdit={handleProfileImgEdit}
          imageUrl={imageUrl}
        />
        <div className="username-input-area">
          <div className="bold-letter subject">이름</div>
          <input             
            className='setting-input-box'
            type='text'
            placeholder={userName}
            onChange={(e)=>setUserName(e.target.value)}
          />
          <div>
          <div className='error-msg-for-space'>.</div>
            <button className='btn btn-edit' type='submit' onClick={handleProfileEdit}>
              변경
            </button>
          </div>
        </div>
      </div>

      <div className='setting-link'>
        <div className='setting-link-box bold-letter' onClick={() => {history.push('/setting/profile')}}>
        프로필 수정</div>
        <div className='setting-link-box' onClick={() => {history.push('/setting/password')}}>
        비밀번호 수정</div>
        <button className='btn-withdrawal' onClick={handleWithdrawal}>
          회원탈퇴
        </button>
      </div>
    </div>
  )
}

export default  withRouter(SetUserInfo);