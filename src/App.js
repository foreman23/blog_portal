import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';

import Home from './screens/Home';
import NewPost from './screens/NewPost';
import ViewPost from './screens/ViewPost';
import AllPosts from './screens/AllPosts';
import UpdatePost from './screens/UpdatePost';
import Login from './components/Login';

function App() {

  // handle login
  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', true);
    window.location.replace('/');
  }

  // handle logout
  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', false);
    window.location.replace('/');
  }

  return (
    <Router>
      <div className="App">

        {(localStorage.getItem('isLoggedIn')) === 'false' && <Login onLogin={handleLogin}></Login>}

        {(localStorage.getItem('isLoggedIn')) === 'true' && (
          <div>
          <Navbar onLogout={handleLogout}></Navbar>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/newpost" element={<NewPost></NewPost>}></Route>
            <Route path="/updatepost/:postId" element={<UpdatePost></UpdatePost>}></Route>
            <Route path="/viewpost/:postId" element={<ViewPost></ViewPost>}></Route>
            <Route path="/allposts" element={<AllPosts></AllPosts>}></Route>
          </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
