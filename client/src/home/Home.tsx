import React from "react";
import Slideshow from "./components/slideshow";

const images = [
  "./assets/slideshow1.jpeg",
  "./assets/slideshow2.jpeg",
  "./assets/slideshow3.jpeg",
];

const Home = () => {
  return (
    <div>
      <Slideshow images={images} title1="SK Dolany" title2="fotbalový tým" />
    </div>
  );
};

export default Home;
