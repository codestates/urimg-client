import React, { useState } from 'react';

const ImageUpload = ({ handleFileChange, uploadImage, imageUrl }) => {
  const [ queryString, setQueryString ] = useState('');
  const changeQueryString = (e) => {
    setQueryString(e.target.value);
  }

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
      <input
        className="image-description"
        type="text"
        value={queryString}
        onChange={changeQueryString}
        placeholder="사진에 대해 설명해주세요"
      />
      <div>
        <button className="input-submit-btn" onClick={() => {uploadImage(queryString)}}>Submit</button>
      </div>
    </React.Fragment>
  )
}

export default ImageUpload;