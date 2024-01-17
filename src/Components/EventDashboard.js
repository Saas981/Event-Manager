import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import ChatRoom from './ChatRoom'; // Adjust the path based on your project structure
import { useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';

const EventDashboard = ({ theme, userData }) => {
  const { eventId } = useParams();
  const [chatRoom, setChatRoom] = useState(null);


  useEffect(() => {
   
    const fetchOrCreateChatRoomObject = async () => {
      try {
       
        // Check if the chat room exists
        const listChatRoomsResponse = await API.graphql(
          graphqlOperation(queries.listChatRooms, {
            filter: {
              eventId: { eq: eventId },
            },
          })
        );

        const chatRooms = listChatRoomsResponse.data.listChatRooms.items;
          console.log("CHART OOTMSMSS ",chatRooms)
        if (chatRooms.length > 0) {
          // Chat room exists, retrieve the first one
          const existingChatRoomId = chatRooms[0].id;
          const getChatRoomResponse = await API.graphql(
            graphqlOperation(queries.getChatRoom, { id: existingChatRoomId })
          );
          const existingChatRoom = getChatRoomResponse.data.getChatRoom;
          console.log('Existing Chat Room:', existingChatRoom);
          setChatRoom(existingChatRoom);
        } else {
          // Chat room does not exist, create a new one
          const newChatRoomInput = {
            name: 'New Chatroom', // Provide a suitable name
            type: 'event', // Provide a suitable type
            eventId: eventId,
          };

          const createChatRoomResponse = await API.graphql(
            graphqlOperation(mutations.createChatRoom, { input: newChatRoomInput })
          );

          const newChatRoom = createChatRoomResponse.data.createChatRoom;
          console.log('New Chat Room Created:', newChatRoom);
          setChatRoom(newChatRoom);
        }
      } catch (error) {
        console.error('Error fetching or creating chat room:', error);
      }
    };

    if(!chatRoom && eventId){
   fetchOrCreateChatRoomObject();
    }
 
  },[eventId]);



  return (
    <Container maxWidth="100%">
      {/* <Typography variant="h4" align="center" style={{ marginTop: '20px' }}>
        Event Dashboard
      </Typography> */}

      {/* Your existing content for the event dashboard goes here */}

      {/* ChatRoom component */}
      <Grid container spacing={2} style={{ marginTop: '-3%',width:"100%" }}>
        <Grid item xs={12}>
          <ChatRoom userData={userData} theme={theme}/>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EventDashboard;
