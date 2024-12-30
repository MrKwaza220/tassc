import React, { useState } from "react";
import axios from "axios";
import "./AuthForm.css";
import { useNavigate } from "react-router-dom";
import Signup from "../signup/Signup";
import Login from "../login/Login";

const AuthForm = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  return (
    <div className="auth-form">
      <div
        className={`container ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
        id="container"
      >
        <div className="form-container sign-up-container">
        
          <Signup />
        </div>

        <div className="form-container sign-in-container">
        
          <Login />
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us, please login with your personal info
              </p>
              <button
                className="ghost"
                onClick={() => setIsRightPanelActive(false)}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your details and start your journey with us</p>
              <button
                className="ghost"
                onClick={() => setIsRightPanelActive(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
