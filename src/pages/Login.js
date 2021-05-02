import React,{useState} from "react";
import { Link, withRouter,useHistory } from "react-router-dom";
import axios from "axios";
import InputContainer from '../components/InputContainer';
import { useDispatch, useSelector } from 'react-redux';
import { login, getUserInfo } from '../actions/index';
axios.defaults.withCredentials = true;

const Login = (props)=>{
  const history = useHistory(); //  히스토리
  const[email,setEmail] = useState('email')
  const[password,setPassword] = useState('password')
  const[errorMessage,setErrorMessage] = useState('')

  const state = useSelector(state=>state.userReducer);
  const { loinStatus, userInfo } = state
  const dispatch = useDispatch();

  const handleLogin = ()=>{
    axios.post(process.env.REACT_APP_API_URL+'/user/login',{ // ec2 엔드포인드주소 
      password,
      email
    },{
      'Content-Type': 'application/json'             
    })
    .then(resp=>{
      dispatch(login(resp.data.data.access_token))
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
      if(err.status===401){
        setErrorMessage('가입하지 않은 이메일 이거나 잘못된 비밀번호 입니다.')
      }
    })
  }

  return(
      <div>
        <center>
          <h1>Sign In</h1>
          <form onSubmit={(e) => e.preventDefault()}>
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
            <button className='btn btn-login' type='submit' onClick={handleLogin}>
              login
            </button>
            <div>
              <Link to='/Signup'>아직 아이디가 없으신가요?</Link> 
            </div>
          </form>
        </center>
      </div>
  )
} 



export default  withRouter(Login);
