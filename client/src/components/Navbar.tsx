import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Slideshow from "./slideshow";
import { FaUser } from "react-icons/fa";
import { useAuth } from "./auth/AuthContext";
const images = [
  "./assets/slideshow1.jpeg",
  "./assets/slideshow2.jpeg",
  "./assets/slideshow3.jpeg",
];

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();

  const handleUserClick = () => {
    if (!auth.isAuthenticated()) {
      navigate("/login");
    } else {
      navigate("/profile");
    }
  };

  return (
    <>
      <nav className="bg-mygreen relative pb-5 pt-5 w-full z-10">
        <div className="flex justify-between items-center px-4">
          <Link
            to="/"
            className="m-4 text-2xl font-bold text-white block top-0 absolute"
          >
            <img src="./assets/logo.png" alt="" className="relative -mt-4" />
          </Link>
          <ul className="flex ml-auto items-center -mr-4 text-white">
            <li className="p-2">
              <a href="https://foto.obecdolany.cz:5443/#/shared_space/folder/55">
                Fotogalerie
              </a>
            </li>
            <li className="p-2">
              <Link to="/league-matches">Ligové zápasy</Link>
            </li>
            <li className="p-2">
              <Link to="/discussions">Diskuze</Link>
            </li>
            <li className="p-2 flex items-center">
              <button onClick={handleUserClick}>
                <FaUser size={"25px"} />
              </button>
            </li>
          </ul>
        </div>
      </nav>
      {location.pathname === "/" && (
        <Slideshow images={images} title1="SK Dolany" title2="fotbalový tým" />
      )}
    </>
  );
};
