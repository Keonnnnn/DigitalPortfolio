import { useState, useEffect, useRef } from "react";
import "./Header.css";

const Header = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    const shouldUseDark = saved === null ? true : saved === "true";
    setDarkMode(shouldUseDark);
    document.body.classList.toggle("dark", shouldUseDark);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.6;

    if (localStorage.getItem("musicEnabled") !== "1") return;

    const tryPlay = () => {
      audio.play()
        .then(() => setMusicPlaying(true))
        .catch(() => {});
      document.removeEventListener("click", tryPlay);
    };
    document.addEventListener("click", tryPlay);
    return () => document.removeEventListener("click", tryPlay);
  }, []);

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.body.classList.toggle("dark", next);
    localStorage.setItem("darkMode", next);
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicPlaying) {
      audio.pause();
      setMusicPlaying(false);
      localStorage.setItem("musicEnabled", "0");
    } else {
      try {
        await audio.play();
        setMusicPlaying(true);
        localStorage.setItem("musicEnabled", "1");
      } catch {
        // autoplay blocked — user gesture required
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/Ahsoka.mp3" loop preload="auto" />

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
          className={`dark-mode-fab desktop-fab music-btn${musicPlaying ? " music-on" : ""}`}
          onClick={toggleMusic}
          aria-label={musicPlaying ? "Pause music" : "Play music"}
        >
          {musicPlaying ? "🔊" : "🔇"}
        </button>

        <button
          className="dark-mode-fab desktop-fab"
          onClick={toggleDark}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </header>

      <button
        className={`music-mobile-fab${musicPlaying ? " music-on" : ""}`}
        onClick={toggleMusic}
        aria-label={musicPlaying ? "Pause music" : "Play music"}
      >
        {musicPlaying ? "🔊" : "🔇"}
      </button>

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
