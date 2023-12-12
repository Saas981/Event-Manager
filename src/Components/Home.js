import React from 'react';
import { Container, Typography, Button, Grid, Skeleton, Paper } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Home = () => {
  return (
    <Container className="home-container" maxWidth="md" style={{ textAlign: 'center', }}>
      <Paper elevation={1} style={{ padding: '30px', marginBottom: '30px' }}>
        <Typography variant="h3" component="div" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', color: '#000' }}>
          Elevate Your Events with Ease
        </Typography>

        <Typography variant="h6" color="textSecondary" style={{ marginTop: '20px', color: '#000' }}>
          Simplify, Organize, and Manage Your Events Like Never Before
        </Typography>
      </Paper>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '30px', marginBottom: '20px', minHeight: '300px' }}>
            <Skeleton variant="rectangular" width="100%" height={150} animation="wave" style={{ borderRadius: '8px' }} />
            <Typography variant="h6" style={{ marginTop: '20px', color: '#000' }}>
              Effortless Event Creation
            </Typography>
            <Typography variant="body2" color="textSecondary" style={{ color: '#000' }}>
              Create events effortlessly with our user-friendly interface.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '30px', marginBottom: '20px', minHeight: '300px' }}>
            <Skeleton variant="rectangular" width="100%" height={150} animation="wave" style={{ borderRadius: '8px' }} />
            <Typography variant="h6" style={{ marginTop: '20px', color: '#000' }}>
              Efficient Invitations
            </Typography>
            <Typography variant="body2" color="textSecondary" style={{ color: '#000' }}>
              Invite participants using email addresses or usernames.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '30px', marginBottom: '20px', minHeight: '300px' }}>
            <Skeleton variant="rectangular" width="100%" height={150} animation="wave" style={{ borderRadius: '8px' }} />
            <Typography variant="h6" style={{ marginTop: '20px', color: '#000' }}>
              Streamlined RSVPs
            </Typography>
            <Typography variant="body2" color="textSecondary" style={{ color: '#000' }}>
              Easily manage and track RSVPs for your events.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        size="large"
        endIcon={<ArrowForwardIcon />}
        style={{ borderRadius: '12px', marginTop: '30px', backgroundColor: '#FF6B6B', color: '#fff' }}
      >
        Get Started Now
      </Button>
    </Container>
  );
};

export default Home;
