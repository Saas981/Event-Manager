import React, { useState, useEffect } from 'react';
import { Typography, Box, Collapse, Paper, Grid, Skeleton } from '@mui/material';
import { styled } from '@mui/system';
import PeopleIcon from '@mui/icons-material/People';
import { API, graphqlOperation } from 'aws-amplify';
import { listEvents, getEvent, updateEvent } from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { deleteEvent } from '../graphql/mutations';
import AddIcon from '@mui/icons-material/Add';
import { Storage } from 'aws-amplify';
import Button from '@mui/joy/Button';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Link } from 'react-router-dom';
import AccessTimeSharpIcon from '@mui/icons-material/AccessTimeSharp';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

import IconButton from '@mui/joy/IconButton';

const Dashboard = ({ userId, theme }) => {
  const [events, setEvents] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchEvents = async () => {
    try {
      const { data } = await API.graphql(graphqlOperation(listEvents));

      let moddedData = data.listEvents.items.filter((event) => {
        const participants = JSON.parse(event.participants);
        return participants[0].hasOwnProperty(userId);
      });

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
    }
  };

  const checkAdminStatus = async () => {
    try {
      const response = await API.graphql(graphqlOperation(getEvent, { id: "admin" }));
      const adminDetails = response.data.getEvent;
      const adminParticipants = JSON.parse(adminDetails.participants);

      setIsAdmin(adminParticipants[0].hasOwnProperty(userId) && adminParticipants[0][userId]["permissions"] === "admin");
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
    checkAdminStatus();
  }, [userId]);

  const handleDelete = async (eventId,imageName) => {
    try {
      const response = await API.graphql(graphqlOperation(deleteEvent, { input: { id: eventId } }));
      const fileResponse = await Storage.remove(imageName);
      console.log('Event deleted successfully:', response);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleLeave = async (eventId) => {
    try {
      const response = await API.graphql(graphqlOperation(getEvent, { id: eventId }));
      const eventDetails = response.data.getEvent;

      let participants = JSON.parse(eventDetails.participants);

      if (participants[0].hasOwnProperty(userId)) {
        const userIsAdmin = participants[0][userId]["permissions"] === "admin";

        if (userIsAdmin) {
          console.log('As the admin, you cannot leave your own event.');
        } else {
          delete participants[0][userId];

          const updateEventResponse = await API.graphql({
            query: mutations.updateEvent,
            variables: {
              input: {
                id: eventId,
                participants: JSON.stringify(participants),
              },
            },
          });

          console.log('Left the event:', updateEventResponse);
          fetchEvents();
        }
      } else {
        console.log('You are not a participant in this event.');
      }
    } catch (error) {
      console.error('Error leaving event:', error);
    }
  };

  const handleEventClick = (eventId) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };


  const handleEdit = (eventId) => {
    // Implement the logic for editing the event with the given eventId
    console.log(`Edit event with ID: ${eventId}`);
  };
  

  const [expandedEvent, setExpandedEvent] = useState(null);

  return (
    <DashboardContainer>
      <DashboardHeader elevation={3} sx={{}}>
        Welcome to Your Dashboard
        <Box sx={{ width: "100%", marginTop:"-10px" }}>
  <Button
    component="a"
    href="/create"
    variant="soft"
    color="primary"
    sx={{
      width: "80%",
      padding: "8px",
      borderRadius: "20px",
      backgroundColor: "#B5BBFD",
      color: "#40137D",
      fontFamily: "Poppins",
      fontSize: "24px",
            transition: "background-color 0.3s ease", // Fade transition on background color

      '&:hover': {
        backgroundColor: '#a7aefc', // Shade of purple on hover

      },
    }}
  >
    <AddIcon sx={{ fontSize: "32px" }} />
    Create Event
  </Button>
</Box>

         
      </DashboardHeader>

     

      {events.map((event) => (
        

<EventContainer key={event.id} elevation={3} sx={{ position: "relative" }}>
  {JSON.parse(event.participants)[0][userId]["permissions"] === "waitlist" ? (
   <IconButton
   onClick={() => {
     console.log("You're in a waitlist");
   }}
   variant="soft"
   sx={{
     position: "absolute",
     top: "-25px",
     right: "-15px", // Align to the right corner
     width: "50px",
     height: "50px",
     borderRadius: "50px",
     margin: "10px", // Adjust margin as needed
     backgroundColor: "#f4c692", // Yellow background color
     color: "#422c11", // Yellow text color
     "--Button-gap": "5px",
     fontFamily: "Poppins",
     zIndex: 1, // Make sure it's above other content
     transition: "background-color 0.3s ease, color 0.3s ease", // Fade transition on background and text color
     '&:hover': {
       backgroundColor: '#f2c48f', // Slightly darker yellow on hover
       color: '#7a5426', // Slightly darker yellow text on hover
     },
   }}
 >
   <AccessTimeSharpIcon sx={{ fontSize: "32px" }} />
 </IconButton>
 
  ) : null}
          <EventBox onClick={() => handleEventClick(event.id)}>
            {/* Details half */}
            <Grid container  direction="row"
  justifyContent="space-evenly"
>
              {/* <Grid xs={4}>
                <Typography sx={{ fontSize: "14px", textAlign: "left" }}>{new Date(event.startTime).toLocaleString()}</Typography>
              </Grid> */}
              <Grid xs={10} sx={{alignItems:"right"}}>
                <Typography sx={{ textAlign: "left",fontFamily:"Poppins",fontWeight:"600",fontSize:"28px",marginLeft:"0.2%" }}>{event.title}</Typography>
              </Grid>
              <Grid xs={1}     

>
                
                <ParticipantCount>
                  
                  {`${Object.keys(JSON.parse(event.participants)[0]).length}/${event.capacity}`}
                  <PeopleIcon style={{ fontSize: '28px',marginRight:"5%" }} />

                   {JSON.parse(event.participants)[0][userId]["permissions"] === "admin" && (
    <IconButton
      aria-label="Edit Event"
      component="a"
      href={`/edit/${event.id}`}
      color="neutral"
      
      sx={{
        padding: 1, // Adjust padding as needed
        marginTop:"-6%",
  
      }}
    >
      <EditTwoToneIcon  sx={{

        fontSize:"18px"
      }}/>
    </IconButton>
  )}
                </ParticipantCount>
              </Grid>
            </Grid>
          </EventBox>

      
            <Grid container direction="row"
  justifyContent="flex-end" sx={{marginBottom:"0px"}}>
               {/* half description */}
               <Grid item xs={7.5} sx={{ textAlign: "left", display: "flex", flexDirection: "column",marginTop:"1%", justifyContent: "space-between" }}>
  <div>
    <Typography sx={{ marginTop: '10px', fontFamily: "Poppins", fontWeight: "500", textAlign: "left", marginLeft: "7%" }}>Organizer: {event.organizer}</Typography>
    <Typography sx={{ marginTop: '10px', fontFamily: "Poppins", fontWeight: "400", textAlign: "left", marginLeft: "7%" }}> {new Date(event.startTime).toLocaleString()}</Typography>

    <EventDetails>
      <Typography sx={{ backgroundColor: "#f9f9f9", fontFamily: 'Poppins, sans-serif', fontSize: "15px", padding: "8px", borderRadius: "10px", color: "#3f3f3f" }}>{event.description}</Typography>
    </EventDetails>
  </div>



  {/* <Typography sx={{ fontSize: "14px", marginTop: '10px', marginBottom: '10px', fontFamily: "Poppins", fontWeight: "400", textAlign: "left", marginLeft: "7%", color: "#3f3f3f" }}>
    {new Date(event.startTime).toLocaleString()}
  </Typography> */}

    <Button variant="soft"  component={Link}// Use Link component from react-router-dom
   to={`/event/${event.id}`}  onClick={() => { console.log("nothing happened") }} size="sm" sx={{
    fontSize: "14px",
    padding: "3px 10px",
    backgroundColor: "#B5BBFD",
    color: "#40137D",
    fontWeight: "600",
   
    marginBottom:"20px",
    borderRadius:"15px",
    fontFamily: "Poppins",
    width: "85%",
    transition: "background-color 0.3s ease", // Fade transition on background color
    '&:hover': {
      backgroundColor: '#a7aefc', // Shade of purple on hover
    },
    mx: "auto", // Center the button horizontally
  }}>
    See more
  </Button>
</Grid>





              {/* Image half */}
              <Grid item xs={4.5} sx={{padding:"0px",backgroundColor:"#fafafa" }}>
                {event.imgUrl ? (
                  <img src={event.imgUrl} alt="Event Cover" style={{ objectFit:"cover", alignSelf:"flex-end" ,  width: '90%',height:"200px", margin: "10px", borderRadius: '8px' }} />
                ) : (
                  <ImageSkeleton width={"50%"} sx={{ margin: "10px", borderRadius: '8px' }} animation="wave" variant="rectangular" />
                )}
               
               
              </Grid>

             
            </Grid>



{ 1==1 &&(
   <>

   {/* Waitlist button */}
        {JSON.parse(event.participants)[0][userId]["permissions"] === "waitlist" ? (
              <Button
                onClick={() => {
                  console.log("You're in a waitlist");
                }}
                startDecorator={<AccessTimeSharpIcon />}
                color="warning"
                variant="soft"
                sx={{
                
                fontSize:"14px",
                  width: "100%",
                  borderRadius: "0px",
                  marginTop: "1%",
                  "--Button-gap": "5px",
                  fontFamily: "Poppins",
                }}
              >
                You're on the waitlist
              </Button>
            ) : null}

  

           {/* Leave Event Button */}
{!isAdmin && JSON.parse(event.participants)[0][userId] && JSON.parse(event.participants)[0][userId]["permissions"] !== "admin" && (
  <Button
    onClick={() => handleLeave(event.id)}
    color="primary"
    variant="soft"
    sx={{
      width: "100%",
    }}
  >
    Leave
  </Button>
)}







            {/* CHECKS IF the user is admin before providing delete button */}
            {JSON.parse(event.participants)[0][userId]["permissions"] === "admin" && !isAdmin ? (
              <Button
                onClick={() => handleDelete(event.id,event.coverImage)}
                startDecorator={<DeleteRoundedIcon />}
                color="danger"
                variant="soft"
                sx={{
                  width: "100%",
                }}
              >
                Delete this Event
              </Button>
            ) : null}


</>

)
      }

          

          
        </EventContainer>
      ))}
    </DashboardContainer>
  );
};

export default Dashboard;

const DashboardContainer = styled(Box)({
  textAlign: 'center',
  marginBottom: '20px',
  width: '65%',
padding:"0px",
background:"none",
  // background: 'linear-gradient(to right, rgba(80, 63, 159,0.1), rgba(255, 81, 181,0.1))',
  // boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.3)',
});

const DashboardHeader = styled(Paper)({
  width: '100%',
  margin: '0 auto',
  borderRadius: '20px',
  background: '#f8f8f8',
  color: "#0f0f0f",
  fontSize: '54px',
  fontWeight: '900',
  fontFamily: 'Poppins, sans-serif',
  padding: '25px 0px',
  marginBottom: '20px',
});


const EventContainer = styled(Paper)({
  width: '100%',
  margin: '0 auto 20px auto',
  borderRadius: '20px',
  fontFamily: 'Poppins, sans-serif',
  color: '#000',
  cursor: 'pointer',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',

});

const EventBox = styled(Box)({
  margin: '0px 0',
  padding: '12px 0px',
  display: 'flex',
  fontFamily: 'Poppins, sans-serif',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: '#EFEFEF',
  borderTopRightRadius: '20px',
    borderTopLeftRadius: '20px',
  '& > *': {
    fontFamily: 'inherit',
    fontSize: '18px',
  },
  cursor: 'pointer',
});

const EventDetails = styled(Box)({
  
  fontFamily: 'Poppins, sans-serif',
  marginLeft:"6%",
  marginTop:"1%",
  height:"100%",
  marginRight:"10px",
});

const ParticipantCount = styled(Box)({
  display: 'flex',
  fontFamily: 'Poppins, sans-serif',
  alignItems: 'right',
  fontWeight:"500",
  marginTop:"10px",

});

const ImageSkeleton = styled(Skeleton)({
  width: '100%',
  height: '100px',
  marginBottom: '20px',
});

