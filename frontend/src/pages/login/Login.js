import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error
    try {
      const response = await axios.post(
       "http://localhost:5000/api/auth/login",
        { email, password }
      );
      if (response.data.token) {
        // Save the token in local storage
        localStorage.setItem("token", response.data.token);
        // Redirect to the tasks page
        navigate("/dashboard");
      } else {
        setError("Login failed");
      }
    } catch (err) {
      setError("Server error: " + (err.response?.data?.msg || err.message));
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit} >
      <h1>Sign In</h1>
        <div className="signin-options">
          
        </div>
        <div className="login-input">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="email"
          />
        </div>
        <div className="login-input">
        
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="password"
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
