import React from 'react';
import Login from "../login/Login";
import Signup from "../signup/Signup";
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');

    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  
    const openLoginModal = () => setLoginModalOpen(true);
    const closeLoginModal = () => setLoginModalOpen(false);
    const openSignupModal = () => setSignupModalOpen(true);
    const closeSignupModal = () => setSignupModalOpen(false);
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {token ? (
        <>
          <Link to="/tasks">Tasks</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}

          <div>
          <button onClick={openLoginModal}>Login</button>
          <span>Or</span>
          <button onClick={openSignupModal}>Sign Up</button>
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
    </nav>
  );
};

export default NavBar;
