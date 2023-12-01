import React from 'react';
import { Link } from 'react-router-dom';
import { User, LogIn, Plus, Info, UserPlus, } from 'react-feather'; // Import Feather icons
import '../Styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">YourLogo</Link>

        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="auth-icons">
          <Link to="/login">    <User /></Link>
          <Link to="/signup"><UserPlus /></Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
