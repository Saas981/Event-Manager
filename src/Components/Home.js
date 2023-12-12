import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Tooltip,
  Box,
  IconButton,
  Avatar,
  Skeleton,
} from '@mui/material';
import '@fontsource/poppins'; // Import Poppins font
import EventIcon from '@mui/icons-material/Event'; // Import Material-UI Event icon
import AlarmOnIcon from '@mui/icons-material/AlarmOn'; // Import Material-UI AlarmOn icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Import Material-UI AccountCircle icon
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'; // Import Material-UI KeyboardArrowRight icon

const Home = () => {
  return (
    <Container className="home-container" maxWidth="lg">
      <Box textAlign="center" my={4}>
        <Typography variant="h2" component="div" gutterBottom style={{ fontFamily: 'Poppins, sans-serif' }}>
          Welcome to Your Event Manager
        </Typography>
        <Typography variant="h5" color="textSecondary" component="div" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Simplify, Organize, and Manage Your Events with Ease
        </Typography>
      </Box>

      {/* Features Section */}
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3} className="feature-card">
            <CardContent>
              <Avatar className="feature-icon">
                <EventIcon />
              </Avatar>
              <Typography variant="h6" className="feature-title">Easy Event Creation</Typography>
              <Typography variant="body2" color="textSecondary">
                Create events effortlessly with our user-friendly interface.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3} className="feature-card">
            <CardContent>
              <Avatar className="feature-icon">
                <AlarmOnIcon />
              </Avatar>
              <Typography variant="h6" className="feature-title">Efficient Invitations</Typography>
              <Typography variant="body2" color="textSecondary">
                Invite participants using email addresses or usernames.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3} className="feature-card">
            <CardContent>
              <Avatar className="feature-icon">
                <AccountCircleIcon />
              </Avatar>
              <Typography variant="h6" className="feature-title">Streamlined RSVPs</Typography>
              <Typography variant="body2" color="textSecondary">
                Easily manage and track RSVPs for your events.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* CTA Section */}
      <Box textAlign="center" my={4}>
        <Typography variant="h4" gutterBottom style={{ fontFamily: 'Poppins, sans-serif' }}>
          Ready to Get Started?
        </Typography>
        <Button variant="contained" color="primary" endIcon={<KeyboardArrowRightIcon />}>
          Sign Up Now
        </Button>
      </Box>

      {/* Image Section with Skeleton */}
      <Box textAlign="center" my={4}>
        <Skeleton variant="rectangular" width="100%" height={400} animation="wave" />
      </Box>

      {/* Tooltip Section */}
      <Box textAlign="center" my={4}>
        <Tooltip title="Explore Features" arrow>
          <IconButton color="primary" size="large">
            <i className="fas fa-info-circle"></i>
          </IconButton>
        </Tooltip>
      </Box>
    </Container>
  );
};

export default Home;
