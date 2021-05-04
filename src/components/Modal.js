import React from 'react';
import { useDispatch } from 'react-redux';
import { setMessageModal } from '../actions/index';

const Modal = ({ isOpen, content }) => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(setMessageModal(false, ''));
  }
  return (
    <React.Fragment>
      { isOpen
        ? (
        <div className="modal">
          <div className="modal-overlay" onClick={closeModal} />
          <div className="modal-box">
            <div>
              <img className="close-icon" src="close-icon.png" onClick={closeModal} alt=""/>
            </div>
            <div className="modal-content">
              {content}
            </div>
            <button onClick={closeModal}>확인</button>
          </div>
        </div>
        ) : (
        null
      )}
    </React.Fragment>
  );
}

export default Modal;