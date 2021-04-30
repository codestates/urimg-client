import React,{useEffect, useState} from "react";

const InputContainer = ({type, placeholder, handler, validChecker=()=>{}, isValid=true})=>{
    
    return(
        <div className='input-box'>
            <input
            type={type}
            placeholder={placeholder}
            onChange={(e)=>handler(e.target.value)}
            onBlur={(e)=>validChecker(e.target.value)}
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