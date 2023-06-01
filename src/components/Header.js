import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Search, Icon } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';


export const Header = () => {

  const API_KEY = process.env.REACT_APP_API_KEY;
  const TLD = process.env.REACT_APP_TLD;

  // Retrieve blogData from server
  // DELETE THIS COMMENT
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${TLD}blogs`, {
                headers: {
                    'X-API-Key': API_KEY,
                },
            });
            setBlogData(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    fetchData();
}, []);

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
    .map((option) => ({ title: option.title, img: option.img, _id: option._id }));
    setResults(filteredResults);
  }

  // Upon search select
  function handleResultSelect(event, { result }) {
    setQuery(result.title);
    navigate(`/viewpost/${result._id}`)
  }

  return (
    <div className='headerBar'>
      <span><Button href='/newpost' color='blue'><Icon name='add'></Icon>New Post</Button></span>
      <Search value={query} results={results} onSearchChange={handleSearchChange} onResultSelect={handleResultSelect} placeholder='Search...'></Search>
    </div>
  )
}
