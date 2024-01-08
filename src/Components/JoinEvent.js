import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Typography, 
  Container, 
  Grid, 

  Avatar,
  Paper,
  Stack,
  Box,
  Divider
} from '@mui/material';
import  Button from '@mui/joy/Button'
import { API, graphqlOperation } from 'aws-amplify';
import { getEvent } from '../graphql/queries';
import EventIcon from '@mui/icons-material/Event';
import { Storage } from 'aws-amplify';
import { updateEvent } from '../graphql/mutations';
import PersonIcon from '@mui/icons-material/Person';

const JoinEventPage = ({user,theme}) => {
  const { eventId } = useParams();
  const[load,setLoad]= React.useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  console.log("USER ID ",user)

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const { data } = await API.graphql(graphqlOperation(getEvent, { id: eventId }));
        const participants = JSON.parse(data.getEvent.participants);
                console.log("USER ID ",user)
                console.log("PARTICIPATNS ",participants[0])
                console.log("HAS PROPERTY ",participants[0].hasOwnProperty(`user`))
            // Check if userId exists in participants object keys
          if( participants[0].hasOwnProperty(user)){
            console.log("CHANGING HREF")
            window.location.href = "/dashboard"
          }
    
        let moddedData = data.getEvent;
            if (moddedData.coverImage) {
              // If coverImage attribute is present, fetch the URL
              try {
                const imgUrl = await Storage.get(moddedData.coverImage);
                // Add the imgUrl attribute to the event object
               
               moddedData= {...moddedData, imgUrl };
              } catch (error) {
                console.error('Error fetching image URL:', error);
                // Handle error appropriately
              }
            }
 
        setEventDetails(moddedData);
        
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [eventId,user]);



  
 const handleJoin = async () => {
  try {
    // Create a copy of the eventDetails to avoid modifying the state directly
    const updatedEventDetails = { ...eventDetails };
    setLoad(true);
    // Access the participants object and add the user with permissions
    let participants = JSON.parse( updatedEventDetails.participants)
    participants[0][user] = { permissions: 'view' };
    updatedEventDetails.participants =participants
console.log("NEW PARTICIPANTS ",participants)
    // Update the state with the modified eventDetails
    setEventDetails(updatedEventDetails);

    // Perform the GraphQL mutation to update the event with the new participants
    const updateEventResponse = await API.graphql({
      query: updateEvent,
      variables: {
        input: {
          id: eventId,
          participants: JSON.stringify(updatedEventDetails.participants),
        },
      },
    });

    console.log('Event updated:', updateEventResponse);
    setTimeout(() => {
        // After 3 seconds, set createLoadButton to false and redirect to the dashboard
        setLoad(false);
    
        // window.location.href = '/dashboard';
      
      }, 2000);
    // Redirect to the dashboard after joining
    window.location.href = '/dashboard';
  } catch (error) {
    console.error('Error joining event:', error);
    // Handle error appropriately
  }
};

  const handleReject = () => {
    // Handle reject event logic
    console.log('Reject Event clicked');
    window.location.href = '/dashboard';
  };

  return (
    <Container>
        
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ paddingTop: '20px' }}
      >
        
        <Paper elevation={3} style={{  borderRadius: '12px', backgroundColor: '#fff', maxWidth: '600px' }}>
          {eventDetails && (
            <>
                       <Box
   sx={{  width:"auto",   
      backgroundColor: '#f4f4f4',
   borderRadius: '10px',
   borderBottomLeftRadius:'0px',
   WebkitBorderBottomRightRadius:'0px',
   padding: '25px',
 
   paddingBottom:'20px',
   background: "linear-gradient(to bottom,rgba(74, 158, 226,0.6),rgba(90, 63, 192,0.6))",
   boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
   }}
   >
    
     <Typography level="h2" style={{ color:"#fafafa",fontSize:"20px", fontWeight:"550", marginLeft: '10px', fontFamily: 'Inter, sans-serif' }}>
              Do you want to join this event?
            </Typography>
     </Box>
              {/* Blue Gradient Tab */}
   

              {/* Event Title */}
              <Box sx={{paddingBottom:"12px",borderRadius:"10px",margin:"0px 0px",borderTopLeftRadius:"10px",borderTopRightRadius:"10px"}}>
           
           
             <Box sx={{margin:"4px",marginTop:"2px",border: '2px dashed #ccc'}}>
              <Grid container  sx={{ border: '2px dashed #ccc',opacity:0.8,paddingBottom:"5px",margin:"0px 00px",backgroundColor:"#dfdfdf"}}>
              <Grid xs={1}>
<img src={eventDetails.imgUrl} alt="Event Cover" style={{marginTop: '25%',height:"35px", margin:"10px",marginBottom:"-20px", borderRadius: '8px' }} />

            </Grid>
            <Grid xs={11} >
            <Typography variant="h4" gutterBottom sx={{opacity:0.8,paddingLeft: '20px',fontSize:"28px", marginBottom: '5px',paddingTop:"15px", fontFamily: 'Inter', fontWeight: '400', background: 'linear-gradient(to bottom,rgba(88, 94, 96,1.2),rgba(93, 80, 82,1.2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
  {eventDetails.title}
</Typography>
            </Grid>
           

              </Grid>
             


              {/* Organizer and Start Time */}
              <Stack direction="row" spacing={2} alignItems="center" marginBottom={2} sx={{padding: '30px',paddingLeft:"10px",paddingBottom:"20px",margin:"0px 0px",backgroundColor:"#f1f1f1"}}>
                <Avatar src={eventDetails.organizerAvatar} alt="Organizer Avatar" />
                <Typography sx={{fontFamily: 'Inter, sans-serif'}} variant="subtitle1">{eventDetails.organizer}</Typography>
                <Divider orientation="vertical" flexItem />
                <EventIcon />
                <Typography variant="subtitle1" sx={{fontFamily: 'Inter, sans-serif'}}>
                  {new Date(eventDetails.startTime).toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                  })}
                </Typography>
              </Stack>
</Box>


              <Stack direction="row" spacing={2} sx={{ padding: '10px', justifyContent: 'flex-center',paddingRight:"40px",backgroundColor:"#f8f8f8" }}>
  <Button variant="soft" color="danger" sx={{width:"100%"}}onClick={handleReject}>
    Reject
  </Button>
  {load?(
    <Button loading variant="solid" color="success" sx={{width:"100%"}}onClick={handleJoin}>
    Join
  </Button>
  ):(
    <Button variant="soft" color="success" sx={{width:"100%"}}onClick={handleJoin}>
    Join
  </Button>
  )}
</Stack>
              </Box>
           
              {/* Join and Reject Buttons */}
              

            </>
          )}
        </Paper>
      </Grid>
    </Container>
  );
};

export default JoinEventPage;
