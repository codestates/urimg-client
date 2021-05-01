import React,{useState} from "react";
import { withRouter, Link, useHistory } from "react-router-dom";
import axios from "axios";
import InputContainer from '../components/InputContainer';
import dotenv from 'dotenv';

dotenv.config()

axios.defaults.withCredentials = true;

const Signup = ()=>{
    const history = useHistory(); //  히스토리
    const[email,setEmail] = useState('')
    const[userName,setUserName] = useState('')
    const[password,setPassword] = useState('')
    const[passwordConfirm,setPasswordConfirm] = useState('')
    const[isPasswordSame,setIsPasswordSame] = useState(true)  // 비밀번호 재확인
    const[isValidEmail,setIsValidEmail] = useState(true)      // 이메일 유효성
    const[isValidPassword,setIsValidPassword] = useState(true)  // 비밀번호 유효성
    const[errorMessage, setErrorMessage] = useState('')

    const handleSignup = ()=>{
       
        axios.post(process.env.REACT_APP_API_URL+'/user/signup',{ // ec2 엔드포인드주소 
            password,
            user_name: userName,
            email
          },{
            'Content-Type': 'application/json'             
          })
          .then(resp=>{
            console.log('가입완료');
            history.push('/')
          })
          .catch((err)=>{    // 중복일때 아직 안만듬
            if(err.status===409){
              setErrorMessage('중복된 이메일 입니다.')
            }
          })
    }
  

    function emailChecker(email){     //이메일 양식 유효성
        const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
        const valid = emailRegex.test(email)
        setIsValidEmail(valid)
        if(!valid){
          setErrorMessage('이메일 주소를 다시 확인해주세요.')
        }
        else{
          setErrorMessage('')
        }
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
      <div>
        <center>
          <h1>Sign Up</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <InputContainer 
              type={'text'} 
              placeholder={'email'} 
              handler={setEmail} 
              validChecker={emailChecker} 
              isValid={isValidEmail}
            />
            <InputContainer 
              type={'text'} 
              placeholder={'username'} 
              handler={setUserName}
            />
            <InputContainer 
              type={'password'} 
              placeholder={'password'} 
              handler={setPassword} 
              validChecker={passwordChecker} 
              isValid={isValidPassword}
            />
            <InputContainer 
              type={'password'} 
              placeholder={'password agian'} 
              handler={setPasswordConfirm} 
              validChecker={samePasswordChecker} 
              isValid={isPasswordSame}
            />

            <button
              className="btn btn-signup"
              type='submit'
              onClick={handleSignup}
            >
              회원가입
            </button>
            <div>
              <Link to='Login'>이미 아이디가 있으신가요?</Link>
            </div>
            {
              errorMessage.length>0 ?(
                <span>{errorMessage}</span>
              ):(
                <span></span>
              )
            }
          </form>
        </center>
      </div>
    )
}



export default  withRouter(Signup)