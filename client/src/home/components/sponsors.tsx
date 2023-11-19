import React from "react";
import "./sponsors.css";

const sponsorImages = [
  "./assets/sponsors/sponsor1.png",
  "./assets/sponsors/sponsor2.png",
  "./assets/sponsors/sponsor3.png",
  "./assets/sponsors/sponsor4.jpg",
  "./assets/sponsors/sponsor5.jpg",
  "./assets/sponsors/sponsor6.jpg",
];

const Sponsors = () => {
  return (
    <div className="overflow-hidden relative">
      <div className="flex animate-slide w-full">
        {sponsorImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Sponsor ${index + 1}`}
            className="w-full md:w-1/3 transition-transform duration-500 transform"
          />
        ))}
      </div>
    </div>
  );
};

export default Sponsors;
