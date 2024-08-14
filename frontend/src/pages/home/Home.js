import React, { useState } from "react";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import "./Home.css";

const Home = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);
  const openSignupModal = () => setSignupModalOpen(true);
  const closeSignupModal = () => setSignupModalOpen(false);

  return (
    <div className="home-page">
      <div className="home-container">
        <h1>Manage your work anytime, anywhere.</h1>
        <p>
          Transform the way you manage tasks and projects
          with our intuitive and powerful platform. At Tassc,
          we streamline your workflow, enhance productivity,
          and keep you organized every step of the way.
        </p>
        <div>
          <button onClick={openLoginModal}>Login</button>
          <span>Or</span>
          <button onClick={openSignupModal}>Sign Up</button>
        </div>
      </div>

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
  );
};

export default Home;
