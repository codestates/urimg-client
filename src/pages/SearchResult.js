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
          <div className="no-serch-result">
            <div>
              검색 결과 0건
            </div>
            <div className="square-face-box">
            <div className="square-face-box-small">
              <img className="square-face"
                src="sad-rounded-square-emoticon-200.png" alt="" />
              </div>
            </div>
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