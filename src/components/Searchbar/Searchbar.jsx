import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import s from './Searchbar.module.css';
import { FaSearch } from 'react-icons/fa';

export default class SearchForm extends Component {
  state = {
    imageCard: [],
    searchName: '',
  };

  handleNameSearch = e => {
    this.setState({ searchName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchName.trim() === '') {
      return toast.error('Enter a search query');
    }

    this.props.onSubmit(this.state.searchName);
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <Toaster />
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button className={s.SearchFormButton} type="submit">
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>
          <FaSearch className={s.svg} />

          <input
            className={s.SearchFormInput}
            name="searchName"
            value={this.state.searchName}
            onChange={this.handleNameSearch}
            type="text"
            autoFocus
            autoComplete="off"
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
