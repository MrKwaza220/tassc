import React, { useState } from "react";
import axios from 'axios';
import "./Signup.css";

const Signup = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { username, email, password });
      if (response.data.token) {
        // Save the token in local storage
        localStorage.setItem('token', response.data.token);
        // Set success message
        alert('Signup successful!');
        // Redirect to the login page after a short delay
        // setTimeout(() => navigate('/home'), 2000); // Redirect after 2 seconds
      } else {
        setError('Sign-up failed');
      }
    } catch (err) {
      setError('Server error: ' + (err.response?.data?.msg || err.message));
    }
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      <p>Already have account? Click Close</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Signup;
