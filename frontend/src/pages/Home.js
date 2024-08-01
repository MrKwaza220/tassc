import React from "react";
import { Link } from "react-router-dom";
import "./AuthStyles.css"; // Import the CSS file

const Home = () => {
  return (
    <div className="home-page">
      <div className="home-container">
        <h1>Welcome To Our Tassc</h1>
        <p>Transform the way you manage tasks and projects
           with our intuitive and powerful platform. At Tassc,
            we streamline your workflow, enhance productivity, 
            and keep you organized every step of the way.</p>
        <div>
          <Link to="/login">
            <button>Login</button>
          </Link>
          Or
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
