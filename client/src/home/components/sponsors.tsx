import React, { useEffect, useState } from "react";
import "./sponsors.css";

const sponsorImages = [
  "./assets/sponsor1.png",
  "./assets/sponsor2.png",
  "./assets/sponsor3.png",
  "./assets/sponsor4.jpg",
  "./assets/sponsor5.jpg",
  "./assets/sponsor6.jpg",
];

const Sponsors = () => {
  const [imageSizes, setImageSizes] = useState<any[]>([]);

  useEffect(() => {
    const fetchImageSizes = async () => {
      const sizes = await Promise.all(
        [...sponsorImages, ...sponsorImages].map((image) => getImageSize(image))
      );
      setImageSizes(sizes);
    };

    fetchImageSizes();
  }, []);

  const getImageSize = (src: string): Promise<any> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ src, width: img.width, height: img.height });
      };
      img.src = src;

      img.onerror = () => resolve({ src, width: 0, height: 0 });
    });
  };

  return (
    <div className="overflow-hidden relative">
      <div className="flex animate-slide w-full">
        {imageSizes.map(({ src, width, height }, index) => (
          <img
            key={index}
            src={src}
            alt={`Sponsor ${index + 1}`}
            style={{
              width: "auto",
              height: "80px",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
            className="m-6"
          />
        ))}
      </div>
    </div>
  );
};

export default Sponsors;
