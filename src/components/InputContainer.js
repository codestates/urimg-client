import React from "react";

const InputContainer = ({type, placeholder, handler, validChecker=()=>{}, isValid=true})=>{
    
    return(
        <div className='input-box-area'>
            <input
            className='input-box'
            type={type}
            placeholder={placeholder}
            onChange={(e)=>handler(e.target.value)}
            onBlur={(e)=>validChecker(e.target.value)}
            ></input>
            <div className='error-img-area'>
            {
                isValid?(
                    <span className='error-img'></span>
                ):(
                    <span className='error-img'>x</span>
                )
            }
            </div>
        </div>
    )
}

export default InputContainer