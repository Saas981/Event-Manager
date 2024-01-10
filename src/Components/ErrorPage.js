import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <ErrorContainer>
      <Typography variant="h1" sx={{ textAlign: 'center', fontSize: '4rem', color: '#FF1744', marginBottom: '20px' }}>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '30px' }}>
        The requested page could not be found. Please check the URL and try again.
      </Typography>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary">
          Go to Home
        </Button>
      </Link>
    </ErrorContainer>
  );
};

const ErrorContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  padding: '20px',
});

export default ErrorPage;
