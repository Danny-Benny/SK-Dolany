import React from "react";
import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./home/Home";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
