import Register from './pages/authPages/Register';
import Login from './pages/authPages/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import Home from './Home';
import About from './pages/About';
import Brands from './pages/Brands';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/About" element={<About />} />
          <Route path="/Cars" element={<Brands />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
