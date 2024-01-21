import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const NotificationsPage = () => {
  return (
    <Container sx={{ marginTop: '2rem' }}>
      <Paper elevation={3} sx={{ borderRadius: '15px', padding: '2rem' }}>
        <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
          Notifications
        </Typography>
        {/* Add your content here */}
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec velit at justo
          fermentum facilisis id quis leo. Ut venenatis elit quis ligula consectetur, in vulputate
          purus iaculis. Donec efficitur volutpat justo, a consectetur libero cursus vel.
        </Typography>
      </Paper>
    </Container>
  );
};

export default NotificationsPage;
