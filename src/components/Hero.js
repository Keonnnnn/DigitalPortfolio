import "./Hero.css";
import ShootingStars from "./ShootingStars";
import Header from "./Header";
import MeImage from "../assets/me.jpg";
import SpotifyNowPlaying from "./SpotifyNowPlaying";

const Hero = () => {
  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="hero">
    
      <Header />

    
      <ShootingStars count={20} />

      
      <div className="hero-layout">
        
        <div className="hero-image-column">
          <div className="hero-image">
            <img src={MeImage} alt="Keon portrait" />
          </div>

          <button
            className="projects-callout"
            onClick={scrollToProjects}
            aria-label="Scroll to projects"
          >
            <span className="projects-text">My projects</span>
          
            <svg
              className="projects-arrow"
              viewBox="0 0 64 64"
              aria-hidden="true"
            >
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
            I’m an Innovator — blending technology, design, and user impact
          </h1>
          <p>
            I aim to craft impactful solutions that not only address problems
            but also resonate with users.
          </p>

  
          <div className="hero-player">
            <SpotifyNowPlaying />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
