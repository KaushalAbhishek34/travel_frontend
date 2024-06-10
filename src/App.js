import './App.css';
import { Home , SingleHotel, SearchResults} from './pages';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/hotels/:name/:address/:state/:id/reserve" element={<SingleHotel />} />
      <Route path='/hotels/:address' element={<SearchResults />} />
    </Routes>
    
    </>
  );
}

export default App;
