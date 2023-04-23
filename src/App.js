import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './screens/Home';
import NewPost from './screens/NewPost';
import ViewPost from './screens/ViewPost';

function App() {


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/newpost" element={<NewPost></NewPost>}></Route>
          <Route path="/viewpost/:postId" element={<ViewPost></ViewPost>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
