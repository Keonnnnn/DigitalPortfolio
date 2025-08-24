// src/components/Header.js
import React from 'react';
import './Header.css';  // Import the CSS for the header

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Keon</h1> {/* Mimicking the script-style font logo */}
      </div>
      
      <div className="header-right">
        <a href="mailto:Keonshu.contact@gmail.com" className="email">
          Keonshu.contact@gmail.com
        </a>
      </div>
    </header>
  );
};

export default Header;
