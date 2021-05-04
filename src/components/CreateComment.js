import React,{useState} from "react";

const CreateComment = ({handleComment})=>{              
    const[comment,setCommnet] = useState('')

    return(
        <div className='comment'>
        <form>
          <textarea
            placeholder='댓글쓰기'
            onChange={(e)=>setCommnet(e.target.value)}
          />
          <button 
            type='submit'
            onClick={()=>{handleComment(comment)}}            //상세페이지에서 포스트요청 함수 내려받아야함
          >
            <span>등록</span>
          </button>
        </form>
      </div>
    )
}

export default CreateComment