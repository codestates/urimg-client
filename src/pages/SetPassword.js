import React,{useState} from "react";
import { Link, withRouter,useHistory } from "react-router-dom";
import axios from "axios";
import InputContainer from '../components/InputContainer';
import { useSelector } from 'react-redux';

axios.defaults.withCredentials = true;

const SetPassword = ()=>{ 

  const history = useHistory(); //  히스토리
  const[password,setPassword] = useState('')
  const[passwordConfirm,setPasswordConfirm] = useState('')
  const[isValidPassword,setIsValidPassword] = useState(true)  // 비밀번호 유효성
  const[isPasswordSame,setIsPasswordSame] = useState(true)  // 비밀번호 재확인
  const[errorMessage,setErrorMessage] = useState('')
  const state = useSelector(state=>state.userReducer);
  const { loginStatus } = state
  const {accessToken} = loginStatus

  const handlePasswordEdit = ()=>{
    axios.patch(process.env.REACT_APP_API_URL+'/user/userinfo',{ 
      password
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

  return(
      <div className='setting-user-info'>
          <div className='profile-image-container'>
          </div>
          <div className='setting-center'>
            <form onSubmit={(e) => e.preventDefault()}>
              <div>
                <div>새 비밀번호</div>
                <InputContainer 
                  type={'password'} 
                  placeholder={null} 
                  handler={setPassword} 
                  validChecker={passwordChecker} 
                  isValid={isValidPassword} 
                />
                <div>새 비밀번호 확인</div>
                <InputContainer 
                  type={'password'} 
                  placeholder={null} 
                  handler={setPasswordConfirm} 
                  validChecker={samePasswordChecker} 
                  isValid={isPasswordSame}
                />
              </div>
              <button className='btn btn-edit' type='submit' onClick={handlePasswordEdit}>
                변경
              </button>
            </form>
            {
              errorMessage.length>0 ?(
                <span>{errorMessage}</span>
              ):(
                <span></span>
              )
            }
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

export default  withRouter(SetPassword);