//  é uma navbar na realidade
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { GoLaw } from "react-icons/go";


const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <nav className="navbar">
                    <ul className="navList">
                        <li><GoLaw size="20"/></li>
                        <li><Link to="/">Página Inicial</Link></li>
                        <li><Link to="/cadastro">Cadastro</Link></li>
                        <li><Link to="/rota">Visitar Por Rota</Link></li>
                        <li><a href="https://fabiotessaro.vercel.app/" target="_blank" rel="noopener noreferrer">by Fabio Tessaro</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
