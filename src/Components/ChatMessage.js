import React, { useState } from 'react';
import { Typography, IconButton,Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/joy';

const StyledMessage = styled('div')(({ isUser }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  margin: '2% 6%',
  marginRight: isUser && "0%",
  marginLeft: isUser && "auto",
  padding: '12px',
  borderRadius: '10px',
  width: 'fit-content',
  minWidth: "25%",
  backgroundColor: isUser ? '#B5BBFD' : '#e9e9e9', // Use purple for isUser, and default color otherwise
  fontFamily: 'Poppins',
  color: '#000',
  position: 'relative', // Add this style to make the position relative
  '&:hover': {
    '& .delete-icon': {
      opacity: 1,
    },
  },
}));

const ChatMessage = ({ message, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <StyledMessage
      key={message.id}
      isUser={message.isUser}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {message.isUser ? (
        <>
          <Typography sx={{
            marginLeft: '10px',
            fontFamily: "Poppins",
            fontWeight: "500",
            whiteSpace: 'break-spaces',
            wordBreak: 'break-all',
          }}>
            {message.textContent}
          </Typography>
          <Typography variant="caption" sx={{
            marginLeft: '10px',
            fontFamily: "Poppins",
            fontWeight: "400",
            color: '#777'
          }}>
            {message.senderName}
          </Typography>
        </>
      ) :  (
        <Box sx={{position:"relative"}}>
          <Typography variant="caption" sx={{
            marginRight: '10px',
            fontFamily: "Poppins",
            fontWeight: "400",
            color: '#777'
          }}>
            {message.senderName}
          </Typography>
          <Typography sx={{
            marginLeft: '0px',
            fontFamily: "Poppins",
            fontWeight: "500",
            fontSize: "1em",
            wordBreak: 'break-all',
            whiteSpace: 'break-spaces',
          }}>
            {message.textContent}
          </Typography>
           {isHovered && (
              <IconButton
          className="delete-icon"
          style={{transition: 'opacity 0.3s',  }}
          onClick={() => onDelete(message.id)}
        >
          <DeleteIcon sx={{fontSize:"18px",padding:"5%"}}/>
        </IconButton>      
      )}
        </Box>
      )}

   
    </StyledMessage>
  );
};

export default ChatMessage;
