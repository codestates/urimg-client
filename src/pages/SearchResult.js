import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import ImageList from '../components/ImageList';

const SearchResult = ({ searchImages, searchKeyword, redirectToImage }) => {
  if (searchImages === null) {
    return <Redirect to='/main' />
  }

  return (
    <div className="search-result-box">
      <div className="search-headder">{searchKeyword}</div>
      <div className="search-result">
        { searchImages.length === 0 ? (
          <div>
          검색 결과가 없습니다.
          </div>
        ) : (
          <div>
          검색 결과 {searchImages.length}건
          </div>
        )}
      </div>
      <ImageList images={searchImages} redirectToImage={redirectToImage}/>
    </div>
  )
}

export default withRouter(SearchResult);