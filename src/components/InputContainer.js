import React,{useEffect, useState} from "react";

const InputContainer = ({type, placeholder, handler, isValid=true})=>{
    
    return(
        <div className='input-box'>
            <input
            type={type}
            placeholder={placeholder}
            onChange={(e)=>handler(e.target.value)}
            ></input>
            {
                isValid?(
                    <span></span>
                ):(
                    <span>x</span>
                )
            }
        </div>
    )
}

export default InputContainer