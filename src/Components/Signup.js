// SignUp.js
import React from 'react';
import '../Styles/SignUp.css';

function SignUp() {
  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="left-section">
          <h1>Create an Account</h1>
          <p>Join our community! Sign up for exclusive access.</p>
        </div>
        <div className="right-section">
          <div className="signup-form">
            <h2>Sign Up</h2>
            <form>
              <label htmlFor="fullname">Full Name:</label>
              <input type="text" id="fullname" name="fullname" placeholder="Enter your full name" required />

              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" placeholder="Enter your email" required />

              <label htmlFor="username">Username:</label>
              <input type="text" id="username" name="username" placeholder="Choose a username" required />

              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" placeholder="Choose a password" required />

              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
