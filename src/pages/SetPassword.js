import React,{useState} from "react";
import { withRouter,useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setLoginStatus, setMessageModal } from '../actions/index';

const SetPassword = ()=>{ 

  const history = useHistory(); //  히스토리
  const[password,setPassword] = useState('')
  const[passwordConfirm,setPasswordConfirm] = useState('')
  const[isValidPassword,setIsValidPassword] = useState(true)  // 비밀번호 유효성
  const[isPasswordSame,setIsPasswordSame] = useState(true)  // 비밀번호 재확인
  const[errorMessage,setErrorMessage] = useState('')
  const dispatch = useDispatch();

  const handlePasswordEdit = ()=>{
    axios.patch(process.env.REACT_APP_API_URL+'/user/userinfo',{ 
      password
    },{
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.accessToken}`
      }
    })
    .then(resp=>{
      dispatch(setMessageModal(true,'비밀번호가 변경되었습니다.'))
      history.push('/setting/profile')
    })
    .catch((err)=>{
      if(err.response.status===401){              
        console.log(err)
      }
    })
  }

  function passwordChecker(password){            // 비밀번호 아무 문자 6자 이상
    const passwordRegex = /^.{6,}$/
    const valid = passwordRegex.test(password)
    setIsValidPassword(valid)
    if(!valid){
      setErrorMessage('비밀번호는 6자 이상입니다.')
    }
    else{
      setErrorMessage('')
    }
  }
  function samePasswordChecker(){
    const valid = password===passwordConfirm
    setIsPasswordSame( valid)
    if(!valid){
    setErrorMessage('비밀번호가 일치하지 않습니다.')
    }
    else{
    setErrorMessage('')
    }
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
      <div className='setting-user-info'>
        <div className="password-modify-area">
          <div className="bold-letter subject">새 비밀번호</div>
            <input             
              className='setting-input-box'
              type='password'
              onChange={(e)=>setPassword(e.target.value)}
              onBlur={(e)=>passwordChecker(e.target.value)}
            />  
            <div className="bold-letter subject">새 비밀번호 확인</div>
            <input             
              className='setting-input-box'
              type='password'
              onChange={(e)=>setPasswordConfirm(e.target.value)}
              onBlur={(e)=>samePasswordChecker(e.target.value)}
            />  
            {
              errorMessage.length>0 ?(
              <div className='error-msg'>{errorMessage}</div>
              ):(
              <div className='error-msg-for-space'>비밀번호 수정</div>
              )
            }
            <div>
              <button className='btn btn-edit' type='submit' onClick={handlePasswordEdit}>
              변경
              </button>
            </div>
        </div>
        <div className='setting-link'>
          <div className='setting-link-box' onClick={() => {history.push('/setting/profile')}}>
            프로필 수정</div>
          <div className='setting-link-box bold-letter' onClick={() => {history.push('/setting/password')}}>
            비밀번호 수정</div>
          <button className='btn-withdrawal' onClick={handleWithdrawal}>
            회원탈퇴
          </button>
        </div>
      </div>
  )
}

export default  withRouter(SetPassword);