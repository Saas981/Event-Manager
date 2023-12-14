import React, { useState } from 'react';
import { TextField, Button, Alert, CircularProgress } from '@mui/material';
import '../Styles/Login.css';
import {signIn } from 'aws-amplify/auth'; // Import Auth from aws-amplify

function Login() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '', // Change email to username
    password: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { username, password } = formData; // Change email to username

    try {
      await signIn({username, password}); // Use Auth.signIn with username
      setError(null); // Reset error state on successful login

      // Redirect to the dashboard on successful login
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLoading(false)
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error signing in:', error);
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="left-section">
          <h1 className='left-section-text authTitle'>Welcome Back!</h1>
          <p className='left-section-text'>Enter your credentials to access your account.</p>
        </div>
        <div className="right-section">
          <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <TextField
                type="text"
                id="username" // Change email to username
                name="username"
                label="Username" // Change email to username
                placeholder="Enter your username" // Change email to username
                required
                onChange={handleChange}
              />
              <TextField
                type="password"
                id="password"
                name="password"
                label="Password"
                placeholder="Enter your password"
                required
                onChange={handleChange}
              />
              <Button variant="contained" type="submit">
              {loading ? <CircularProgress size={24} color="inherit" /> :"Sign In" }

              </Button>
              {error && (
                <div className="alert">
                  <p>{error}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
