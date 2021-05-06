import React from 'react';
import ImageListEntry from './ImageListEntry';

const ImageList = ({ images, redirectToImage }) => {
  return (
    <div className="image-list">
    { images.map(image =>
    <ImageListEntry image={image} redirectToImage={redirectToImage} key={image.id}/>
    )}
    </div>
  )
}

export default ImageList;