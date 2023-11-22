import React from "react";

const Footer = () => {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <div className="flex justify-center items-center bg-mygreen h-20 fixed bottom-0 left-0 right-0">
      <p className="text-white">© {getCurrentYear()} SK Dolany</p>
      <p className="text-white text-sm ml-2">Made with ❤️ by Daniel Beneš</p>
    </div>
  );
};

export default Footer;
