import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Items from './pages/Items';
import Report from './pages/Report';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/items" element={<Items />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;