import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="flex justify-between align-center bg-green-800">
      <Link to="/" className="m-4 text-2xl font-bold text-white block">
        Domů
      </Link>
      <ul className="flex text-white align-center">
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
    </nav>
  );
};
