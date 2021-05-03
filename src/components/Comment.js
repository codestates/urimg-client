import React from "react";

const Comment = ({userName, date, content})=>{
    
    return(
        <div className='comment'>
            <div className='comment-userinfo'>
                <span>{userName}</span>
                <span>{date}</span>
            </div>
            <div className='comment-content'>
                <span>{content}</span>
            </div>
        </div>
    )
}

export default Comment