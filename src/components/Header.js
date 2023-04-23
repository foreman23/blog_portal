import { React, useState } from 'react';
import { Button, Search, Icon } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

import blogData from './BlogData';

export const Header = () => {

  // Init navigate
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Upon user text input
  function handleSearchChange(event, { value }) {
    setQuery(value);

    const filteredResults = blogData.filter((option) =>
      option.title.toLowerCase().includes(value.toLowerCase())
    )
    .map((option) => ({ title: option.title, image: option.image, id: option.id }));
    setResults(filteredResults);
  }

  // Upon search select
  function handleResultSelect(event, { result }) {
    setQuery(result.title);
    navigate(`/viewpost/${result.id}`)
  }

  return (
    <div className='headerBar'>
      <span><Button href='/newpost' color='blue'><Icon name='add'></Icon>New Post</Button></span>
      <Search value={query} results={results} onSearchChange={handleSearchChange} onResultSelect={handleResultSelect} placeholder='Search...'></Search>
    </div>
  )
}
