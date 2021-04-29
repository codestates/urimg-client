import React, { useState } from 'react';

const Search = ({ handleButtonClick }) => {
  const [ queryString, setQueryString ] = useState("");

  const changeQueryString = (e) => {
    setQueryString(e.target.value);
  }

  const getSearchResult = () => {
    handleButtonClick(queryString);
    setQueryString("");
  }

  return (
    <div className="search-bar">
      <input className="search-input" onChange={changeQueryString} type="text" value={queryString}/>
      <button className="search-btn" onClick={getSearchResult}>
        검색
      </button>
    </div>
  );
}

export default Search;