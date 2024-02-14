import React from "react";
import "./sponsors.css";

type SponsorImage = {
  src: string;
  link: string;
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
  // Quadruple the images for a seamless loop
  const quadrupledImages = [
    ...sponsorImages,
    ...sponsorImages,
    ...sponsorImages,
    ...sponsorImages,
  ];

  return (
    <div className="overflow-hidden relative rounded-xl shadow-xl">
      <div className="animate-slide">
        {quadrupledImages.map(({ src, link }, index) => (
          <div key={index} className="sponsor-image-container">
            <a href={link} target="_blank" rel="noopener noreferrer">
              <img src={src} alt={`Sponsor ${index}`} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsors;
