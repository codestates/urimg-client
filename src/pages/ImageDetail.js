import React from "react";
import axios from "axios";

const ImageDetail = ({ image }) => {
    return (
      <div className="image-detail">
        <div className="username">{image.user.username}</div>
        <img className="image" src={image.url} alt={image.alt_description} />
      </div>
    );
  }
  
  export default ImageDetail;