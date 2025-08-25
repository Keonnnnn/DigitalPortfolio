// src/components/Hero.js
import React from "react";
import "./Hero.css";
import ShootingStars from "./ShootingStars";
import Header from "./Header";
import MeImage from "../assets/me.jpg";
import SpotifyNowPlaying from "./SpotifyNowPlaying";

const Hero = () => {
  return (
    <section className="hero">
      <Header />
      <ShootingStars count={20} />

      {/* Row: image (left) + text (right) */}
      <div className="hero-layout">
        <div className="hero-image">
          <img src={MeImage} alt="Keon portrait" />
        </div>

        <div className="hero-content">
          <h1>I’m an Innovator — blending technology, design, and user impact</h1>
          <p>
            I aim to craft impactful solutions that not only address problems
            but also resonate with users.
          </p>
        </div>
      </div>

      {/* Player sits below the row, centered */}
      <div className="hero-player">
        <SpotifyNowPlaying />
      </div>
    </section>
  );
};

export default Hero;
