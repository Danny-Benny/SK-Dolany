import React, { useState, useEffect } from "react";
import { FaArrowDown } from "react-icons/fa"; // Import the arrow icon
import "./slideshow.css";
import { SlideshowProps } from "../home/components/types";

const Slideshow = ({ images, title1, title2 }: SlideshowProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const nextImage = (activeIndex + 1) % images.length;
    const interval = setInterval(() => {
      setActiveIndex(nextImage);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex, images]);

  const handleScrollDown = () => {
    window.scrollTo({
      top: document.documentElement.clientHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="slideshow-container relative">
      {images.map((image: string, index: number) => (
        <div
          key={index}
          className={`slideshow-image ${index === activeIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="slideshow-overlay"></div>
        </div>
      ))}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-10">
        <h1 className="text-8xl text-white font-bold">{title1}</h1>
        <h2 className="text-2xl text-white font-bold">{title2}</h2>
      </div>
      <FaArrowDown
        size={"25px"}
        className="absolute bottom-0 left-0 mb-32 ml-12 text-white cursor-pointer z-20"
        onClick={handleScrollDown}
      />
    </div>
  );
};

export default Slideshow;
