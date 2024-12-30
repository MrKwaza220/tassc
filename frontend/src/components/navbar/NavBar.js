import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./NavBar.css"; 

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);
  const openSignupModal = () => setSignupModalOpen(true);
  const closeSignupModal = () => setSignupModalOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container"> 

      <div className="navbar-logo">
        <Link to="/">
        <img src="daily_to_do.png" alt="Daily To-Do" />
        </Link>
        </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      
      </ul>
      </div>
    </nav>
  );
};

export default NavBar;
