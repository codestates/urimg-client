import ImageList from '../components/ImageList';

const SearchResult = ({ searchImages }) => {
  if (searchImages.length === 0) {
    return (
      <span>
        검색 결과가 없습니다.
      </span>
    )
  }

  return (
    <div className="search-result">
      <span>
        검색 결과 {searchImages.length}건
      </span>
      <ImageList images={searchImages}/>
    </div>
  )
}

export default SearchResult