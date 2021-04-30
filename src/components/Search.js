import React, { useState } from 'react';

const Search = ({ handleButtonClick }) => {
  const [ queryString, setQueryString ] = useState('');

  const changeQueryString = (e) => {
    setQueryString(e.target.value);
  }

  const getSearchResult = () => {
    if (queryString === '') {
      // 검색어 없이 검색 버튼 누르는 경우
      // 추후 모달 컴포넌트 활용해 알림메세지 추가
      return;
    }
    handleButtonClick(queryString);
    setQueryString('');
  }

  return (
    <div className="search-bar">
      <input className="search-input" type="text" value={queryString} onChange={changeQueryString}/>
      <button className="search-btn" onClick={getSearchResult}>
        검색
      </button>
    </div>
  );
}

export default Search;