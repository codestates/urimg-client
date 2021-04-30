import React from "react";
import { withRouter } from "react-router-dom";

import ImageList from "../components/ImageList";

const Main = ({ images }) => {
  return (
    <div className="App">
        <ImageList images={images}/>
    </div>
  )
}

export default withRouter(Main);