import Register from './pages/authPages/Register';
import Login from './pages/authPages/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import Home from './Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
