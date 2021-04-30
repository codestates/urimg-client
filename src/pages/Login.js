import React,{useState} from "react";
import { Link, withRouter,useHistory } from "react-router-dom";
import axios from "axios";
import InputContainer from '../components/InputContainer'
axios.defaults.withCredentials = true;

const Login = (props)=>{
  const history = useHistory(); //  히스토리
  const[email,setEmail] = useState('email')
  const[password,setPassword] = useState('password')
  const[errorMessage,setErrorMessage] = useState('')

  const[isLogin,setIsLogin] = useState('false')   // 로그인 상태관리는 나중에 app.js 에서
  const[accessToken,setAccessToken] = useState('') // 로그인 상태관리는 나중에 app.js 에서

  const handleLogin = ()=>{
    axios.post(process.env.REACT_APP_API_URL+'/user/login',{ // ec2 엔드포인드주소 
      password,
      email
    },{
      'Content-Type': 'application/json'             
    })
    .then(resp=>{
      setIsLogin(true)                          // app.js 에서 로그인 핸들러 만들어서 상태 올려야함
      setAccessToken(resp.data.access_token)
      history.push('/')
    })
    .catch((err)=>{    // 중복일때 아직 안만듬
      if(err.status===401){
        setErrorMessage('강비 하지 않은 이메일 이거나 잘못된 비밀번호 입니다.')
      }
    })
  }

  return(
      <div>
        <center>
          <h1>Sign In</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <InputContainer type={'text'} placeholder={'email'} handler={setEmail} />
            <InputContainer type={'password'} placeholder={'password'} handler={setPassword} />
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
