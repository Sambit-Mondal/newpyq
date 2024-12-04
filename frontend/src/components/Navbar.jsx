import React from 'react';
import './Navbar.css'; // Add custom styles here
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>PYQ Share</h2>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};
