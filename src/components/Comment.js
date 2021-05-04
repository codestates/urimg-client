import React from "react";

const Comment = ({userName, date, comment})=>{

    const timeForToday = (date) => {
        const today = new Date();
        const timeValue = new Date(date);

        const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
        if (betweenTime < 1) return '방금전';
        if (betweenTime < 60) {
            return `${betweenTime}분전`;
        }
        const betweenTimeHour = Math.floor(betweenTime / 60);
        if (betweenTimeHour < 24) {
            return `${betweenTimeHour}시간전`;
        }
        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay < 365) {
            return `${betweenTimeDay}일전`;
        }
        return `${Math.floor(betweenTimeDay / 365)}년전`;
    }
    
    return(
        <div className='comment'>
            <div className='comment-userinfo'>
                <span>{userName}</span>
                <span>{timeForToday(date)}</span>
            </div>
            <div className='comment-content'>
                <span>{comment}</span>
            </div>
        </div>
    )
}

export default Comment