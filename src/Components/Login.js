// Login.js
import React from 'react';
import '../Styles/Login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="left-section">
          <h1>Welcome Back!</h1>
          <p>Enter your credentials to access your account.</p>
        </div>
        <div className="right-section">
          <div className="login-form">
            <h2>Login</h2>
            <form>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" name="username" placeholder="Enter your username" required />

              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" placeholder="Enter your password" required />

              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
