import React, { useState } from "react";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import ImageGallery from "./components/ImageGallery";
import "./App.css";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openGallery = () => {
    console.log("Gallery Opened");
    setIsModalOpen(true);
  };

  const closeGallery = () => {
    console.log("Gallery Closed");
    setIsModalOpen(false);
  };

  return (
    <main className="App">
      <Hero />
      <Projects />

      {isModalOpen && <ImageGallery closeGallery={closeGallery} />}
      
      
    </main>
  );
}