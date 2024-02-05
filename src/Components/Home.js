import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid, Paper,Skeleton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/system';
import { API, graphqlOperation } from 'aws-amplify';
import { listEvents } from '../graphql/queries';
import { Storage } from 'aws-amplify';


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
        let moddedData = response.data.listEvents.items

        moddedData = await Promise.all(
          moddedData.map(async (event) => {
            if (event.coverImage) {
              try {
                const imgUrl = await Storage.get("eventCovers/"+event.coverImage);
                const userIsAdmin = JSON.parse(event.participants)[0].userId === "admin";
                const isWaitlisted = JSON.parse(event.participants)[0].userId === "admin";
  
                return { ...event, imgUrl, userIsAdmin, isWaitlisted };
              } catch (error) {
                console.error('Error fetching image URL:', error);
              }
            }
  
            return event;
          })
        );

        setEvents(moddedData);
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
          <>
          <Grid item key={event.id} xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: '30px', marginBottom: '20px', minHeight: '300px', borderRadius: '11px', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'scale(1.05)', boxShadow: 8 } }}>
              {/* Render event details here */}
              
              <Typography variant="h6" sx={{ marginTop: '0px', color: '#000',fontFamily:"Poppins" }}>
                {event.title}
              </Typography>
              {event.imgUrl ? (
                  <img src={event.imgUrl} alt="Event Cover" style={{ objectFit:"cover", alignSelf:"flex-end" ,  width: '90%',height:"200px", margin: "10px", borderRadius: '8px' }} />
                ) : (
                  <ImageSkeleton width={"50%"} sx={{ margin: "10px", borderRadius: '8px' }} animation="wave" variant="rectangular" />
                )}
              <Typography variant="body2" color="textSecondary" sx={{ color: '#000',fontFamily:"Poppins",backgroundColor:"#f8f8f8",borderRadius:"10px",padding:1 }}>
                {event.description}
              </Typography>

            </Paper>
          </Grid>
 
          </>
        ))}
      </Grid>

      <Button variant="contained" color="primary" size="large" endIcon={<ArrowForwardIcon />} component={Link} to="/Dashboard">
        Get Started Now
      </Button>
    </Container>
  );
};

export default Home;


const ImageSkeleton = styled(Skeleton)({
  width: '100%',
  height: '100px',
  marginBottom: '20px',
});