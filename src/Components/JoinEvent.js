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
import Button from '@mui/joy/Button';
import { API, graphqlOperation } from 'aws-amplify';
import { getEvent, listEvents } from '../graphql/queries';
import EventIcon from '@mui/icons-material/Event';

import { Storage } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import AccessTimeSharpIcon from '@mui/icons-material/AccessTimeSharp';

const JoinEventPage = ({ user, theme }) => {
  const { eventId } = useParams();
  const [load, setLoad] = React.useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  const [isCapacityFull, setIsCapacityFull] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // const response =  await API.post('EventAPI', '/items/encrypt', {
        //   body: {
        //     data: eventId,
        //   },
        // });
        // // Log the response from the Lambda function
        // console.log('Lambda function response:', response.encryptedData);
        // const response2 =  await API.post('EventAPI', '/items/decrypt', {
        //   body: {
        //     data: eventId,
        //   },
        // });
        // console.log('Lambda function response:', response2);
        if (eventId.length>1 && eventId.length<8) { 
          window.location.href="/Error404"
          
          
        }

        const { data } = await API.graphql({
          query: listEvents,
          variables: {
            filter: { id: { beginsWith: eventId } },
          },
          authMode: 'AMAZON_COGNITO_USER_POOLS', // Specify the authentication mode
        });
        console.log('DATA A412S',data.listEvents.items[0])
                if (!data.listEvents.items[0]) { 
          window.location.href="/Error404"
          
          
        }
        const participants = JSON.parse(data.listEvents.items[0].participants);
        
        if (participants[0].hasOwnProperty(user)) {
          window.location.href = "/dashboard";
        }
        

        let moddedData = data.listEvents.items[0];
        console.log("Join Event Data", moddedData);

        if (moddedData.coverImage) {
          try {
            const imgUrl = await Storage.get("eventCovers/"+moddedData.coverImage);
            moddedData = { ...moddedData, imgUrl };
          } catch (error) {
            console.error('Error fetching image URL:', error);
          }
        }

        setEventDetails(moddedData);
        

      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [eventId, user]);  

  useEffect(() => {
    if (eventDetails && eventDetails.capacity) {
      const currentParticipantsCount = Object.keys(JSON.parse(eventDetails.participants)[0]).length;
      setIsCapacityFull(currentParticipantsCount >= eventDetails.capacity);
    }
  }, [eventDetails]);

  const handleJoin = async () => {
    try {
      if (isCapacityFull) {
        // Show an error message to the user
        console.log('Event capacity is full. Cannot join.');
        return;
      }

      const updatedEventDetails = { ...eventDetails };
      setLoad(true);

      let participants = JSON.parse(updatedEventDetails.participants);

      const currentParticipantsCount = Object.keys(participants[0]).length;
      const eventCapacity = updatedEventDetails.capacity;

      if (currentParticipantsCount >= eventCapacity) {
        setLoad(false);
        console.log("Event capacity is full. Cannot join.");
        return;
      }

      participants[0][user] = { permissions: 'view' };
      updatedEventDetails.participants = participants;

      const updateEventResponse = await API.graphql({
        query: mutations.updateEvent,
        variables: {
          input: {
            id: eventId,
            participants: JSON.stringify(updatedEventDetails.participants),
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });

      console.log('Event updated:', updateEventResponse);

      setTimeout(() => {
        setLoad(false);
        // window.location.href = '/dashboard';
      }, 2000);

      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error joining event:', error);
    }
  };




  const handleReject = () => {
    console.log('Reject Event clicked');
    window.location.href = '/dashboard';
  };

  const handleWaitlist = async () => {
    console.log('Joining waitlist...');
    //Loading and duplicate eventDetails
      const updatedEventDetails = { ...eventDetails };
      setLoad(true);

      //Extract paritcipants
      let participants = JSON.parse(updatedEventDetails.participants);
      participants[0][user] = { permissions: 'waitlist' };
      updatedEventDetails.participants = participants;

      const updateEventResponse = await API.graphql({
        query: mutations.updateEvent,
        variables: {
          input: {
            id: eventId,
            participants: JSON.stringify(updatedEventDetails.participants),
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });

      console.log('Event updated:', updateEventResponse);

      setTimeout(() => {
        setLoad(false);
        // window.location.href = '/dashboard';
      }, 2000);

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
        <Paper elevation={3} style={{ borderRadius: '12px', backgroundColor: '#fff', maxWidth: '600px' }}>
          {eventDetails && (
            <>
              <Box
                sx={{
                  width: "auto",
                  backgroundColor: '#f4f4f4',
                  borderRadius: '10px',
                  borderBottomLeftRadius: '0px',
                  WebkitBorderBottomRightRadius: '0px',
                  padding: '20px',
                  paddingBottom: '15px',
                  background: "linear-gradient(to bottom,rgba(74, 158, 226,0.6),rgba(90, 63, 192,0.6))",
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
                }}
              >


                {isCapacityFull?(
                  <>
                    <Typography level="h2" style={{ color: "#fafafa", fontSize: "25px", fontWeight: "550", marginLeft: '5px', fontFamily: 'Inter, sans-serif' }}>
                  This Event is Full! 
                </Typography>
                <Typography level="h4" style={{ color: "#fafafa",fontSize:"10px",  fontWeight: "400", marginLeft: '10px', fontFamily: 'Inter, sans-serif' }}>
                  Please Join the Waitlist.
                </Typography>
                
                </>

                ):(
                  <>
                     <Typography level="h2" style={{ color: "#fafafa", fontSize: "25px", fontWeight: "550", marginLeft: '5px', fontFamily: 'Inter, sans-serif' }}>
                  You've Been Invited to {eventDetails.title}!
                </Typography>
                <Typography level="h4" style={{ color: "#fafafa",fontSiae:"10px",  fontWeight: "400", marginLeft: '10px', fontFamily: 'Inter, sans-serif' }}>
                   Do you want to join this event?
                </Typography>

                  </>
                )}
              
              </Box>
                <Box sx={{ paddingBottom: "12px", borderRadius: "10px", margin: "0px 0px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>

                <Box sx={{ margin: "4px", marginTop: "2px", border: '2px dashed #ccc' }}>
                  <Grid container sx={{ border: '2px dashed #ccc', opacity: 0.8, paddingBottom: "5px", margin: "0px 00px", backgroundColor: "#dfdfdf" }}>
                    <Grid xs={1}>
                      <img src={eventDetails.imgUrl} alt="Event Cover" style={{ marginTop: '25%', height: "35px", margin: "10px", marginBottom: "-20px", borderRadius: '8px' }} />
                    </Grid>
                    <Grid xs={11} >
                      <Typography variant="h4" gutterBottom sx={{ opacity: 0.8, paddingLeft: '20px', fontSize: "28px", marginBottom: '5px', paddingTop: "15px", fontFamily: 'Inter', fontWeight: '400', background: 'linear-gradient(to bottom,rgba(88, 94, 96,1.2),rgba(93, 80, 82,1.2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {eventDetails.title}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Stack direction="row" spacing={2} alignItems="center" marginBottom={2} sx={{ padding: '30px', paddingLeft: "10px", paddingBottom: "20px", margin: "0px 0px", backgroundColor: "#f1f1f1" }}>
                    <Avatar src={eventDetails.organizerAvatar} alt="Organizer Avatar" />
                    <Typography sx={{ fontFamily: 'Inter, sans-serif' }} variant="subtitle1">{eventDetails.organizer}</Typography>
                    <Divider orientation="vertical" flexItem />
                    <EventIcon />
                    <Typography variant="subtitle1" sx={{ fontFamily: 'Inter, sans-serif' }}>
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






              {isCapacityFull ? (
                // Show Reject and Waitlist buttons
                <Stack direction="row" spacing={2} sx={{ padding: '10px', justifyContent: 'flex-center',  backgroundColor: "#f8f8f8" }}>
                  <Button variant="soft" color="danger" sx={{ width: "100%" }} onClick={handleReject}>
                    Reject
                  </Button>
                  <Button variant="soft" color="warning" sx={{ width: "100%" }}  startDecorator={<AccessTimeSharpIcon/>} onClick={handleWaitlist}>
                  
                    Waitlist
                  </Button>
                </Stack>
              ) : (
                // Show Join and Reject buttons
                 
                 


                 









                  <Stack direction="row" spacing={2} sx={{ padding: '10px', justifyContent: 'flex-center',backgroundColor: "#f8f8f8" }}>
                    <Button variant="soft" color="danger" sx={{ width: "100%" }} onClick={handleReject}>
                      Reject
                    </Button>
                    {load ? (
                      <Button loading variant="solid" color="success" sx={{ width: "100%" }} onClick={handleJoin}>
                        Join
                      </Button>
                    ) : (
                      <Button variant="soft" color="success" sx={{ width: "100%" }} onClick={handleJoin}>
                        Join
                      </Button>
                    )}
                  </Stack>
                
              )}
</Box>
            </>
          )}
        </Paper>
      </Grid>
    </Container>
  );
};

export default JoinEventPage;
