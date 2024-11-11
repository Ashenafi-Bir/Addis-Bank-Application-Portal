import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/general/logo12.png';

function Header() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Addis Bank" />
        <h1>Addis Bank Gateway for Application</h1>
      </div>
      <button className="login-button1" onClick={handleLoginClick}>Login</button>
    </header>
  );
}

export default Header;
