import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { ModaBackdrop, ModaContent } from './Modal.styled';

// Modal window (componentDidMount and componentWillUnmount)
// Problem with z-index, how to solve without bad code (portals)
// listener to keydown for Escape
// Listener on click to backdrop

const modalRoot = document.querySelector('#modal-root');

export class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = e => {
    if (e.code === 'Escape') {
      this.props.handleCloseModal();
    }
  };

  handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.handleCloseModal();
    }
  };

  render() {
    return createPortal(
      <ModaBackdrop onClick={this.handleBackdropClick}>
        <ModaContent>{this.props.children}</ModaContent>
      </ModaBackdrop>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
};
