import { useState, useEffect } from "react";
import "./Header.css";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setDarkMode(saved);
    document.body.classList.toggle("dark", saved);
  }, []);

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.body.classList.toggle("dark", next);
    localStorage.setItem("darkMode", next);
  };

  return (
    <>
      <header className="header" aria-label="Top navigation">
        {/* Left side logo */}
        <div className="logo">
          <h1>Keon</h1>
        </div>

        {/* Right side — email pill button */}
        <a
          href="mailto:Keonshu.contact@gmail.com"
          className="email-btn"
          aria-label="Contact Keon via email"
        >
          <span className="email-icon">✉️</span>
          <span className="email-label">Email me</span>
        </a>
      </header>

      {/* Floating dark mode toggle — bottom right */}
      <button
        className="dark-mode-fab"
        onClick={toggleDark}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </>
  );
};

export default Header;