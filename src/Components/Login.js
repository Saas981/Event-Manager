// Login.js
import React from 'react';
import '../Styles/Login.css';
import { TextField, Button, Alert } from '@mui/material';


function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="left-section">
          <h1 className='left-section-text'>Welcome Back!</h1>
          <p className='left-section-text'>Enter your credentials to access your account.</p>
        </div>
        <div className="right-section">
          <div className="login-form">
            <h2>Login</h2>
            <form>
            <TextField
                    type="email"
                    id="email"
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    required
                  />
                  <TextField
                    type="password"
                    id="password"
                    name="password"
                    label="Password"
                    placeholder="Choose a password"
                    required
                  />
                  <Button variant="contained" type="submit">
                    Sign Up
                  </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
