import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Slideshow from "./slideshow";
import { FaUser, FaTimes } from "react-icons/fa";
import { useAuth } from "./auth/AuthContext";

const images = [
  "./assets/slideshow1.jpeg",
  "./assets/slideshow2.jpg",
  "./assets/slideshow3.JPG",
];

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleUserClick = () => {
    if (!auth.isAuthenticated()) {
      navigate("/login");
    } else {
      navigate("/profile");
    }
  };

  return (
    <>
      <nav className="bg-mygreen py-3 px-6 md:px-12 flex justify-between items-center relative">
        <Link to="/" className="text-white text-2xl font-bold z-10">
          <img
            src="./assets/logo.png"
            alt=""
            className="h-20 md:h-32"
            style={{
              maxHeight: "6rem",
              position: "absolute",
              bottom: "-25px",
            }}
          />
        </Link>

        <ul className="hidden md:flex ">
          <li className="p-3">
            <a
              href="https://foto.obecdolany.cz:5443/#/shared_space/folder/55"
              className="text-white hover:text-gray-200 transition duration-300"
            >
              Fotogalerie
            </a>
          </li>
          <li className="p-3">
            <a
              href="https://www.fotbal.cz/souteze/turnaje/hlavni/baa61467-ec7d-4db7-8ec4-4266a14d5518"
              className="text-white hover:text-gray-200 transition duration-300"
            >
              Ligové zápasy
            </a>
          </li>
          <li className="p-3">
            <Link
              to="/discussions"
              className="text-white hover:text-gray-200 transition duration-300"
            >
              Diskuze
            </Link>
          </li>
          <li className="p-3">
            <button
              onClick={handleUserClick}
              className="text-white focus:outline-none hover:text-gray-200 transition duration-300"
            >
              <FaUser size={"25px"} />
            </button>
          </li>
        </ul>
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        <ul
          className={`${
            menuOpen ? "translate-y-0" : "-translate-y-full"
          } md:hidden absolute top-0 right-0 flex flex-col items-end bg-mygreen rounded-l-3xl text-white z-10 w-56 p-6 transition-transform duration-300`}
          style={{ zIndex: 100 }}
        >
          <li className="p-3">
            <a
              href="https://foto.obecdolany.cz:5443/#/shared_space/folder/55"
              className="hover:text-gray-200 transition duration-300"
            >
              Fotogalerie
            </a>
          </li>
          <li className="p-3">
            <a
              href="https://www.fotbal.cz/souteze/turnaje/hlavni/baa61467-ec7d-4db7-8ec4-4266a14d5518"
              className="hover:text-gray-200 transition duration-300"
            >
              Ligové zápasy
            </a>
          </li>
          <li className="p-3">
            <Link
              to="/discussions"
              className="hover:text-gray-200 transition duration-300"
            >
              Diskuze
            </Link>
          </li>
          <li className="p-3">
            <button
              onClick={handleUserClick}
              className="focus:outline-none hover:text-gray-200 transition duration-300"
            >
              <FaUser size={"25px"} />
            </button>
          </li>
          <li className="mt-auto">
            <button
              onClick={() => setMenuOpen(false)}
              className="focus:outline-none"
            >
              <FaTimes size={24} className="text-white" />
            </button>
          </li>
        </ul>
      </nav>
      {location.pathname === "/" && (
        <Slideshow images={images} title1="SK Dolany" title2="fotbalový tým" />
      )}
    </>
  );
};
