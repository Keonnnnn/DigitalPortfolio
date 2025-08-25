// src/components/Header.js
import React from "react";
import "./Header.css";  // Import the CSS for the header

const Header = () => {
  return (
    <header className="header" aria-label="Top navigation">
      {/* Left side logo */}
      <div className="logo">
        <h1>Keon</h1>
      </div>

      {/* Right side email link */}
      <div className="header-right">
        <a 
          href="mailto:Keonshu.contact@gmail.com" 
          className="email"
          aria-label="Contact Keon via email"
        >
          Keonshu.contact@gmail.com
        </a>
      </div>
    </header>
  );
};

export default Header;
