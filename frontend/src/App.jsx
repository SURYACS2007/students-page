import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import { Markstd } from './Markstd.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/stdmark' element={<Markstd />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
