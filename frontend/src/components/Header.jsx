// Header.jsx
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <ul className="navList">
            <li><Link to="/">Página Inicial</Link></li>
            <li><a href="https://fabiotessaro.vercel.app/" target="_blank" rel="noopener noreferrer">PortFolio</a></li>
            <li><Link to="/cadastro">Cadastro</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
