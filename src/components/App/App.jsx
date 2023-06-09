import { useState, useEffect } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { ButtonLoadMore } from '../ButtonLoadMore/ButtonLoadMore';
import { fetchImages } from '../api/FetchImage';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchBar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { AppStyle } from './App.styled';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [showBtn, setShowBtn] = useState(false);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setStatus('pending');
    try {
      fetchImages(searchQuery, page).then(images => {
        if (!images.hits.length) {
          setStatus('rejected');
          return;
        }
        setImages(prevImages =>
          page !== 1 ? [...prevImages, ...images.hits] : [...images.hits]
        );

        setShowBtn(
          images.hits.length !== 0 && page < Math.ceil(images.total / 12)
        );
        setStatus('resolved');
      });
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_LEFT,
      });
      return;
    }
  }, [searchQuery, page]);

  const handleSubmitQuery = query => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
  };

  const handleLoadMoreBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <AppStyle
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <SearchBar onSubmit={handleSubmitQuery} />

      <ImageGallery status={status} images={images} />
      {status === 'idle' && <h2>Insert query!!!</h2>}

      {showBtn && (
        <ButtonLoadMore status={status} onClick={handleLoadMoreBtn} />
      )}
      {status === 'pending' && <InfinitySpin width="300" color="#4fa94d" />}
      {status === 'rejected' && (
        <h3>Your query did't give any results, please, try other request!!!</h3>
      )}

      <ToastContainer />
    </AppStyle>
  );
};
