import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './pages/authPages/AuthContext';
import './index.css';
import Home from './Home';
import About from './pages/About';
import Brands from './pages/Brands';
import AllModels from './pages/Models/AllModels';
import AddBrand from './admin/AddBrand';
import AddModels from './admin/AddModels';
import Register from './pages/authPages/Register';
import Login from './pages/authPages/Login';
import RemoveModels from './admin/RemoveModels';
import UpdateModels from './admin/UpdateModels';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/About" element={<About />} />
          <Route path="/Cars" element={<Brands />} />
          <Route path="/Models" element={<AllModels />} />
          <Route path="/addBrand" element={<AddBrand />} />
          <Route path="/addModel" element={<AddModels />} />
          <Route path="/updateModel" element={<UpdateModels />} />
          <Route path="/removeModel" element={<RemoveModels />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
