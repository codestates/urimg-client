import React,{useEffect, useState} from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

const Signup = ()=>{

    const[email,setEmail] = useState('')
    const[userName,setUserName] = useState('')
    const[password,setPassword] = useState('')
    const[passwordConfrim,setPasswordConfirm] = useState('')
    const[isPasswordSame,setIsPasswordSame] = useState(true)  // 비밀번호 재확인

    const handleSignup = ()=>{

        axios.post('https://localhost:4000/signup',{ // ec2 엔드포인드주소 
            password,
            user_name: userName,
            email
          },{
            'Content-Type': 'application/json'             
          })
          .then(resp=>{
            console.log('가입완료');
          })
          .catch((err)=>{    // 중복일때 아직 안만듬
            console.log(err.status)
          })
    }

    useEffect(()=>{   
        if(password!==passwordConfrim){
            setIsPasswordSame(false)
        }
        else{
            setIsPasswordSame(true)
        }
    })

    function isValidEmail(email){     //이메일 양식 유효성
        const passwordRegex = /^0-9a-zA-Z@0-9a-zA-Z\.[a-zA-Z]{2,3}$/i;
        return passwordRegex.test(email)
    }
    function isValidPassword(password){            // 비밀번호 알파벳 숫자 포함 6자 이상
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
        return passwordRegex.test(password)
    }


    return(
      <div>
        <center>
          <h1>Sign Up</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <input
                type="text"
                placeholder="email"
                onChange={(e)=>setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <input
                type="text"
                placeholder="username"
                onChange={(e)=>setUserName(e.target.value)}
              ></input>
            </div>
            <div>
              <input
                type='password'
                placeholder="password"
                onChange={(e)=>setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <input 
                type='password'
                placeholder="password again"
                onChange={(e)=>{
                    setPasswordConfirm(e.target.value)
                }}
              ></input>
                {
                    isPasswordSame ?(
                        <span></span>
                    ):(
                       <span>x</span> 
                    )
                }
            </div>
            <div>
              {/* <Link to='/login'>이미 아이디가 있으신가요?</Link> */}
            </div>
            <button
              className="btn btn-signup"
              type='submit'
              onClick={handleSignup}
            >
              회원가입
            </button>
          </form>
        </center>
      </div>
    )
}



export default Signup