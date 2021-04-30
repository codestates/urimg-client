import React,{useState} from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import InputContainer from '../components/InputContainer'
axios.defaults.withCredentials = true;

const Login = (props)=>{
  const[email,setEmail] = useState('email')
  const[password,setPassword] = useState('password')

  const handleLogin = ()=>{
    console.log(email, password)
  }

  return(
      <div>
        <center>
          <h1>Sign In</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <InputContainer type={'text'} placeholder={'email'} handler={setEmail} />
            <InputContainer type={'password'} placeholder={'password'} handler={setPassword} />
            <div>
              {/* <Link to='/signup'>아직 아이디가 없으신가요?</Link> */} 
            </div>
            <button className='btn btn-login' type='submit' onClick={handleLogin}>
              login
            </button>
          </form>
        </center>
      </div>
  )
} 



export default Login;
