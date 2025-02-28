import React, { useState } from "react";
import "./Home.css";

const Home = () => {
 

  return (
    <div className="home-page">
      <div className="home-container">
        <h1>WELCOME TO DAILY TO-DO.</h1>
        <h2>Simplify Your Life, One Task at a Time.</h2>
        <p>
        Daily Todo is your personal productivity companion, 
        designed to help you stay organized and achieve more every day. 
        Whether you’re managing work projects, personal errands, or 
        lifelong goals, Daily Todo makes task management effortless 
        and intuitive.
        </p>
        <a href="/authform">
          <button>Get Started</button>
        </a>
    </div>
    </div>
  );
};

export default Home;
