import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { Input, Button, styled } from '@mui/joy';


const ChatRoom = ({userData,theme}) => {
        const [chatMessages, setChatMessages] = useState([]);
        const messages = [
    {
      id: '1',
      textContent: 'Hey, how is it going?',
      sender: 'user1@example.com',
      chatRoomId: 'chatRoom1',
    },
    {
      id: '2',
      textContent: 'Not bad, just working on some coding projects.',
      sender: 'b4364e20-5fc3-4b67-868a-08b516a0e60e',
      chatRoomId: 'chatRoom1',
    },
    {
      id: '3',
      textContent: 'That sounds interesting. Anything exciting?',
      sender: 'user1@example.com',
      chatRoomId: 'chatRoom1',
    },
    {
      id: '1',
      textContent: 'Hey, how is it going?',
      sender: 'user1@example.com',
      chatRoomId: 'chatRoom1',
    },
    {
      id: '2',
      textContent: 'Not bad, just working on some coding projects.',
      sender: 'b4364e20-5fc3-4b67-868a-08b516a0e60e',
      chatRoomId: 'chatRoom1',
    },
    {
      id: '3',
      textContent: 'That sounds interesting. Anything exciting?',
      sender: 'user1@example.com',
      chatRoomId: 'chatRoom1',
    },{
      id: '1',
      textContent: 'Hey, how is it going?',
      sender: 'user1@example.com',
      chatRoomId: 'chatRoom1',
    },
    {
      id: '2',
      textContent: 'Not bad, just working on some coding projects.',
      sender: 'b4364e20-5fc3-4b67-868a-08b516a0e60e',
      chatRoomId: 'chatRoom1',
    },
    {
      id: '3',
      textContent: 'That sounds interesting. Anything exciting?',
      sender: 'user1@example.com',
      chatRoomId: 'chatRoom1',
    },{
      id: '1',
      textContent: 'Hey, how is it going?',
      sender: 'user1@example.com',
      chatRoomId: 'chatRoom1',
    },
    {
      id: '2',
      textContent: 'Not bad, just working on some coding projects.',
      sender: 'b4364e20-5fc3-4b67-868a-08b516a0e60e',
      chatRoomId: 'chatRoom1',
    },
    {
      id: '3',
      textContent: 'That sounds interesting. Anything exciting?',
      sender: 'user1@example.com',
      chatRoomId: 'chatRoom1',
    },
    // Add more messages as needed
  ];



  useEffect(() => {
    // Check if the sender is equal to the current user and update isUser field
    const updatedMessages = messages.map((message) => ({
      ...message,
      isUser: message.sender === userData?.id, // Assuming user has an 'id' property
    }));

    setChatMessages(updatedMessages);
  }, [userData?.id]); 
      


   return (
    <Container maxWidth="lg" style={{ marginTop: '20px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
      <Grid container spacing={2}>
        {/* Left half with user list */}
        <Grid item xs={4}>
          <StyledTypography variant="h6" align="center">
            Participants
          </StyledTypography>
          <List sx={{backgroundColor:"#f8f8f8",borderRadius:"10px",height:"auto"}}>
            {/* Static user list (replace with dynamic data) */}
            <ListItem>
              <ListItemAvatar>
                <Avatar alt="User 1" src="static_pfp_1.jpg" />
              </ListItemAvatar>
              <ListItemText primary="User 1" />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt="User 2" src="static_pfp_2.jpg" />
              </ListItemAvatar>
              <ListItemText primary="User 2" />
            </ListItem>
            {/* Add more users as needed */}
          </List>
        </Grid>

        {/* Right half with the chatroom */}
        <Grid item xs={8}>
          {/* Chat messages go here (static) */}
          <StyledTypography variant="h6" align="center">
            ChatRoom Title
          </StyledTypography>
          {/* Display static messages */}

          {/* Text input bar */}
          <div style={{ display: 'flex', alignItems: 'flex-end', borderRadius: '10px', backgroundColor: "#f8f8f8", minHeight: "500px" }}>
           
           <Grid container>
            <Grid item xs={12} sx={{    backgroundColor: 'none',
    maxHeight: '450px',
    overflowY: 'auto',
     '&::-webkit-scrollbar': {
      width: '8px', // Set the width of the scrollbar
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#aaa', // Color of the thumb
      borderRadius: '8px', // Radius of the thumb
      marginRight:"4px",
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#e8e8e8', // Color of the track
    },}}>
          {/* MESSAGES GO HERE */}
            {chatMessages.map((message) => (
    <>

        <Grid container key={message.id} direction={message.isUser ? 'row-reverse' : 'row'} justifyContent={message.isUser ? 'flex-end' : 'flex-start'} alignItems="center">

            <Grid item xs={0.4}>
<Avatar sx={{marginLeft:"30% "}} src={message.avatar} />
            </Grid>
             <Grid item xs={11}>
  <StyledMessage key={message.id} isUser={message.isUser}>
              
              <Typography sx={{ marginLeft: '10px', fontFamily:"Poppins",
    fontWeight:"500", }}>{message.textContent}</Typography>
            </StyledMessage>            </Grid>
             </Grid>
    
          
            </>
          ))}



            </Grid>
             <Grid item xs={12}>
 <StyledInput
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
            />
            </Grid>
           </Grid>
                   
           
           
           
           
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatRoom;

// Custom styled Input component
const StyledInput = styled(Input)({
  width: '95%',
  background: '#f9f9f9',
  margin:"20px",
  borderRadius: '15px',
  padding: '10px',
});

// Custom styled Typography component
const StyledTypography = styled(Typography)({
  background: '#f0f0f0',
  padding: '10px',
  fontFamily:"Poppins",
  borderRadius: '5px',
  marginBottom: '10px',
  color: '#333',
});

// Custom styled Message component
const StyledMessage = styled('div')(({ isUser }) => ({
    display: 'flex',

    alignItems: 'flex-end',
    margin: '2% 6%',
    marginRight: isUser && "0%",
        marginLeft: isUser && "46%",

    padding: '12px',
    borderRadius: '10px',
    width:'fit-content', 
    minWidth:"25%",
    backgroundColor: isUser ? '#B5BBFD' : '#e9e9e9', // Use purple for isUser, and default color otherwise
    fontFamily: 'Poppins',
    color: '#000',
  }));
  