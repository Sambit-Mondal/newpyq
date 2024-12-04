import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Pyq } from "./components/Pyq";
import { Login } from "./components/Login"; // Importing the Login component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pyq />} /> {/* Home or main page */}
        <Route path="/login" element={<Login />} /> {/* Login page */}
      </Routes>
    </Router>
  );
}

export default App;
