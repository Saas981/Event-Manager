import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid, Paper } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/system';
import { API, graphqlOperation } from 'aws-amplify';
import { listEvents } from '../graphql/queries';

const StyledPaper = styled(Paper)({
  padding: '30px',
  marginBottom: '30px',
  borderRadius: '15px',
  background: 'linear-gradient(to bottom, #F5F5F5, #F3ECFF)',
});

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await API.graphql(graphqlOperation(listEvents, {
          filter: { private: { eq: false } },
        }));
        setEvents(response.data.listEvents.items);
      } catch (error) {
        console.error('Error fetching events:', error);
        // Handle error appropriately
      }
    };

    fetchEvents();
  }, []);

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
        {events.map(event => (
          <Grid item key={event.id} xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: '30px', marginBottom: '20px', minHeight: '300px', borderRadius: '11px', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'scale(1.05)', boxShadow: 8 } }}>
              {/* Render event details here */}
              <Typography variant="h6" sx={{ marginTop: '20px', color: '#000' }}>
                {event.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ color: '#000' }}>
                {event.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Button variant="contained" color="primary" size="large" endIcon={<ArrowForwardIcon />} component={Link} to="/Dashboard">
        Get Started Now
      </Button>
    </Container>
  );
};

export default Home;
