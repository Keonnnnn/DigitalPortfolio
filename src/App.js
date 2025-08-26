// src/App.js
import React from "react";
import Hero from "./components/Hero";
import Projects from "./components/Projects";

import "./App.css";

export default function App() {
  return (
    <main className="App">
      <Hero />
      <Projects />
    </main>
  );
}
