import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import ChatRoom from './ChatRoom'; // Adjust the path based on your project structure

const EventDashboard = ({theme,user,userData}) => {
  return (
    <Container maxWidth="100%">
      {/* <Typography variant="h4" align="center" style={{ marginTop: '20px' }}>
        Event Dashboard
      </Typography> */}

      {/* Your existing content for the event dashboard goes here */}

      {/* ChatRoom component */}
      <Grid container spacing={2} style={{ marginTop: '20px',width:"100%" }}>
        <Grid item xs={12}>
          <ChatRoom />
        </Grid>
      </Grid>
    </Container>
  );
};

export default EventDashboard;
