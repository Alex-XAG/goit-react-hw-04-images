import React from 'react';
import PropTypes, { shape } from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageList } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  const showGallery = images.length !== 0;

  if (showGallery) {
    return (
      <>
        <ImageList>
          {images.map(image => (
            <ImageGalleryItem key={image.id} image={image} />
          ))}
        </ImageList>
      </>
    );
  }
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(shape(PropTypes.object.isRequired)),
};
