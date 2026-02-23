import React, { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import ImageGallery from "./components/ImageGallery";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starsHidden, setStarsHidden] = useState(false);

  const openGallery = () => setIsModalOpen(true);
  const closeGallery = () => setIsModalOpen(false);

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

  return (
    <main className="App">
      <Hero
        starsHidden={starsHidden}
        onToggleStars={() => setStarsHidden((p) => !p)}
      />
      <Projects />

      {isModalOpen && <ImageGallery closeGallery={closeGallery} />}
      <ScrollToTop />
    </main>
  );
}