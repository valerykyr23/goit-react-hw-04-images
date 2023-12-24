import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import propTypes from 'prop-types';

import {
  ModalOverlay,
  ModalWindow,
  ModalPic,
  ModalDescr,
} from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({closeModal, src, alt}) => {

// const  onEscPress = e => {
//     if (e.code === 'Escape') {
//       closeModal();
//     }
//   };

  
    
    useEffect(() => {
    const onEscPress = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', onEscPress);

    return () => {
      window.removeEventListener('keydown', onEscPress);
    };
  }, [closeModal]);

  
  
  
  // componentDidMount() {
  //   window.addEventListener('keydown', this.onEscPress);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.onEscPress);
  // }

 

  const onkBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

 
    return createPortal(
      <ModalOverlay onClick={onkBackdropClick}>
        <ModalWindow>
          <ModalPic src={src} alt={alt} />
          <ModalDescr>{alt}</ModalDescr>
        </ModalWindow>
      </ModalOverlay>,
      modalRoot
    );
  }


Modal.propTypes = {
  src: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
  closeModal: propTypes.func.isRequired,
};