import "./Hero.css";
import ShootingStars from "./ShootingStars";
import Header from "./Header";
import MeImage from "../assets/me.jpg";
import SpotifyNowPlaying from "./SpotifyNowPlaying";
import React, { useState, useEffect, useRef } from "react";
import ImageGallery from "./ImageGallery";

const StarIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="17"
    height="17"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <line
      x1="3" y1="21" x2="10.5" y2="13.5"
      strokeWidth="2"
      strokeLinecap="round"
      className="star-trail"
    />
    <polygon
      points="15,2 16.8,8.2 23,8.2 17.9,11.8 19.7,18 15,14.5 10.3,18 12.1,11.8 7,8.2 13.2,8.2"
      className="star-body"
      strokeLinejoin="round"
    />
  </svg>
);

const Hero = ({ starsHidden, onToggleStars }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [btnVisible, setBtnVisible] = useState(true);
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setBtnVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openGallery = () => setIsModalOpen(true);
  const closeGallery = () => setIsModalOpen(false);

  return (
    <section className="hero" ref={heroRef}>
      <Header />
      <ShootingStars count={20} hidden={starsHidden} />

      {/* Stars toggle — fixed top-right, only visible while hero is in view */}
      <button
        className={`hero-stars-btn ${starsHidden ? "hero-stars-btn--off" : ""} ${btnVisible ? "" : "hero-stars-btn--hidden"}`}
        onClick={onToggleStars}
        aria-label={starsHidden ? "Show shooting stars" : "Hide shooting stars"}
        title={starsHidden ? "Show stars" : "Hide stars"}
      >
        <StarIcon className="hero-stars-icon" />
      </button>

      <div className="hero-layout">
        <div className="hero-image-column">
          <div className="hero-image">
            <img src={MeImage} alt="Keon portrait" onClick={openGallery} />
          </div>
          <button
            className="projects-callout"
            onClick={scrollToProjects}
            aria-label="Scroll to projects"
          >
            <span className="projects-text">My projects</span>
            <svg className="projects-arrow" viewBox="0 0 64 64" aria-hidden="true">
              <path
                d="M32 16 C32 28, 32 40, 32 48 M32 48 L24 38 M32 48 L40 38"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="hero-content">
          <div className="hero-greeting" aria-label="Hello, I'm Keon">
            <span className="greet-type">Hello, I&apos;m Keon</span>
          </div>
          <h1>
            I'm an Innovator — blending technology, design, and user impact
          </h1>
          <p>
            I aim to craft impactful solutions that not only address problems but also resonate with users.
          </p>
          <div className="hero-player">
            <SpotifyNowPlaying />
          </div>
        </div>
      </div>

      {isModalOpen && <ImageGallery closeGallery={closeGallery} />}
    </section>
  );
};

export default Hero;