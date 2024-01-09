import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid, Skeleton, Paper } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)({
  padding: '30px',
  marginBottom: '30px',
  borderRadius: '15px',
  background: 'linear-gradient(to bottom, #F5F5F5, #F3ECFF)', // Gradient background
});

const FeaturePaper = styled(Paper)({
  padding: '30px',
  marginBottom: '20px',
  minHeight: '300px',
  borderRadius: '11px',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Improved shadow on hover
  },
});

const GradientButton = styled(Button)({
  borderRadius: '12px',
  marginTop: '30px',
  background: 'linear-gradient(to right, #FF6B6B, #FF8E53)',
  color: '#fff',
  '&:hover': {
    background: 'linear-gradient(to right, #FF8E53, #FF6B6B)', // Gradient change on hover
  },
});

const Home = () => {
  return (
    <Container className="home-container" maxWidth="md" style={{ textAlign: 'center' }}>
    <StyledPaper elevation={3}>
      <Typography variant="h3" component="div" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', color: '#333' }}>
        Elevate Your Events with Ease
      </Typography>
      <Typography variant="h6" color="textSecondary" style={{ marginTop: '20px', color: '#555' }}>
        Simplify, Organize, and Manage Your Events Like Never Before
      </Typography>
    </StyledPaper>

      <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} md={4}>
        <FeaturePaper
          elevation={3}
          sx={{
            padding: '30px',
            marginBottom: '20px',
            minHeight: '300px',
            borderRadius: '11px',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 8, // Adjust the shadow as needed
            },
          }}
        >
          <Skeleton variant="rectangular" width="100%" height={150} animation="wave" sx={{ borderRadius: '8px' }} />
          <Typography variant="h6" sx={{ marginTop: '20px', color: '#000' }}>
            Effortless Event Creation
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ color: '#000' }}>
            Create events effortlessly with our user-friendly interface.
          </Typography>
        </FeaturePaper>
      </Grid>

      <Grid item xs={12} md={4}>
        <FeaturePaper
          elevation={3}
          sx={{
            padding: '30px',
            marginBottom: '20px',
            minHeight: '300px',
            borderRadius: '11px',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 8, // Adjust the shadow as needed
            },
          }}
        >
          <Skeleton variant="rectangular" width="100%" height={150} animation="wave" sx={{ borderRadius: '8px' }} />
          <Typography variant="h6" sx={{ marginTop: '20px', color: '#000' }}>
            Efficient Invitations
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ color: '#000' }}>
            Invite participants using email addresses or usernames.
          </Typography>
        </FeaturePaper>
      </Grid>

      <Grid item xs={12} md={4}>
        <FeaturePaper
          elevation={3}
          sx={{
            padding: '30px',
            marginBottom: '20px',
            minHeight: '300px',
            borderRadius: '11px',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 8, // Adjust the shadow as needed
            },
          }}
        >
          <Skeleton variant="rectangular" width="100%" height={150} animation="wave" sx={{ borderRadius: '8px' }} />
          <Typography variant="h6" sx={{ marginTop: '20px', color: '#000' }}>
            Streamlined RSVPs
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ color: '#000' }}>
            Easily manage and track RSVPs for your events.
          </Typography>
        </FeaturePaper>
      </Grid>
    </Grid>

    <GradientButton
        variant="contained"
        color="primary"
        size="large"
        endIcon={<ArrowForwardIcon />}
        component={Link} to="/Dashboard" 
      >
        Get Started Now
      </GradientButton>
    </Container>
  );
};

export default Home;
