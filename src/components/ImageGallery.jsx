import React, { useCallback, useEffect, useRef, useState } from "react";
import "./ImageGallery.css";

import p1 from "../assets/p1.jpeg";
import p2 from "../assets/p2.jpeg";
import p3 from "../assets/p3.jpeg";
import p4 from "../assets/p4.jpeg";
import p5 from "../assets/p5.jpeg";
import p6 from "../assets/p6.jpeg";
import insideoutGif from "../assets/insideout1.mp4";

const ImageGallery = ({ closeGallery }) => {
  const images = [p1, p2, p3, p4, p5, p6];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleClose = useCallback(
    (e) => {
      e.stopPropagation();
      if (typeof closeGallery === "function") closeGallery();
    },
    [closeGallery]
  );

  const goToNextImage = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setSlideDirection("slide-left");

    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      setSlideDirection("slide-in-right");

      setTimeout(() => {
        setSlideDirection("");
        setIsTransitioning(false);
      }, 500);
    }, 500);
  }, [isTransitioning, images.length]);

  const goToPreviousImage = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setSlideDirection("slide-right");

    setTimeout(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
      setSlideDirection("slide-in-left");

      setTimeout(() => {
        setSlideDirection("");
        setIsTransitioning(false);
      }, 500);
    }, 500);
  }, [isTransitioning, images.length]);

  const handleThumbnailClick = useCallback(
    (index) => {
      if (isTransitioning || index === currentImageIndex) return;

      setIsTransitioning(true);
      setSlideDirection(index > currentImageIndex ? "slide-left" : "slide-right");

      setTimeout(() => {
        setCurrentImageIndex(index);
        setSlideDirection(
          index > currentImageIndex ? "slide-in-right" : "slide-in-left"
        );

        setTimeout(() => {
          setSlideDirection("");
          setIsTransitioning(false);
        }, 500);
      }, 500);
    },
    [currentImageIndex, isTransitioning]
  );

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose(e);
  };

  // Touch handlers for swipe gestures
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) goToNextImage();
      else goToPreviousImage();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Auto-advance on BOTH mobile and desktop
  useEffect(() => {
    const intervalId = setInterval(goToNextImage, 5000);
    return () => clearInterval(intervalId);
  }, [goToNextImage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") goToPreviousImage();
      if (e.key === "ArrowRight") goToNextImage();
      if (e.key === "Escape") handleClose(e);
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [goToPreviousImage, goToNextImage, handleClose]);

  return (
    <div className="gallery-modal-overlay" onClick={handleOverlayClick}>
      <div className="gallery-modal">
        <button
          className="close-btn"
          onClick={handleClose}
          aria-label="Close Gallery"
        >
          ✕
        </button>

        <h1 className="gallery-title">Keon's Gallery</h1>

        <div className="gallery-layout">
          <div className="gallery-container">
            <button
              className="nav-button left"
              onClick={goToPreviousImage}
              aria-label="Previous"
              disabled={isTransitioning}
            >
              ❮
            </button>

            <div
              className="image-wrapper"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={images[currentImageIndex]}
                alt={`Gallery ${currentImageIndex + 1} of ${images.length}`}
                className={`gallery-image ${slideDirection}`}
              />
            </div>

            <button
              className="nav-button right"
              onClick={goToNextImage}
              aria-label="Next"
              disabled={isTransitioning}
            >
              ❯
            </button>

            <div className="image-counter">
              {currentImageIndex + 1} / {images.length}
            </div>

            <div className="gallery-thumbnails">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`thumbnail ${
                    index === currentImageIndex ? "active" : ""
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
          </div>

          <div className="quote-section">
            <div className="quote-card">
              <p className="quote-text">
                "We didn't realise we were making memories, we just knew we were
                having fun."
              </p>
              <p className="quote-author">— Winnie the Pooh</p>
            </div>

            <div className="animation-container">
              {insideoutGif ? (
                <video
                  className="inside-out-video"
                  autoPlay
                  loop
                  muted
                  playsInline
                  disablePictureInPicture
                  controlsList="nodownload nofullscreen noremoteplayback"
                  onError={(e) => console.error("Video error:", e)}
                >
                  <source src={insideoutGif} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <p className="animation-placeholder">
                  Inside Out Animation
                  <br />
                  Coming Soon
                </p>
              )}
            </div>

            <div className="music-player-container">
              <iframe
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/track/7hOwMJ0FPTeTnLZ3k7IbP3?utm_source=generator"
                width="100%"
                height="152"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Player - Bundle of Joy by Jartisto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
