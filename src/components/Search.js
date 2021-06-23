import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMessageModal } from '../actions/index';

const Search = ({ handleButtonClick }) => {
  const dispatch = useDispatch();
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
      dispatch(setMessageModal(true, '검색어를 입력해주세요.'))
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
        placeholder="사진 검색"
      />
      <button className="search-btn" onClick={getSearchResult} >
        <img src="https://img.icons8.com/ios-filled/50/000000/search--v1.png" alt="search-icon" />
      </button>
    </React.Fragment>
  );
}

export default Search;