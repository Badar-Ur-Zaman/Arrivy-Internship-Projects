import Register from './pages/authPages/Register';
import Login from './pages/authPages/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import Home from './Home';
import About from './pages/About';
import Brands from './pages/Brands';
import AllModels from './pages/Models/AllModels';
import AddBrand from './admin/AddBrand';
import AddModels from './admin/AddModels';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/About" element={<About />} />
          <Route path="/Cars" element={<Brands />} />
          <Route path="/Models" element={<AllModels />} />
          <Route path="/addBrand" element={<AddBrand />} />
          <Route path="/addModel" element={<AddModels />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
