import React from 'react';
import ImageListEntry from './ImageListEntry';

const ImageList = ({ images }) => {
  return (
    <div className="image-list">
    { images.map(image =>
    <ImageListEntry image={image} key={image.id}/>
    )
    }
    </div>
  )
}

export default ImageList;