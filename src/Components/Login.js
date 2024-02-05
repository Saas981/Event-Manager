import React, { useState } from 'react';
import { TextField, Button, Alert, CircularProgress } from '@mui/material';
import '../Styles/Login.css';
import { Auth } from 'aws-amplify'; // Import Auth from aws-amplify

function Login({ theme }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '', // Change email to username
    password: '',
  });

  const[screen,setScreen]= useState(1)

  const [resetPasswordData, setResetPasswordData] = useState({
    resetUsername: '',
    resetCode: '',
    newPassword: '',
  });

  const [error, setError] = useState(null);



  async function handleSignOut() {
    try {
      setLoading(true);
      await Auth.signOut();
      await new Promise((resolve) => setTimeout(resolve, 1500));
      window.location.reload();
      window.location.href = '/login';
    } catch (error) {
      console.log('error signing out: ', error);
    } finally {
      setLoading(false);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const { username, password } = formData;

    try {
      await Auth.signIn({ username, password });
      setError(null);
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLoading(false);
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error signing in:', error);
      if (error.message === 'There is already a signed in user.') {
        try {
          await Auth.signOut();
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
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetPasswordChange = (e) => {
    console.log("RESET DATA ",e)
    setResetPasswordData({
      ...resetPasswordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    let username =resetPasswordData.resetUsername
    if(!username){
      username = formData.username
    }
    console.log("USRNEANME ",username)
    try {
      await Auth.forgotPassword(username);
      console.log('Password reset code sent successfully!');
      setScreen(3); // Move to the next screen
    } catch (error) {
      console.error('Error sending password reset code:', error);
      setError(error.message);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
      let username =resetPasswordData.resetUsername
    if(!username){
      username = formData.username
    }
    const { resetUsername, resetCode, newPassword } = resetPasswordData;

    try {
      await Auth.forgotPasswordSubmit(username, resetCode, newPassword);
      console.log('Password reset successful!');
      setScreen(1); // Move to the final screen
    } catch (error) {
      console.error('Error submitting password reset:', error);
      setError(error.message);
    }
  };


  const renderForm = () => {
    switch (screen) {
      case 1:
        return (
          <>
   <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <TextField
                type="text"
                id="username"
                name="username"
                label="Username"
                placeholder="Enter your username"
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
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
              </Button>
              {error && (
                <div className="alert">
                  <p>{error}</p>
                </div>
              )}
            </form>
              <Button onClick={()=>{setScreen(2)}}>
                  Forgot Password
                </Button>
          </>
        );
      case 2:
        return (
          <>
            <h2>Forgot Password</h2>
            <form onSubmit={handleForgotPassword}>
              <TextField
                type="text"
                id="resetUsername"
                name="resetUsername"
                label="Username"
                placeholder="Enter your username"
                required
                onChange={handleResetPasswordChange}
              />
              <Button variant="contained" type="submit">
                Send Reset Code
              </Button>
               {error && (
                <div className="alert">
                  <p>{error}</p>
                </div>
              )}
            </form>
          </>
        );
      case 3:
        return (
          <>
               <h2>Reset Password</h2>
            <form onSubmit={handleForgotPasswordSubmit}>
              <TextField
                type="text"
                id="resetCode"
                name="resetCode"
                label="Reset Code"
                placeholder="Enter the code sent to your email"
                required
                onChange={handleResetPasswordChange}
              />
              <TextField
                type="password"
                id="newPassword"
                name="newPassword"
                label="New Password"
                placeholder="Enter your new password"
                required
                onChange={handleResetPasswordChange}
              />
              <Button variant="contained" type="submit">
                Reset Password
              </Button>
               {error && (
                <div className="alert">
                  <p>{error}</p>
                </div>
              )}
            </form>
          </>
        );
      default:
        return null;
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
         
{renderForm()}
            {/* Forgot Password Form */}
           

            {/* Forgot Password Submit Form */}
        
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
