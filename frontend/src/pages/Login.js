import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { login } from '../api/auth';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const response = await login(formData);
      localStorage.setItem('token', response.token);
      navigate('/tasks');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <AuthForm type="login" onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
