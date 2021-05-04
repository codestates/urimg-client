import React, { useState } from 'react';

const Search = ({ handleButtonClick }) => {
  const [ queryString, setQueryString ] = useState('');

  const changeQueryString = (e) => {
    setQueryString(e.target.value);
  }

  const checkKeycode = (e) => {
    if (e.keyCode === 13) {
      getSearchResult();
    }
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
    <React.Fragment>
      <input
        className="search-input"
        type="text"
        value={queryString}
        onChange={changeQueryString}
        onKeyDown={checkKeycode}
        placeholder="Search image"
      />
      <button className="search-btn" onClick={getSearchResult} >
        <img src="https://img.icons8.com/ios-filled/50/000000/search--v1.png" alt="search-icon" />
      </button>
    </React.Fragment>
  );
}

export default Search;