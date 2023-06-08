import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { ModalBackdrop, ModalContent } from './Modal.styled';

// Modal window (componentDidMount and componentWillUnmount)
// Problem with z-index, how to solve without bad code (portals)
// listener to keydown for Escape
// Listener on click to backdrop

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ handleCloseModal, children }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleCloseModal]);

  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      handleCloseModal();
    }
  };

  return createPortal(
    <ModalBackdrop onClick={handleBackdropClick}>
      <ModalContent>{children}</ModalContent>
    </ModalBackdrop>,
    modalRoot
  );
};

Modal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
};
