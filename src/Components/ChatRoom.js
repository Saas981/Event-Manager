import React from 'react';
import { Container, Typography, TextField, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { Input, Button, Stack } from '@mui/joy';

const ChatRoom = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: '20px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
      <Grid container spacing={2}>
        {/* Left half with user list */}
        <Grid item xs={4}>
          <div style={{ background: '#f0f0f0', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
            <Typography variant="h6" align="center" style={{ color: '#333' }}>
              Participants 
            </Typography>
          </div>
          <List>
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
<div style={{ background: '#f0f0f0', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
            <Typography variant="h6" align="center" style={{ color: '#333' }}>
              ChatRoom Title
            </Typography>
          </div>
          {/* Text input bar */}
       <div style={{ display: 'flex', alignItems: 'flex-end', backgroundColor: "#f8f8f8", minHeight: "500px" }}>
      <Input
        fullWidth
        variant="outlined"
        placeholder="Type your message..."
        sx={{
          background: '#f9f9f9',
          borderRadius: '5px',
          padding: '5px',
        }}
      />
    </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatRoom;
