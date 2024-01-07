import React, { useState, useEffect } from 'react';
import { Typography, Box, Collapse, Paper, Avatar, Grid, Skeleton, } from '@mui/material';
import { styled } from '@mui/system';
import PeopleIcon from '@mui/icons-material/People';
import { API, graphqlOperation } from 'aws-amplify';
import { Link } from 'react-router-dom'; 
import { listEvents } from '../graphql/queries';
import { deleteEvent } from '../graphql/mutations';
     import { Storage } from 'aws-amplify';
     import  Button from '@mui/joy/Button'
     import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const Dashboard = ({userId}) => {
  const [events, setEvents] = useState([]);


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
              const isAdmin =(JSON.parse(event.participants)[0].userId=="admin")
              
             
              return { ...event, imgUrl,isAdmin };
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

  //DO NOT TOUCH
  useEffect(() => {

  
    fetchEvents();
  }, [userId]);
  

  //DELETE FUNCTION for deleting events
  const handleDelete = async (eventId) => {
    try {
      // Use GraphQL mutation to delete the event
      const response = await API.graphql(graphqlOperation(deleteEvent, { input: { id: eventId } }));

      // Log the response (you can handle success in your specific way)
      console.log('Event deleted successfully:', response);

      // Fetch the updated list of events after deletion
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };





  // Now 'events' state contains all the Event items
  const handleEventClick = (eventId) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };
  const [expandedEvent, setExpandedEvent] = useState(null);
  return (
    <DashboardContainer>
      
    <DashboardHeader elevation={3}> Welcome to Your Dashboard<Box>
    
        </Box>
 
        
        </DashboardHeader>
        <Box sx={{width:"100%"}}>
<Button component="a" href="/create" variant="soft" color="primary" sx={{width:"100%", borderRadius:"0px"}}>
            Create Event
          </Button>
        </Box>

    {events.map((event) => (
      
      <EventContainer key={event.id} elevation={3}>
        
        <EventBox onClick={() => handleEventClick(event.id)}>
          <Grid container>
        <Grid xs={4} >   <Typography sx={{fontSize:"14px",textAlign:"left"}}>{new Date(event.startTime).toLocaleString()}</Typography>
        </Grid>
        <Grid xs={5}> <Typography sx={{textAlign:"center"}}>{event.title}</Typography>
        </Grid>
        <Grid xs={3}>
        <ParticipantCount>
            {`${Object.keys(JSON.parse(event.participants)[0]).length}/${event.capacity}`}
            <PeopleIcon style={{ fontSize: '28px' }} />
          </ParticipantCount>
        </Grid>
          </Grid>
       
         
         
        </EventBox>

        <Collapse style={{ background: 'linear-gradient(to bottom right, rgba(74, 158, 226,0.1),rgba(90, 63, 192,0.1 ))' }} in={expandedEvent === event.id}>
  <Grid container >
    <Grid item xs={4} sx={ {border: '2px dashed #ccc'}}>
      {event.imgUrl ? (
        <img src={event.imgUrl} alt="Event Cover" style={{ width: '50%',margin:"10px", borderRadius: '8px' }} />
      ) : (
        <ImageSkeleton width={"50%"}  sx={{margin:"10px", borderRadius: '8px'}} animation="wave" variant="rectangular" />
      )}
      <Typography  sx={ {border: '2px dashed #ccc'}} style={{ marginTop: '10px' }}>Organizer: {event.organizer}</Typography>
    </Grid>
    <Grid item xs={8} sx={ {border: '2px dashed #ccc'}}>
      <EventDetails sx={ {border: '2px dashed #ccc'}}>
        <Typography>{event.description}</Typography>
      </EventDetails>
    </Grid>
  </Grid>
  {/* CHECKS IF the user is admin before providing delete button */}
  {JSON.parse(event.participants)[0][userId]["permissions"]=="admin"  ? (
  <Button
    onClick={() => {
      // handleDelete(event.id);
            console.log("USERID ", userId )

      console.log("EVENT ",JSON.parse(event.participants)[0] )
       console.log("EVENT ",JSON.parse(event.participants)[0][userId]["permissions"]=="admin" )
    }}
    startDecorator={<DeleteRoundedIcon />}
    color="danger"
    variant="soft"
    sx={{
      width: "100%",
      borderRadius: "0px",
      marginTop: "3%",
      "--Button-gap": "15px",
    }}
  >
    Delete this Event
  </Button>
) : null}

 
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
  alignItems: 'right',
  justifyContent:"right",

});

const ImageSkeleton = styled(Skeleton)({
  width: '100%',
  height: '100px',
  marginBottom: '10px',
});