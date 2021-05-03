import React from "react";
import React,{useState} from "react"


const CreateComment = ()=>{
    const[comment,setCommnet] = useState('')
    return(
        <div className='comment'>
        <form>
          <textarea
          placeholder='댓글쓰기'
          onChange={(e)=>setCommnet(e.target.value)}
          />
          <button type='submit'>
            <span>등록</span>
          </button>
        </form>
      </div>
    )
}

export default CreateComment