import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import ChatRoom from './ChatRoom'; // Adjust the path based on your project structure
import { useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import { Storage } from 'aws-amplify';

const EventDashboard = ({ theme, userData,identityId }) => {
  const { eventId } = useParams();
  const [chatRoom, setChatRoom] = useState(null);
  const [eventDetails, setEventDetails]= useState(null)
  const [chatParticipants,setChatParticipants] = useState(null)


  useEffect(() => {
    
    const fetchOrCreateChatRoomObject = async () => {
      try {
        //Check if event exists
         const { data } = await API.graphql(graphqlOperation(queries.getEvent, { id: eventId }));
        if (!data.getEvent) { 
                   //   console.log("NO EVENT EXISTS")

        window.location.href="/Error404"
        }

           const participants = JSON.parse(data.getEvent.participants);
        //Check if the user is a participant
    if (userData && !participants[0].hasOwnProperty(userData?.id)) {
                 // console.log("NOT PARTICIAPNT")

          window.location.href = "/Error404";
        }
        //console.log("------IS PARTIICPANTS")

        let moddedData = data.getEvent;
       // console.log("EVENT CHATROOM Event Data", moddedData);
        //get image urls
        if (moddedData.coverImage) {
          try {
            const imgUrl = await Storage.get("eventCovers/"+moddedData.coverImage);
            moddedData = { ...moddedData, imgUrl };
          } catch (error) {
            console.error('Error fetching image URL:', error);
          }
        }

        setEventDetails(moddedData);

        // Check if the chat room exists
        const listChatRoomsResponse = await API.graphql(
          graphqlOperation(queries.listChatRooms, {
            filter: {
              eventId: { eq: eventId },
            },
          })
        );

        const chatRooms = listChatRoomsResponse.data.listChatRooms.items;
        //  console.log("CHART OOTMSMSS ",chatRooms)
        if (chatRooms.length > 0) {
          // Chat room exists, retrieve the first one
          const existingChatRoomId = chatRooms[0].id;
          const getChatRoomResponse = await API.graphql(
            graphqlOperation(queries.getChatRoom, { id: existingChatRoomId })
          );


    const existingChatRoom = getChatRoomResponse.data.getChatRoom;
  console.log('Existing Chat Room:', existingChatRoom);

  // Check if participants are different
  if (JSON.stringify(existingChatRoom.participants) !== JSON.stringify(moddedData.participants)) {
    // Participants are different, update the chat room
    try {
      const updateChatRoomResponse = await API.graphql(
        graphqlOperation(mutations.updateChatRoom, {
          input: {
            id: existingChatRoomId,
            participants: moddedData.participants,
          },
        })
      );

      const updatedChatRoom = updateChatRoomResponse.data.updateChatRoom;
      console.log('Chat Room Updated:', updatedChatRoom);
      setChatRoom(updatedChatRoom);
    } catch (error) {
      console.error('Error updating chat room:', error);
    }
  } else {
    // Participants are the same, no need to update
    setChatRoom(existingChatRoom);
  }
} else {
          // Chat room does not exist, create a new one
          const newChatRoomInput = {
            name: moddedData?.title, // Provide a suitable name
            type: 'event', // Provide a suitable type
            eventId: eventId,
            participants:moddedData?.participants,
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
 
  },[eventId,userData]);



  return (
    <Container maxWidth="100%">
      {/* <Typography variant="h4" align="center" style={{ marginTop: '20px' }}>
        Event Dashboard
      </Typography> */}

      {/* Your existing content for the event dashboard goes here */}

      {/* ChatRoom component */}
      <Grid container spacing={2} style={{ marginTop: '-3%',width:"100%" }}>
        <Grid item xs={12}>
          <ChatRoom userData={userData} theme={theme} chatRoom={chatRoom} identityId={identityId}/>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EventDashboard;
