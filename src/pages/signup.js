import React,{useEffect, useState} from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import InputContainer from '../components/InputContainer'

axios.defaults.withCredentials = true;

const Signup = ()=>{

    const[email,setEmail] = useState('')
    const[userName,setUserName] = useState('')
    const[password,setPassword] = useState('')
    const[passwordConfrim,setPasswordConfirm] = useState('')
    const[isPasswordSame,setIsPasswordSame] = useState(true)  // 비밀번호 재확인
    const[isValidEmail,setIsValidEmail] = useState(true)  // 비밀번호 재확인
    const[isValidPassword,setIsValidPassword] = useState(true)  // 비밀번호 재확인

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

    // useEffect((email,password)=>{   
    //     setIsValidEmail(emailChecker(email)) 
    //     setIsValidPassword(passwordChecker(password))
    // })

    function emailChecker(email){     //이메일 양식 유효성
        const passwordRegex = /^0-9a-zA-Z@0-9a-zA-Z\.[a-zA-Z]{2,3}$/i;
        return passwordRegex.test(email)
    }
    function passwordChecker(password){            // 비밀번호 알파벳 숫자 포함 6자 이상
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
        return passwordRegex.test(password)
    }
    function samePasswordChecker(){
        return password===passwordConfrim
    }


    return(
      <div>
        <center>
          <h1>Sign Up</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <InputContainer type={'text'} placeholder={'email'} handler={setEmail} isValid={isValidEmail}/>
            <InputContainer type={'text'} placeholder={'username'} handler={setUserName}/>
            <InputContainer type={'password'} placeholder={'password'} handler={setPassword} isValid={isValidPassword}/>
            <InputContainer type={'password'} placeholder={'password agian'} handler={setPasswordConfirm}/>
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