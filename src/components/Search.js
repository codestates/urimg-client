import React, { useState } from 'react';

const Search = ({ handleButtonClick }) => {
  const [ queryString, setQueryString ] = useState(null);

  const changeQueryString = (e) => {
    setQueryString(e.target.value);
  }

  return (
    <div className="search-bar">
      <input className="search-input" onChange={changeQueryString} type="text" />
      <button className="search-btn" onClick={() => handleButtonClick(queryString)}>
        검색
      </button>
    </div>
  );
}

export default Search;