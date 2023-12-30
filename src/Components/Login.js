import React, { useState } from 'react';
import { TextField, Button, Alert, CircularProgress } from '@mui/material';
import '../Styles/Login.css';
import {Auth } from 'aws-amplify'; // Import Auth from aws-amplify

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

  async function handleSignOut() {
    try {
      setLoading(true); // Set loading to true when starting sign-out
      await Auth.signOut();
      await new Promise(resolve => setTimeout(resolve, 1500));
      window.location.reload(); // Reload the page after successful sign-out
      window.location.href = '/login';

    } catch (error) {
      console.log('error signing out: ', error);
    } finally {
      setLoading(false); // Set loading to false whether sign-out succeeds or fails
    }
  }


  const handleLogin = async (e) => {
    e.preventDefault();
  
    const { username, password } = formData;
  
    try {
      await Auth.signIn({username, password});
      setError(null);
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLoading(false);
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error signing in:', error);
      if (error.message === "There is already a signed in user.") {
        // If there is already a signed-in user, sign them out first and then attempt login again
        try {
          await Auth.signOut(); // Sign out the current user
          // Now attempt login again
          await handleLogin(e);
        } catch (signOutError) {
          console.error('Error signing out:', signOutError);
          setError(signOutError.message);
        }
      } else {
        setError(error.message);
      }
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
