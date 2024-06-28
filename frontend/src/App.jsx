import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';

import Register from './Register';
import Login from './Login.jsx';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Welcome to the App</h1>
        <Routes>
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
