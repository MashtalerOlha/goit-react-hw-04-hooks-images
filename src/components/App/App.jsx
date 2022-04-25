import { api } from '../Api/Api';
import React, { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Spiner } from '../Loader/Loader';
import { LoadMore } from '../Button/Button';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export class App extends Component {
  state = {
    searchQuery: '',
    imageCard: [],
    page: 1,
    status: 'idle',
  };

  LoadMorePhoto = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1 });
  };

  simpleLightbox = () => {
    var lightbox = new SimpleLightbox('.gallery a', {
      captionsData: "alt",
    });
    lightbox.refresh();
  };

  componentDidUpdate(_, prevState) {
    this.simpleLightbox();
    const { page, searchQuery } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      this.setState({ imageCard: [] });
    }

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: 'pending' });
      api
        .fetchImage(searchQuery, page)
        .then(imageCard => {
          this.setState(prevState => ({
            imageCard: [...prevState.imageCard, ...imageCard.hits],
            status: 'resolved',
          }));
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    // if(this.state.status === 'resolve' || nextName.length ===0 ){
    //   console.log('not found')
    // }
  }

  render() {
    const { status, imageCard } = this.state;

    if (status === 'idle') {
      return <Searchbar onSubmit={this.handleFormSubmit} />;
    }

    if (status === 'pending') {
      return <Spiner />;
    }

    if (status === 'resolved') {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery imageCard={imageCard} />
          <LoadMore onClick={this.LoadMorePhoto} />
        </>
      );
    }

    if (status === 'rejected') {
      return;
    }
  }
}
