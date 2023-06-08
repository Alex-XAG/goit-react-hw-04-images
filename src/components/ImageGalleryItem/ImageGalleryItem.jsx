import { useState } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'components/Modal/Modal';
import { GalleryItem, GalleryLargeImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <GalleryItem className="gallery-item">
      <img
        src={image.webformatURL}
        alt={image.tags}
        width="380"
        height="240"
        onClick={toggleModal}
      />
      {showModal && (
        <Modal handleCloseModal={toggleModal}>
          <GalleryLargeImage src={image.largeImageURL} alt={image.tags} />
        </Modal>
      )}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};
