import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setSearchImages, setSearchKeyword, setSingleImage } from '../actions/index';

import ImageList from "../components/ImageList";

const Main = ({ images, redirectToImage, setDefaultColor }) => {
  const dispatch = useDispatch();

  const clearState = () => {
    dispatch(setSearchImages([]));
    dispatch(setSearchKeyword(''));
    dispatch(setSingleImage({}));
    setDefaultColor();
  }

  useEffect(() => clearState(), [])

  return (
    <div className="Main">
        <ImageList images={images} redirectToImage={redirectToImage}/>
    </div>
  )
}

export default withRouter(Main);