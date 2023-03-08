import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FcSearch } from 'react-icons/fc';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const hendelChenge = event => {
    setSearchValue(event.target.value.trim());
  };

  const handelSubmit = event => {
    event.preventDefault();

    if (!searchValue) {
      toast.error('Enter the query!');
      return;
    }

    onSearch(searchValue);
    setSearchValue('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handelSubmit}>
        <button type="submit" className="SearchForm-button">
          <FcSearch size="34px" />
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={hendelChenge}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
