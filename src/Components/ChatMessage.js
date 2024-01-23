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
  minWidth: "20%",
  maxWidth:"60%",
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

const ChatMessage = ({ message, onDelete,isAdmin }) => {
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
    <Box sx={{ position: "relative", width: "100%",display:"flex",alignItems:"flex-start",flexDirection:"column" }}>
  <Typography
    variant="caption"
    sx={{
      fontFamily: "Poppins",
      fontWeight: "400",
        marginLeft:"3px",
      color: '#777',
       
    }}
  >
    {message.senderName}
  </Typography>
  
          <Typography sx={{
            marginLeft: '5px',
            marginRight:"5px",
            fontFamily: "Poppins",
            fontWeight: "500",
            alignSelf:"flex-start",
            textAlign:"left",
            whiteSpace: 'break-spaces',
            wordBreak: 'break-all',
          }}>
            {message.textContent}
          </Typography>
         
          </Box>
           {1==1 && (
             <IconButton
  className="delete-icon"
  style={{
    transition: 'opacity 0.5s',
    transition: 'opacity 0.5s',

    position: "absolute",
    top: "1%",
    right: "1%",
    borderRadius: "40%",
    padding: "1%",
    margin: "5px",
    marginRight: "8px",
    marginTop: "8px",
    opacity: isHovered ? 1 : 0, // Set opacity based on isHovered
  }}
  onClick={() => onDelete(message.id,message.sender)}
  sx={{
    '&:hover': {
      color: '#dd4d4f', // Set the shade of danger red
    },
  }}
>
  <DeleteIcon sx={{ fontSize: "18px", padding: "5%" }} />
</IconButton>
      )}
        </>
      ) :  (
        <>
        <Box sx={{position:"relative",display:'flex-block'}}>
          <Typography variant="caption" sx={{
            marginRight: '10px',
            fontFamily: "Poppins",
            display:"inline-block",
                    textAlign: "right", // Align the sender name to the right

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
         
        </Box>
        {isAdmin && (
  <IconButton
    className="delete-icon"
    style={{
      transition: 'opacity 0.5s',
      position: "absolute",
      top: "1%",
      right: "1%",
      borderRadius: "40%",
      padding: "1%",
      margin: "5px",
      opacity: isHovered ? 1 : 0, // Set opacity based on isHovered
    }}
    onClick={() => onDelete(message.id)}
      sx={{
    '&:hover': {
      color: '#dd4d4f', // Set the shade of danger red
    },
  }}
  >
    <DeleteIcon sx={{ fontSize: "18px", padding: "5%", transition: 'opacity 1s' }} />
  </IconButton>
)}



        </>
      )}

   
    </StyledMessage>
  );
};

export default ChatMessage;
