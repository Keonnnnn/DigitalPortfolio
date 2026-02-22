import React, { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import ImageGallery from "./components/ImageGallery";
import "./App.css";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

 
  const [isDark, setIsDark] = useState(false);

  const openGallery = () => setIsModalOpen(true);
  const closeGallery = () => setIsModalOpen(false);

  
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;

    const shouldBeDark = savedTheme ? savedTheme === "dark" : Boolean(prefersDark);

    setIsDark(shouldBeDark);
    document.body.classList.toggle("dark", shouldBeDark);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target;
      if (target && target.classList && target.classList.contains("profile-pic")) {
        openGallery();
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  
  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.body.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <main className="App">
    
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDark ? "☀ Light mode" : "🌙 Dark mode"}
      </button>

      <Hero />
      <Projects />

      {isModalOpen && <ImageGallery closeGallery={closeGallery} />}
    </main>
  );
}