import React from 'react';

const Modal = ({ isOpen, close, content }) => {
  return (
    <React.Fragment>
      { isOpen
        ? (
        <React.Fragment>
          <div className="modal-overlay" onClick={close} />
          <div className="modal">
            <div className="content">
              {content}
            </div>
          </div>
        </React.Fragment>
        ) : (
        null
      )}
    </React.Fragment>
  );
}

export default Modal;