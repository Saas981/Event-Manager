import React, { useState, useEffect } from 'react';
import { Typography, Box, Collapse, Paper, Avatar, Grid, Skeleton } from '@mui/material';
import { styled } from '@mui/system';
import PeopleIcon from '@mui/icons-material/People';
import { API, graphqlOperation } from 'aws-amplify';
import { listEvents } from '../graphql/queries';

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("FETCHING GRAPHQL API");
        const { data } = await API.graphql(graphqlOperation(listEvents));
         // Ensure data.listEvents.items is an array
        console.log("EVENTS", data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
  
    fetchEvents();
  }, []);
  
  // Now 'events' state contains all the Event items

  return (
    <>{events}EVENTS</>
  );
};

export default Dashboard;
