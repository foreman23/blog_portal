import axios from 'axios';

let blogData = [];

// GET all blogs
axios.get('http://localhost:4000/blogs')
  .then(function (response) {
    // handle success
    blogData = response;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

export default blogData;