import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { TextField, Button, Alert, CircularProgress } from '@mui/material';
import '../Styles/SignUp.css';
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmationCode: '',
  });

  const [signedUp, setSignedUp] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);




  async function handleAutoSignIn() {
    try {
      const { email, password } = formData;
      const username = email;
      await Auth.signIn({username, password});
      console.log('Auto sign-in success');
    } catch (error) {
      console.log('Auto sign-in error:', error);
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    const username = email;
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });

      setSignedUp(true); // Change state to switch to the confirmation code section
      setError(null)
    } catch (error) {
      console.error('Error signing up:', error);
      if(error.message.includes('An account with the given email already exists.')){
        setSignedUp(true)
        setError("An account with the given email alerady exists. Please enter the confirmation code.")
      }
      else if (error.message.includes('Password did not conform with policy')) {
        // Remove the common prefix from the error message
        const remainingErrorMessage = error.message.replace('Password did not conform with policy: ', '');
        setError(remainingErrorMessage);
      } else {
        setError(error.message);
      }    }
  };

  const handleConfirmSignUp = async (e) => {
    e.preventDefault();

    const { email, confirmationCode } = formData;
    const cleanedConfirmationCode = confirmationCode.replace(/\D/g, '');
    console.log(cleanedConfirmationCode)

    try {
      await Auth.confirmSignUp( email,  cleanedConfirmationCode );
      console.log('Confirmation success');
      await handleAutoSignIn()
      setError(null)
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLoading(false)
      window.location.href = '/';
      
    } catch (error) {
      console.error('Error confirming sign up:', error);
      setError(error.message); // Set the error message in the state
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="left-section">

          <h1 className="left-section-text authTitle">Create an Account</h1>
          
          <p className="left-section-text">Join our community! Sign up for exclusive access.</p>
        </div>
        <div className="right-section">
          <div className="signup-form">
          
            {!signedUp ? (
              <>
                <h2>Sign Up </h2>
                <form onSubmit={handleSignUp} style={{ width: '300px' }}>
                  
                  <TextField
                    type="email"
                    id="email"
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    required
                    onChange={handleChange}
                  />
                  <TextField
                    type="password"
                    id="password"
                    name="password"
                    label="Password"
                    placeholder="Choose a password"
                    required
                    onChange={handleChange}
                  />
                  <Button variant="contained" type="submit">
                    Sign Up
                  </Button>
                  {error && (
            <div className="alert">
              <p>{error}</p>
            </div>)}
                </form>
                
              </>
            ) : (
              <>
                <h2 className='send'>    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" font-size="24"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></h2>
                <h2>Confirm Sign Up</h2>
                <form onSubmit={handleConfirmSignUp}>
                <TextField
              type="text"
              id="confirmationCode"
              name="confirmationCode"
              label="Confirmation Code"
              placeholder="Enter confirmation code"
              required
              onChange={handleChange}
              InputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*', // Only allow numeric characters
              }}
            />
  
                  <Button variant="contained" type="submit">
                  {loading ? <CircularProgress size={24} color="inherit" /> :"Confirm Sign Up" }
          
                  </Button>
                  {error ?  <div className="alert">
              <p>{error}</p>
            </div>
                  :( <div className="success">
                  <p>Sign Up Code Sent</p>
                </div>)}
                </form>
              </>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
