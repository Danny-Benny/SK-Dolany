import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <Link to="/">Domů</Link>
      <ul>
        <li>
          <Link to="/roster">Soupiska týmu</Link>
        </li>
        <li>
          <Link to="/league-matches">Ligové zápasy</Link>
        </li>
        <li>
          <Link to="/galery">Fotogalerie</Link>
        </li>
        <li>
          <Link to="/discussions">Diskuze</Link>
        </li>
      </ul>
    </nav>
  );
};
