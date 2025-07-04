
import './styles/App.scss'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FilmPage from './pages/filmPage';
import RenderGenre from './pages/genrePage';

function App() {
  return(
      <Router basename="/kinoroom">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/film/:id" element={<FilmPage />} />
        <Route path='/genre/:id' element={<RenderGenre/>}/>
      </Routes>
    </Router>

     
  )
 
}

export default App;
