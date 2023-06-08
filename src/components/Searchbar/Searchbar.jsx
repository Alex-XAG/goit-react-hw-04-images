import { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';
import {
  SearchFormButton,
  SearchFormInput,
  SearchForm,
  SearchBarHeader,
} from './SearchBar.styled';

export const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInput = ({ target }) => {
    setSearchQuery(target.value);
  };

  const handleSubmitQuery = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      toast.error('Input search query please!!!', {
        position: toast.POSITION.TOP_LEFT,
      });
      return;
    }

    onSubmit(searchQuery);
    reset();
  };
  const reset = () => {
    setSearchQuery('');
  };

  return (
    <SearchBarHeader>
      <SearchForm onSubmit={handleSubmitQuery}>
        <SearchFormButton type="submit">
          <AiOutlineSearch />
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleInput}
        />
      </SearchForm>
    </SearchBarHeader>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
