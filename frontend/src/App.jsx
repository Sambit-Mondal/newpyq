import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Pyq } from "./components/Pyq";
import Login from "./components/Login";
import Signup from "./components/Signin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pyq />} /> {/* Home or main page */}
        <Route path="/login" element={<Login />} /> {/* Login page */}
        <Route path="/signin" element={<Signup/>} />
      </Routes>
    </Router>
  );
}

export default App;
