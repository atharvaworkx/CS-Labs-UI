import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Dashboard />} />
              <Route path="/blog" element={<Dashboard />} />
              <Route path="/contact" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Dashboard />} />
              <Route path="/my-courses" element={<Dashboard />} />
              <Route path="/progress" element={<Dashboard />} />
              <Route path="/saved" element={<Dashboard />} />
              <Route path="/settings" element={<Dashboard />} />
            </Routes>
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
