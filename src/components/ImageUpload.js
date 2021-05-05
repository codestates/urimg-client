import React, { useState } from 'react';

const ImageUpload = ({ handleFileChange, uploadImage, imageUrl }) => {
  const [ queryString, setQueryString ] = useState('');
  const changeQueryString = (e) => {
    setQueryString(e.target.value);
  }

  return (
    <React.Fragment>
      <input
        className="image-description"
        type="text"
        value={queryString}
        onChange={changeQueryString}
        placeholder="사진에 대해 설명해주세요"
      />
      { imageUrl === '' ? (
        <React.Fragment>
          <label className="upload-area">
            <input
            id="input-file"
            type="file"
            accept='image/jpg, image/png, image/jpeg'
            onChange={handleFileChange}
            />
            <span>클릭해서 사진 업로드</span>
          </label>
        </React.Fragment>
      ) : (
        <div className="upload-area">
          <img className='image-preview' src={imageUrl} alt="" />
        </div>

      )}
      
      <div>
        <button className="btn input-submit" onClick={() => {uploadImage(queryString)}}>업로드</button>
      </div>
    </React.Fragment>
  )
}

export default ImageUpload;