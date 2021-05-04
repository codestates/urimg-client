import React from 'react';

const ImageListEntry = ({ image, redirectToImage }) => {
  return (
    <div className="image-list-entry" onClick={() => redirectToImage(image)}>
      <img className="image" src={image.url} alt=""/>
    </div>
  );
}

export default ImageListEntry;