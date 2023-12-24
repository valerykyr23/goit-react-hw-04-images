import  { useState } from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import Notiflix from 'notiflix';

import { Header, Form, Input } from './Searchbar.styled';
import { Button } from 'components/Button/Button';
import { notifySettings } from '../fetch';

export const Searchbar = ({ onSubmit }) => {
  
  // state = {
  //   query: '',
  // };

  const [query, setQuery] = useState('');

  const onInputChange = event => {
    // const query = event.currentTarget.value;
    // this.setState({ query: query });
    setQuery(event.currentTarget.value);
  };

  const handleSubmit = event => {

    event.preventDefault();

    if (query.trim() === '') {
      return Notiflix.Notify.warning(
        'Please enter key words for search.',
        notifySettings
      );
    }
    // this.props.onSubmit(this.state);
    // this.setState({ query: '' });
    onSubmit({query});
    setQuery('');
  };

  
    return (
      <Header>
        <Form onSubmit={handleSubmit}>
          <Button type="submit" icon={BsSearch} text="Search" status="search" />
          <Input
            value={query}
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            required
            placeholder="Search images and photos"
            onChange={onInputChange}
          />
        </Form>
      </Header>
    );
  }


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};