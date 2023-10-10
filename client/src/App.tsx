import React from "react";
import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { Galery } from "./components/pages/Galery";
import { LeagueMatches } from "./components/pages/LeagueMatches";
import { Roster } from "./components/pages/Roster";
import { Discussions } from "./components/pages/Discussions";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galery" element={<Galery />} />
        <Route path="/league-matches" element={<LeagueMatches />} />
        <Route path="/roster" element={<Roster />} />
        <Route path="/discussions" element={<Discussions />} />
      </Routes>
    </div>
  );
}

export default App;
