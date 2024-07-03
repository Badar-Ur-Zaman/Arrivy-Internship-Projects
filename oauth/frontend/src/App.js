import React from 'react';
import { BrowserRouter as Routes, Route } from 'react-router-dom';
import Login from './Login';
import Callback from './components/Callback';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/callback" component={Callback} />
        <Route path="/" component={Login} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
