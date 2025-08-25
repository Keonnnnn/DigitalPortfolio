// src/App.js
import React from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      {/* Header is rendered inside <Hero /> now */}
      <Hero />
      <About />
      <Projects />
      <Contact />
    </div>
  );
};

export default App;
