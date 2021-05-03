import React from "react";
import { withRouter } from "react-router-dom";

import ImageList from "../components/ImageList";

const Main = ({ images, redirectToImage }) => {
  return (
    <div className="Main">
        <ImageList images={images} redirectToImage={redirectToImage}/>
    </div>
  )
}

export default withRouter(Main);