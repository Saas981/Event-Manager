import React, { useState, useEffect } from 'react';
import { Typography, Box, Collapse, Paper, Grid, Skeleton } from '@mui/material';
import { styled } from '@mui/system';
import PeopleIcon from '@mui/icons-material/People';
import { API, graphqlOperation } from 'aws-amplify';
import { listEvents, getEvent, updateEvent } from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { deleteEvent } from '../graphql/mutations';

import { Storage } from 'aws-amplify';
import Button from '@mui/joy/Button';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
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
      <DashboardHeader elevation={3}>
        Welcome to Your Dashboard<Box></Box>
      </DashboardHeader>

      <Box sx={{ width: "100%" }}>
        <Button component="a" href="/create" variant="soft" color="primary" sx={{ width: "100%", borderRadius: "0px" }}>
          Create Event
        </Button>
      </Box>

      {events.map((event) => (
        <EventContainer key={event.id} elevation={3}>
          <EventBox onClick={() => handleEventClick(event.id)}>
            <Grid container>
              <Grid xs={4}>
                <Typography sx={{ fontSize: "14px", textAlign: "left" }}>{new Date(event.startTime).toLocaleString()}</Typography>
              </Grid>
              <Grid xs={5}>
                <Typography sx={{ textAlign: "center" }}>{event.title}</Typography>
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
            <Grid container>
              <Grid item xs={4} sx={{ border: '2px dashed #ccc' }}>
                {event.imgUrl ? (
                  <img src={event.imgUrl} alt="Event Cover" style={{ width: '50%', margin: "10px", borderRadius: '8px' }} />
                ) : (
                  <ImageSkeleton width={"50%"} sx={{ margin: "10px", borderRadius: '8px' }} animation="wave" variant="rectangular" />
                )}
                <Typography sx={{ marginTop: '10px' }}>Organizer: {event.organizer}</Typography>
                {JSON.parse(event.participants)[0][userId]["permissions"] === "admin" && (
    <IconButton
      aria-label="Edit Event"
      component="a"
      href={`/edit/${event.id}`}
      color="neutral"
      
      sx={{
        padding: 1, // Adjust padding as needed
      }}
    >
      <EditTwoToneIcon />
    </IconButton>
  )}
              </Grid>
              <Grid item xs={8} sx={{ border: '2px dashed #ccc' }}>
                <EventDetails sx={{ border: '2px dashed #ccc' }}>
                  <Typography>{event.description}</Typography>
                </EventDetails>
              </Grid>
            </Grid>

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
                  width: "100%",
                  borderRadius: "0px",
                  marginTop: "3%",
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
          </Collapse>
        </EventContainer>
      ))}
    </DashboardContainer>
  );
};

export default Dashboard;

const DashboardContainer = styled(Box)({
  textAlign: 'center',
  marginTop: '0px',
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
  color: "#f8f8f8",
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
  borderTop: '1px solid #BDBDBD',
});

const ParticipantCount = styled(Box)({
  display: 'flex',
  fontFamily: 'Poppins, sans-serif',
  alignItems: 'right',
  justifyContent: 'space-between',
});

const ImageSkeleton = styled(Skeleton)({
  width: '100%',
  height: '100px',
  marginBottom: '10px',
});
