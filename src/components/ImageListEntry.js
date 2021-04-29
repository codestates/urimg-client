import React from 'react';

const ImageListEntry = ({ image }) => {
  console.log(image);
  return (
    <div className="image-list-entry">
      <img className="image" src={image.url} alt=""/>
    </div>
  );
}

export default ImageListEntry;