// src/components/Projects.js
import React from 'react';
import './Projects.css';  // Import the styling for the project section

const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <h2>My Projects</h2>
      <div className="project-list">
        {/* Project 1 */}
        <div className="project">
          <h3>Project 1</h3>
          <p>A brief description of the first project you want to showcase.</p>
        </div>
        
        {/* Project 2 */}
        <div className="project">
          <h3>Project 2</h3>
          <p>A brief description of the second project.</p>
        </div>

        {/* Add more projects here */}
        <div className="project">
          <h3>Project 3</h3>
          <p>A brief description of the third project.</p>
        </div>
        
        <div className="project">
          <h3>Project 4</h3>
          <p>A brief description of the fourth project.</p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
