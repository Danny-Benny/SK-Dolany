import React from "react";
import "./App.css";

import TestBe from "./components/TestBE";

function App() {
  return (
    <>
      <div>
        <div className="text-4xl text-center">Hello World</div>
      </div>
      <div className="container mx-auto">
        <TestBe />
      </div>
    </>
  );
}

export default App;
