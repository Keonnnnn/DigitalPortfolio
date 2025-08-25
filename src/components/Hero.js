// src/components/Hero.js
import React from "react";
import "./Hero.css";  
import ShootingStars from "./ShootingStars";  // Import the stars
import Header from "./Header";                // Import your header

const Hero = () => {
  return (
    <section className="hero">
      {/* Top bar sits inside the hero, over the animated background */}
      <Header />

      {/* Shooting stars scoped only to the hero */}
      <ShootingStars count={20} />

      {/* Main hero content */}
      <div className="hero-content">
        <h1>
          I'm an Innovator — blending technology, design, and user impact
        </h1>
        <p>
          I aim to craft impactful solutions that not only address problems 
          but also resonate with users.
        </p>
      </div>
    </section>
  );
};

export default Hero;
