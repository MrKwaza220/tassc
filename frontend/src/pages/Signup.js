import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { register } from '../api/auth';

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    try {
      await register(formData);
      navigate('/login');
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <AuthForm type="signup" onSubmit={handleSignup} />
    </div>
  );
};

export default Signup;
