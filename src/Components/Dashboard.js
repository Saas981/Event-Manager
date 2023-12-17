import React, { useState } from 'react';
import { Typography, Box, Collapse, Paper, Avatar,Grid, Skeleton } from '@mui/material';
import { styled } from '@mui/system';
import PeopleIcon from '@mui/icons-material/People';

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

const Event = styled(Box)({
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

const Dashboard = () => {
  const [expandedEvent, setExpandedEvent] = useState(null);

  const events = [
    {
      id: 1,
      date: '2023-01-15',
      title: 'Event 1',
      participants: ['Participant 1', 'Participant 2', 'Participant 3'],
      maxParticipants: 4,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac libero dapibus, accumsan velit at, tincidunt magna. Nulla sed justo ipsum. Nullam malesuada ac nibh cursus euismod. Nam cursus enim vel lectus ultricies malesuada.',
      author: 'Organizer A',
    },
    {
      id: 2,
      date: '2023-02-20',
      title: 'Event 2',
      participants: ['Participant A', 'Participant B', 'Participant C', 'Participant D'],
      maxParticipants: 5,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac libero dapibus, accumsan velit at, tincidunt magna. Nulla sed justo ipsum. Nullam malesuada ac nibh cursus euismod. Nam cursus enim vel lectus ultricies malesuada.',
      author: 'Organizer B',
    },
    {
      id: 3,
      date: '2023-03-10',
      title: 'Event 3',
      participants: ['Person X', 'Person Y', 'Person Z'],
      maxParticipants: 4,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac libero dapibus, accumsan velit at, tincidunt magna. Nulla sed justo ipsum. Nullam malesuada ac nibh cursus euismod. Nam cursus enim vel lectus ultricies malesuada.',
      author: 'Organizer C',
    },
  ];

  const handleEventClick = (eventId) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  return (
    <DashboardContainer>
      <DashboardHeader elevation={3}>Welcome to Your Dashboard</DashboardHeader>

      {events.map((event) => (
        <EventContainer key={event.id} elevation={3}>
          <Event onClick={() => handleEventClick(event.id)}>
            <Typography>{event.date}</Typography>
            <Typography>{event.title}</Typography>
            <ParticipantCount>
              {`${event.participants.length}/${event.maxParticipants}`}
              <PeopleIcon style={{ fontSize: '28px' }} />
            </ParticipantCount>
          </Event>

          <Collapse style={{ background:'linear-gradient(to bottom right, rgba(74, 158, 226,0.1),rgba(90, 63, 192,0.1 ))',}} in={expandedEvent === event.id}>
          <Grid container spacing={2}>
          <Grid item xs={4}>
              <ImageSkeleton animation="wave" variant="rectangular" />
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
