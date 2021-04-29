import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

import { imagesData } from "../fakeData/images";
import ImageList from "../components/ImageList"
import Nav from "../components/Nav";

const Main = () => {
  const [images, setImages] = useState(imagesData);

  const getSearchImageList = (query) => {
    /*
    search 컴포넌트에서 받은 query로 서버에 서치 요청 => 리스트 받은 후 setImages 예정
    아래는 기능 체크를 위해 하드코딩된 데이터에서 검색한 후
    이미지 리스트를 변경하는 코드를 임시로 작성한 것입니다
    */
    setImages(
      images.filter(image => image.alt_description.includes(query))
    );
  }

  return (
    <div className="App">
      <Nav handleButtonClick={getSearchImageList}/>
      <ImageList images={images}/>
    </div>
  )
}

export default withRouter(Main);