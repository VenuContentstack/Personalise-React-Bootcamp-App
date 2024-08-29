import React from 'react';
//import { Link } from 'react-router-dom';
import './Header.css'
const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
         
            {/* Replace 'logo.png' with your logo file */}
            <img src="https://images.contentstack.io/v3/assets/blt7359e2a55efae483/blt518e5105a0686696/663e30a08f19535905e50af2/Logo.svg" alt="Logo" />
        
        </div>
        <nav className="nav">
          <ul>
            <li>
            Home
            </li>
            <li>
            Home
            </li>
            <li>
            Home
            </li>
            <li>
            Home
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;