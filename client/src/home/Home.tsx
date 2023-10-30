/* Home.tsx */

import React, { useState, useEffect } from "react";
import "./Home.css";

const images = [
  "./assets/slideshow1.jpeg",
  "./assets/slideshow2.jpeg",
  "./assets/slideshow3.jpeg",
];

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const nextImage = (activeIndex + 1) % images.length;

    const interval = setInterval(() => {
      setActiveIndex(nextImage);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className="slideshow-container">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slideshow ${index + 1}`}
          className={`slideshow-image ${index === activeIndex ? "active" : ""}`}
        />
      ))}
      <div className="dots-container">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`dot ${index === activeIndex ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
