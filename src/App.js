import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import { useEffect, useState } from 'react';
import Home from './screens/Home';
import NewPost from './screens/NewPost';
import ViewPost from './screens/ViewPost';
import AllPosts from './screens/AllPosts';
import UpdatePost from './screens/UpdatePost';
import Login from './components/Login';
import { Account } from './components/Account';
import Status from './components/Status';
import UserPool from './UserPool';

function App() {
  const [status, setStatus] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleStatusChange = (newStatus) => {
    if (status === true) {
      console.log(newStatus);
    }
    setStatus(newStatus);
    console.log(newStatus);
  };

  useEffect(() => {
    const getSession = async () => {
      try {
        const session = await new Promise((resolve, reject) => {
          const user = UserPool.getCurrentUser();
          if (user) {
            user.getSession((err, session) => {
              if (err) {
                reject();
              } else {
                resolve(session);
              }
            });
          } else {
            reject();
          }
        });
        setStatus(true);
      } catch (error) {
        setStatus(false);
      }
      setIsLoaded(true);
    };

    getSession();
  }, []);

  // handle login
  const handleLogin = () => {
    window.location.replace('/');
  };

  const logout = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.signOut();
    }
  };

  // handle logout
  const handleLogout = () => {
    logout();
    window.location.replace('/');
  };

  return (
    <Router>
      <div className="App">
        <div>
          {isLoaded && !status && (
            <Account>
              <Status onStatusChange={handleStatusChange} />
              <Login />
            </Account>
          )}
        </div>
        {status && (
          <div>
            <Navbar onLogout={handleLogout} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/newpost" element={<NewPost />} />
              <Route path="/updatepost/:postId" element={<UpdatePost />} />
              <Route path="/viewpost/:postId" element={<ViewPost />} />
              <Route path="/allposts" element={<AllPosts />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
