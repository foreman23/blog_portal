import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './screens/Home';
import NewPost from './screens/NewPost';
import ViewPost from './screens/ViewPost';
import AllPosts from './screens/AllPosts';
import UpdatePost from './screens/UpdatePost';

function App() {


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/newpost" element={<NewPost></NewPost>}></Route>
          <Route path="/updatepost/:postId" element={<UpdatePost></UpdatePost>}></Route>
          <Route path="/viewpost/:postId" element={<ViewPost></ViewPost>}></Route>
          <Route path="/allposts" element={<AllPosts></AllPosts>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
