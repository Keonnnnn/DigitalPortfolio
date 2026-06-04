import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Hero from "./components/Hero";
import Projects from "./components/Projects";
import ImageGallery from "./components/ImageGallery";
import ScrollToTop from "./components/ScrollToTop";

import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

import "./App.css";

function Home() {
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
    <>
      <Hero
        starsHidden={starsHidden}
        onToggleStars={() => setStarsHidden((p) => !p)}
      />
      <Projects />

      {isModalOpen && <ImageGallery closeGallery={closeGallery} />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <main className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>

        <ScrollToTop />
      </main>
    </BrowserRouter>
  );
}