import React from 'react';
import ImageUpload from './ImageUpload';

const Modal = ({ isOpen, close, handleFileChange, uploadImage, imageUrl }) => {
  return (
    <React.Fragment>
      { isOpen
        ? (
        <div className="modal">
          <div className="modal-overlay" onClick={close} />
          <div className="modal-box">
          <div>
          <img className="close-icon" src="close-icon.png" onClick={close} alt=""/>
          </div>
            <div className="modal-content">
              <ImageUpload
                handleFileChange={handleFileChange}
                uploadImage={uploadImage}
                imageUrl={imageUrl}
              />
            </div>
          </div>
        </div>
        ) : (
        null
      )}
    </React.Fragment>
  );
}

export default Modal;