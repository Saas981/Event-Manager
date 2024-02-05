import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import GppBadTwoToneIcon from '@mui/icons-material/GppBadTwoTone';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <ErrorContainer>
      <GppBadTwoToneIcon sx={{ fontSize: "170px", color: 'red' }} ></GppBadTwoToneIcon>
      <Typography variant="h1" sx={{ textAlign: 'center', fontSize: '50px', color: '#131717', marginBottom: '20px', fontFamily: "Poppins", fontWeight: "600" }}>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '30px', color: '#8e9191', fontWeight: '500' }}>
        The requested page could not be found.<br></br> Please check the URL and try again.
      </Typography>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <StyledButton variant="contained" color="primary" className="bounce">
          Go back to the Homepage
        </StyledButton>
      </Link>
    </ErrorContainer>
  );
};

const ErrorContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '500px',
  padding: '10px',
  backgroundColor: 'whitesmoke',
  borderRadius: '20px', // Adjust the border radius as needed
  border: '7px solid lightgrey', // Add a black border
});

const StyledButton = styled(Button)({
  borderRadius: '20px', // Adjust the border radius as needed
  background: 'linear-gradient(45deg, #2196F3 0%, #21CBF3 100%)', // Add a light blue gradient
  color: 'purple', // Text color
});

export default ErrorPage;
