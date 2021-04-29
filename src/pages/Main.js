import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

import { imagesData } from "../fakeData/images";
import ImageList from "../components/ImageList"

const Main = () => {
  console.log(imagesData)
  const [images, setImages] = useState(imagesData);

  return (
    <div className="App">
      <ImageList images={images}/>
    </div>
  )
}

export default withRouter(Main);