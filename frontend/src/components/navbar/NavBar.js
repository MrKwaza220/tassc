import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../../pages/login/Login';
import Signup from '../../pages/signup/Signup';
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
        {token ? (
          <>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button onClick={openLoginModal} className="nav-button">Login</button>
            </li>
            <li>
              <button onClick={openSignupModal} className="nav-button">Sign Up</button>
            </li>
          </>
        )}
      </ul>

      {/* Modals */}
      {isLoginModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <Login onClose={closeLoginModal} />
          </div>
        </div>
      )}
      {isSignupModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <Signup onClose={closeSignupModal} />
          </div>
        </div>
      )}
      </div>
    </nav>
  );
};

export default NavBar;
