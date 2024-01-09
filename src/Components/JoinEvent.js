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
import { getEvent } from '../graphql/queries';
import EventIcon from '@mui/icons-material/Event';
import { Storage } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import { PersonIcon } from '@mui/icons-material/Person';

const JoinEventPage = ({ user, theme }) => {
  const { eventId } = useParams();
  const [load, setLoad] = React.useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  const [isCapacityFull, setIsCapacityFull] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const { data } = await API.graphql(graphqlOperation(getEvent, { id: eventId }));
        const participants = JSON.parse(data.getEvent.participants);

        if (participants[0].hasOwnProperty(user)) {
          window.location.href = "/dashboard";
        }

        let moddedData = data.getEvent;
        if (moddedData.coverImage) {
          try {
            const imgUrl = await Storage.get(moddedData.coverImage);
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

  const handleWaitlist = () => {
    console.log('Joining waitlist...');
    
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
                  padding: '25px',
                  paddingBottom: '20px',
                  background: "linear-gradient(to bottom,rgba(74, 158, 226,0.6),rgba(90, 63, 192,0.6))",
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
                }}
              >
                <Typography level="h2" style={{ color: "#fafafa", fontSize: "20px", fontWeight: "550", marginLeft: '10px', fontFamily: 'Inter, sans-serif' }}>
                  Do you want to join this event?
                </Typography>
              </Box>

              {isCapacityFull ? (
                // Show Reject and Waitlist buttons
                <Stack direction="row" spacing={2} sx={{ padding: '10px', justifyContent: 'flex-center', paddingRight: "40px", backgroundColor: "#f8f8f8" }}>
                  <Button variant="soft" color="danger" sx={{ width: "100%" }} onClick={handleReject}>
                    Reject
                  </Button>
                  <Button variant="soft" color="primary" sx={{ width: "100%" }} onClick={handleWaitlist}>
                    Waitlist
                  </Button>
                </Stack>
              ) : (
                // Show Join and Reject buttons
                <Box sx={{ paddingBottom: "12px", borderRadius: "10px", margin: "0px 0px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
                  <Stack direction="row" spacing={2} sx={{ padding: '10px', justifyContent: 'flex-center', paddingRight: "40px", backgroundColor: "#f8f8f8" }}>
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
                </Box>
              )}

            </>
          )}
        </Paper>
      </Grid>
    </Container>
  );
};

export default JoinEventPage;
