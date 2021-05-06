import React, { useState } from "react";

const CreateComment = ({ handleComment })=>{
  const [ comment, setCommnet ] = useState('');
  const sendComment = () => {
    handleComment(comment);
    setCommnet('');
  }
  return(
    <div className='comment-input-area'>
    <textarea
      className="comment-input"
      placeholder='댓글 쓰기'
      onChange={(e) => setCommnet(e.target.value)}
      value={comment}
    />
    <div>
      <button
        className="btn comment-submit"
        onClick={sendComment}>
        등록
      </button>
      </div>
    </div>
  )
}

export default CreateComment