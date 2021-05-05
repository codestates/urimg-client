import React from "react";
import Comment from '../components/Comment';

import mockComments from '../fakeData/comments';

const CommentList = ({ comments })=>{
  if (comments.length === 0) {
    comments = mockComments;
  }
  
  return(
    <div className="comment-list">
    {
      comments.map((comment, i)=>{
        return (
          <Comment 
            key={i} 
            userName={comment.user_name} 
            date={comment.created_at} 
            comment={comment.comment}
          />
        )}
      )}
    </div>
  )
}

export default CommentList;