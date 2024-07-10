<<<<<<< HEAD
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import ProblemPage from './pages/ProblemPage';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const handleLogin = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />
                <Route path="/admin" element={token ? <AdminPage token={token} /> : <Navigate to="/login" />} />
                <Route path="/problems/:id" element={<ProblemPage />} />
            </Routes>
        </Router>
    );
=======
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
>>>>>>> origin/master
};

export default App;
