import React from 'react';
import { Container, Typography } from '@mui/material';

const UnauthorizedPage = () => {
  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh', // Adjust the height based on your design preference
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        Not Authorized
      </Typography>
      <Typography
        variant="body1"
        align="center"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        You do not have permission to access this page.
      </Typography>
      {/* You can add more styling or components as needed */}
    </Container>
  );
};

export default UnauthorizedPage;
