import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "./Home.css";

const images = [
  "./assets/slideshow1.jpeg",
  "./assets/slideshow2.jpeg",
  "./assets/slideshow3.jpeg",
];

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow-container">
      {images.map((image, index) => (
        <CSSTransition
          key={index}
          in={index === activeIndex}
          timeout={500}
          classNames="fade"
          unmountOnExit
        >
          <img src={image} alt={`Slideshow ${index}`} />
        </CSSTransition>
      ))}
      <div className="dots-container">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Home;
