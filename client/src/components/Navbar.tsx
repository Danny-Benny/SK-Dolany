import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-green-800 relative pb-5 pt-5 w-full">
      <div className="flex justify-between items-center px-4">
        <Link
          to="/"
          className="m-4 text-2xl font-bold text-white block absolute top-0"
        >
          <img src="./assets/logo.png" alt="" className="relative -mt-4" />
        </Link>
        <ul className="flex text-white ml-auto relative -mr-4">
          <li className="p-2">
            <Link to="/roster">Soupiska týmu</Link>
          </li>
          <li className="p-2">
            <Link to="/league-matches">Ligové zápasy</Link>
          </li>
          <li className="p-2">
            <Link to="/galery">Fotogalerie</Link>
          </li>
          <li className="p-2">
            <Link to="/discussions">Diskuze</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
