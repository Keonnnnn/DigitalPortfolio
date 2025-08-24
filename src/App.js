// src/App.js
import React from 'react';
import Header from './components/Header';  // Import Header section
import Hero from './components/Hero';      // Import Hero section
import About from './components/About';    // Import About section
import Projects from './components/Projects'; // Import Projects section
import Contact from './components/Contact';  // Import Contact section
import './App.css';  // Import global styles for the app

const App = () => {
  return (
    <div className="App">
      {/* Header Section */}
      <Header /> {/* This will display the logo, email, and buttons */}

      {/* Hero Section */}
      <Hero /> {/* This will display the hero section with the main intro */}

      {/* About Section */}
      <About /> {/* This will display a brief about yourself */}

      {/* Projects Section */}
      <Projects /> {/* This will showcase your projects */}

      {/* Contact Section */}
      <Contact /> {/* This will display contact information */}
    </div>
  );
};

export default App;
