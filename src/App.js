import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import Home from './screens/Home';
import NewPost from './screens/NewPost';
import ViewPost from './screens/ViewPost';
import AllPosts from './screens/AllPosts';
import UpdatePost from './screens/UpdatePost';
import Login from './components/Login';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  }


  return (
    <Router>
      <div className="App">

        {!isLoggedIn && <Login></Login>}

        {isLoggedIn && (
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/newpost" element={<NewPost></NewPost>}></Route>
            <Route path="/updatepost/:postId" element={<UpdatePost></UpdatePost>}></Route>
            <Route path="/viewpost/:postId" element={<ViewPost></ViewPost>}></Route>
            <Route path="/allposts" element={<AllPosts></AllPosts>}></Route>
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
