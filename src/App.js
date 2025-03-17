import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import PasswordRecovery from './Recover';
import UpdatePassword from './Update';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recover" element={<PasswordRecovery />} />
        <Route path="/update" element={<UpdatePassword />} /> {/* Ensure this route points to UpdatePassword */}
      </Routes>
    </Router>
  );
}

export default App;
