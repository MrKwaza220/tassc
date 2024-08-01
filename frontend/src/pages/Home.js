import React from 'react';
import { Link } from 'react-router-dom';
import './AuthStyles.css'; // Import the CSS file

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Tassc</h1>
      <div>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
