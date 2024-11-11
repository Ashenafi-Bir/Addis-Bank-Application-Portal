
// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePageRoute from './pages/HomePageRoute';
import Login from './componnets/CommonPageLayouts/Login/Login';
import Manage from './componnets/ManagmentPageLayouts/Manage';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home/*" element={<HomePageRoute />} />
        <Route path="/login" element={<Login />} />
        <Route path="/manage" element={<PrivateRoute><Manage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
