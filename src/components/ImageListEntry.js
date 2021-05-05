import React from 'react';

const ImageListEntry = ({ image, redirectToImage }) => {
  if (!image.user.profile_image) {
    image.user.profile_image = "default-profile-picture_150.jpg"
  }
  return (
    <div className="image-list-entry" onClick={() => redirectToImage(image)}>
      <div className="image-list-overlay-area">
        <div
          className="image-list-entry-profile"
          style={{ backgroundImage: `url(${image.user.profile_image})` }}>
        </div>
        <div className="image-list-entry-detail">
          <div className="image-list-entry-description">
            {image.description}
          </div>
          <div className="image-list-entry-username">
            {image.user.user_name}
          </div>
        </div>
      </div>
      <img className="image" src={image.image} alt=""/>
    </div>
  );
}

export default ImageListEntry;