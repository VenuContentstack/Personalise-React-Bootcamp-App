import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import Homepage from './pages/Homepage';
import Article from './pages/Article';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/article/:slug' element={<Article />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
