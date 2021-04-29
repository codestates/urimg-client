import React,{useState} from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

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
            <div>
              <input type='text' placeholder='email' onChange={(e)=>setEmail(e.target.value)}></input>
            </div>
            <div>
              <input type='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)}></input>
            </div>
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
