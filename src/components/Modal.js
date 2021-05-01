import React from 'react';

const Modal = ({ isOpen, close, content }) => {
  console.log('모달 랜더')
  return (
    <React.Fragment>
      { isOpen
        ? (
        <div className="modal">
          <div className="modal-overlay" onClick={close} />
          <div className="modal-box">
            <div className="modal-content">
              {content}
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