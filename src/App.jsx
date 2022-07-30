import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Rentals from "./pages/Rentals";
import Experiences from "./pages/Experiences";
import Support from "./pages/Support";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rentals" element={<Rentals />} />
      <Route path="/experiences" element={<Experiences />} />
      <Route path="/support" element={<Support />} />
    </Routes>
  );
}

export default App;
