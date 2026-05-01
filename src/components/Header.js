import { useState, useEffect } from "react";
import "./Header.css";

const Header = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    const shouldUseDark = saved === null ? true : saved === "true";

    setDarkMode(shouldUseDark);
    document.body.classList.toggle("dark", shouldUseDark);
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
        <div className="logo">
          <h1>Keon</h1>
        </div>

        <a
          href="mailto:keonshu.contact@gmail.com"
          className="email-btn"
          aria-label="Contact Keon via email"
        >
          <span className="email-icon">✉️</span>
          <span className="email-label">keonshu.contact@gmail.com</span>
        </a>

        <button
          className="dark-mode-fab desktop-fab"
          onClick={toggleDark}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </header>

      <button
        className="dark-mode-fab mobile-fab"
        onClick={toggleDark}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </>
  );
};

export default Header;