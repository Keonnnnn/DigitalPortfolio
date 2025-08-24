// src/components/Hero.js
import React from 'react';
import './Hero.css';  // Import Hero styles

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>I'm an Innovator — blending technology, design and user impact</h1>
        <p>
         I aim to craft craft impactful solutions that not only address problems but also resonate with users.
        </p>
      </div>
      <div className="projects-section">
        <p>My projects</p>
        <div className="arrow">&#8595;</div>
      </div>
    </section>
  );
};

export default Hero;
