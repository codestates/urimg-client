import React from 'react';

const LoadingIndicator = ({ isLoading }) => {
  return (
    <React.Fragment>
    { isLoading ? (
    <div className="lds-container">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="lds-text">잠시만 기다려주세요...</div>
      <div className="lds-overlay"></div>
    </div>
    ) : null
    }
    </React.Fragment>
)};

export default LoadingIndicator;