import React from "react";
import Comment from '../components/Comment';

const CommentList = ({ comments })=>{
  return(
    <div className="comment-list">
    {
      comments.map((comment, i)=>{
        return (
          <Comment 
            key={i} 
            userName={comment.user_name} 
            date={comment.createdAt} 
            comment={comment.comment}
          />
        )}
      )}
    </div>
  )
}

export default CommentList;