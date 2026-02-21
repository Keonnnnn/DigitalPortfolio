import React, { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import ImageGallery from "./components/ImageGallery";
import "./App.css";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openGallery = () => {
    setIsModalOpen(true);
  };

  const closeGallery = () => {
    setIsModalOpen(false);
  };

 
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
      <Hero />
      <Projects />

      {isModalOpen && <ImageGallery closeGallery={closeGallery} />}
    </main>
  );
}