import React, { useState, useEffect } from 'react';
import { Typography, Box, Collapse, Paper, Avatar, Grid, Skeleton,Button } from '@mui/material';
import { styled } from '@mui/system';
import PeopleIcon from '@mui/icons-material/People';
import { API, graphqlOperation } from 'aws-amplify';
import { Link } from 'react-router-dom'; 
import { listEvents } from '../graphql/queries';
     import { Storage } from 'aws-amplify';

const Dashboard = ({userId}) => {
  const [events, setEvents] = useState([]);


  //DO NOT TOUCH
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("FETCHING GRAPHQL API");
        const { data } = await API.graphql(graphqlOperation(listEvents));
  
        //ONLY SHOW TO People that can view it which are participants
        let moddedData = data.listEvents.items.filter(event => {
          // Convert participants from string to object
          const participants = JSON.parse(event.participants);
              
          // Check if userId exists in participants object keys
          return participants[0].hasOwnProperty(userId);
        });

        moddedData = await Promise.all(moddedData.map(async (event) => {
          console.log("COVER IAMGE ", event)
          if (event.coverImage) {
            // If coverImage attribute is present, fetch the URL
            try {
              const imgUrl = await Storage.get(event.coverImage);
              // Add the imgUrl attribute to the event object
             
              return { ...event, imgUrl };
            } catch (error) {
              console.error('Error fetching image URL:', error);
              // Handle error appropriately
            }
          }
        
          // If coverImage is not present, return the event object without changes
          return event;
        }));

     
        console.log("Filtered Data:", moddedData);
        setEvents(moddedData)
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
  
    fetchEvents();
  }, [userId]);
  







  // Now 'events' state contains all the Event items
  const handleEventClick = (eventId) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };
  const [expandedEvent, setExpandedEvent] = useState(null);
  return (
    <DashboardContainer>
      
    <DashboardHeader elevation={3}> Welcome to Your Dashboard<Box>
    <Button component={Link} to="/create" variant="" color="primary">
            Create Event
          </Button>
        </Box>
 
        
        </DashboardHeader>

    {events.map((event) => (
      <EventContainer key={event.id} elevation={3}>
        <EventBox onClick={() => handleEventClick(event.id)}>
          <Typography>{event.date}</Typography>
          <Typography>{event.title}</Typography>
          <ParticipantCount>
            {`${Object.keys(JSON.parse(event.participants)[0]).length}/${event.capacity}`}
            <PeopleIcon style={{ fontSize: '28px' }} />
          </ParticipantCount>
        </EventBox>

        <Collapse style={{ background: 'linear-gradient(to bottom right, rgba(74, 158, 226,0.1),rgba(90, 63, 192,0.1 ))' }} in={expandedEvent === event.id}>
  <Grid container spacing={2}>
    <Grid item xs={4}>
      {event.imgUrl ? (
        <img src={event.imgUrl} alt="Event Cover" style={{ width: '50%',margin:"10px", borderRadius: '8px' }} />
      ) : (
        <ImageSkeleton width={"50%"}  sx={{margin:"10px", borderRadius: '8px'}} animation="wave" variant="rectangular" />
      )}
      <Typography style={{ marginTop: '10px' }}>Organizer: {event.author}</Typography>
    </Grid>
    <Grid item xs={8}>
      <EventDetails>
        <Typography>{event.description}</Typography>
      </EventDetails>
    </Grid>
  </Grid>
</Collapse>

      </EventContainer>
    ))}
   
  </DashboardContainer>
  
  );
};

export default Dashboard;








const DashboardContainer = styled(Box)({
  textAlign: 'center',
  marginTop: '20px',
  width: '50%',
  background: 'linear-gradient(to right, rgba(80, 63, 159,0.1), rgba(255, 81, 181,0.1))',
  boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.3)',
});
const DashboardHeader = styled(Paper)({
  width: '90%',
  margin: '0 auto',


  borderRadius: '0px',
  borderBottomLeftRadius: '5px',
  borderBottomRightRadius: '10px',
  background: 'linear-gradient(to bottom right, rgba(74, 158, 226,0.6),rgba(90, 63, 192,0.6))',
  color:"#f8f8f8",
  fontSize: '24px',
  fontWeight: 'bold',
  fontFamily: 'Poppins, sans-serif',
  '& > *': {
    fontFamily: 'inherit',
    fontSize: '18px',
  },
  padding: '5%',
});

const EventContainer = styled(Paper)({
  width: '100%',
  margin: '0 auto',

  borderRadius: '0px',
  borderBottomLeftRadius: '5px',
  borderBottomRightRadius: '10px',
  fontFamily: 'Poppins, sans-serif',
  color: '#000',
  cursor: 'pointer',

  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',

});


const EventBox = styled(Box)({
  margin: '0px 0',
  width: '90%',

  borderBottom: '1px solid #BDBDBD',
  padding: '10px 0',
  padding: '5%',
  display: 'flex',
  fontFamily: 'Poppins, sans-serif',
  alignItems: 'center',
  background: 'linear-gradient(to bottom right, rgba(74, 158, 226,0.3),rgba(90, 63, 192,0.3))',
  '& > *': {
    fontFamily: 'inherit',
    fontSize: '18px',
  },
  justifyContent: 'space-between',
  cursor: 'pointer',
});


const EventDetails = styled(Box)({
  padding: '10px',
  fontFamily: 'Poppins, sans-serif',

});

const ParticipantCount = styled(Box)({
  display: 'flex',
  fontFamily: 'Poppins, sans-serif',
  alignItems: 'center',
});

const ImageSkeleton = styled(Skeleton)({
  width: '100%',
  height: '100px',
  marginBottom: '10px',
});