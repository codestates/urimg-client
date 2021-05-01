import React from 'react';

const ImageUpload = ({ handleFileChange, uploadImage, imageUrl }) => {
  return (
    <React.Fragment>
      { imageUrl === '' ? (
        <React.Fragment>
          <label className="upload-area">
            <input
            id="input-file"
            type="file"
            accept='image/jpg, impge/png, image/jpeg'
            onChange={handleFileChange}
            />
            <span>upload image</span>
          </label>
        </React.Fragment>
      ) : (
        <img className='image-preview' src={imageUrl} alt="" />
      )}
      <div>
        <button className="input-submit-btn" onClick={() => {uploadImage()}}>Submit</button>
      </div>
    </React.Fragment>
  )
}

export default ImageUpload;