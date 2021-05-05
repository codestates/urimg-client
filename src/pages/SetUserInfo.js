import React,{useState} from "react";
import { Link, withRouter,useHistory } from "react-router-dom";
import axios from "axios";
import ProfileImgContainer from '../components/ProfileImgContainer';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginStatus, setMessageModal } from '../actions/index';
axios.defaults.withCredentials = true;

const SetUserInfo = ({handleFileChange, imageUrl})=>{  
  const history = useHistory(); //  히스토리
  const[userName,setUserName] = useState('')
  const state = useSelector(state=>state.userReducer);
  const { userinfo } = state
  const dispatch = useDispatch();
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
        Authorization: `Bearer ${localStorage.accessToken}`
      } 
    })
    .then(resp=>{
      history.push('/setting/profile')
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const handleProfileImgEdit = ()=>{

    imageUrl=imageUrl.split(',')[1]
    axios.patch(process.env.REACT_APP_API_URL+'/user/userinfo',{ 
      profile_image:imageUrl
    },{
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.accessToken}`
      } 
    })
    .then(resp=>{
      history.push('/setting/profile')
    })
    .catch((err)=>{
      if(err.response.status===401){              
        console.log(err)
      }
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

  return(
      <div className='setting-user-info' >
        <div className='setting-user-info-area'>
          <div className='profile-image-container'>
            <ProfileImgContainer
              handleFileChange={handleFileChange}
              profileImage={profileImage}
              handleProfileImgEdit={handleProfileImgEdit}
            />
          </div>
          <div className='setting-center'>
            <div className='setting-center-area'>
              <label htmlFor="name">이름</label>
              <input             
                className='setting-input-box'
                type='text'
                placeholder={userName}
                onChange={(e)=>setUserName(e.target.value)}
              />              
              <button className='btn btn-edit' type='submit' onClick={handleProfileEdit}>
                변경
              </button>
            </div>
          </div>
          <div className='setting-link'>
            <div className='setting-link-area'>
              <div  className='setting-link-box'>
                <Link to='/setting/profile'><strong>프로필 수정</strong></Link>
              </div>
              <div className='setting-link-box'>
                <Link to='/setting/password'>비밀번호 변경</Link> 
              </div>
              <div className='setting-link-box last'>
                <button className='btn btn-withdrawal' onClick={handleWithdrawal}>
                  회원탈퇴
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
} 



export default  withRouter(SetUserInfo);