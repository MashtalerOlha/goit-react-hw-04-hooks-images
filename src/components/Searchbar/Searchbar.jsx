import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import s from './Searchbar.module.css';
import { FaSearch } from 'react-icons/fa';

export const SearchForm = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const handleNameSearch = e => {
    setSearchName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchName.trim() === '') {
      return toast.error('Enter a search query');
    }

    onSubmit(searchName);
    setSearchName('');
  };

  return (
    <header className={s.Searchbar}>
      <Toaster />
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button className={s.SearchFormButton} type="submit">
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>
        <FaSearch className={s.svg} />

        <input
          className={s.SearchFormInput}
          name="searchName"
          value={searchName}
          onChange={handleNameSearch}
          type="text"
          autoFocus
          autoComplete="off"
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
