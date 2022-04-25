import { api } from '../Api/Api';
import { useState, useEffect } from 'react';
import { SearchForm } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Spiner } from '../Loader/Loader';
import { LoadMore } from '../Button/Button';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [imageCard, setImageCard] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');

  const loadMorePhoto = () => {
    setPage(page => page + 1);
  };

  const handleFormSubmit = searchQuery => {
    setImageCard([]);
    setSearchQuery(searchQuery);
    setPage(1);
  };

  const simpleLightbox = () => {
    var lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
    });
    lightbox.refresh();
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setStatus('pending');

    api
      .fetchImage(searchQuery, page)
      .then(imageCard => {
        setImageCard(images => [...images, ...imageCard.hits]);

        setStatus('resolved');
        simpleLightbox();
      })
      .catch(error => setStatus('rejected'));
  }, [page, searchQuery]);

  if (status === 'idle') {
    return <SearchForm onSubmit={handleFormSubmit} />;
  }

  if (status === 'pending') {
    return <Spiner />;
  }

  if (status === 'resolved') {
    return (
      <>
        <SearchForm onSubmit={handleFormSubmit} />
        <ImageGallery imageCard={imageCard} />
        <LoadMore onClick={loadMorePhoto} />
      </>
    );
  }

  if (status === 'rejected') {
    return;
  }
};
