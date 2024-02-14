import React, { useEffect, useState, useRef } from "react";
import "./sponsors.css";

type SponsorImage = {
  src: string;
  link: string;
};

type ImageSize = {
  src: string;
  link: string;
  width: number;
  height: number;
};

const sponsorImages: SponsorImage[] = [
  { src: "./assets/sponsor1.png", link: "https://www.obecdolany.cz/" },
  { src: "./assets/sponsor2.png", link: "https://www.piskovnadolany.cz/" },
  {
    src: "./assets/sponsor3.png",
    link: "https://www.facebook.com/farospelety",
  },
  { src: "./assets/sponsor4.jpg", link: "" },
  { src: "./assets/sponsor5.jpg", link: "https://zzone.cz/" },
  { src: "./assets/sponsor6.jpg", link: "https://www.guardian-frs.cz/" },
];

const Sponsors: React.FC = () => {
  const [totalWidth, setTotalWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let width = 0;
    const images = containerRef.current?.getElementsByTagName("img") || [];

    for (let i = 0; i < images.length; i++) {
      width += images[i].offsetWidth;
    }

    setTotalWidth(width);
  }, []);

  const animationStyle = {
    animationDuration: `${totalWidth / 100}s`,
  };

  const doubledImages = [...sponsorImages, ...sponsorImages];

  return (
    <div className="overflow-hidden relative rounded-xl shadow-xl">
      <div className="animate-slide" style={animationStyle} ref={containerRef}>
        {doubledImages.map(({ src, link }, index) => (
          <div key={index} className="sponsor-image-container">
            <a href={link} target="_blank" rel="noopener noreferrer">
              <img src={src} alt={`Sponsor ${index + 1}`} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsors;
