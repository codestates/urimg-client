import React,{useState} from "react";
import { Link, withRouter,useHistory } from "react-router-dom";
import axios from "axios";
import InputContainer from '../components/InputContainer';
import { useDispatch } from 'react-redux';
import { setLoginStatus, getUserInfo } from '../actions/index';

axios.defaults.withCredentials = true;

const Login = ()=>{
  const history = useHistory(); //  히스토리
  const[email,setEmail] = useState('email')
  const[password,setPassword] = useState('password')
  const[errorMessage,setErrorMessage] = useState('')

  const dispatch = useDispatch();

  const handleLogin = ()=>{
    axios.post(process.env.REACT_APP_API_URL+'/user/login',{ // ec2 엔드포인드주소 
      password,
      email
    },{
      'Content-Type': 'application/json'             
    })
    .then(resp=>{
      localStorage.setItem('accessToken', resp.data.data.access_token);
      dispatch(setLoginStatus(true));   
      return axios.get(process.env.REACT_APP_API_URL+'/user/userinfo',{
        headers:{
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resp.data.data.access_token}`
        }
      })
    })
    .then(resp=>{
      dispatch(getUserInfo(resp.data))
      history.push('/')
    })
    .catch((err)=>{    // 중복일때 아직 안만듬
      console.log(err)
      if(err.response.status===401){
        setErrorMessage('가입하지 않은 이메일 이거나 잘못된 비밀번호 입니다.')
      }
    })
  }

  return(
      <div className='login-signup-area'>
        <div className='login'>
            <h1>Sign In</h1>
          {/* <form 
            className='login-signup'
            onSubmit={(e) => e.preventDefault()}
          > */}
            <InputContainer 
              type={'text'} 
              placeholder={'email'} 
              handler={setEmail} 
            />
            <InputContainer 
              type={'password'} 
              placeholder={'password'} 
              handler={setPassword} 
            />
            {/* <div className="login-link"> */}
              <Link to='/Signup'>아직 아이디가 없으신가요?</Link> 
            {/* </div > */}
            {
              errorMessage.length>0 ?(
              <span className='error-msg'>
                {errorMessage}
              </span>
              ):(
              <span className='error-msg-for-space'>
                로그인을 해주세요!  {/*공간 차지하기위한 텍스트*/}
              </span>  
              )
            }
            <div className='login-signup-btn-area'>
              <button className='login-signup-page-btn' type='submit' onClick={handleLogin}>
                로그인
              </button>
            </div>
          {/* </form> */}

        </div>
      </div>
  )
} 



export default  withRouter(Login);
