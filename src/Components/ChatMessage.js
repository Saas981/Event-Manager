import React, { useState,useEffect } from 'react';
import { Typography, IconButton,Box } from '@mui/material';
import { Container, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText, FormControl } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/joy';
import { Storage } from 'aws-amplify';

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



const ChatMessage = ({ message, onDelete,isAdmin,identityId }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageElements, setImageElements] = useState(null);

    useEffect(() => {
    const fetchImages = async () => {
      if (message.imageContent && message.imageContent.length > 0) {
        const imagePaths = JSON.parse(message.imageContent);
        const images = await Promise.all(
          imagePaths.map(async (imagePath, index) => {
            console.log("IMAGE URL ",imagePath)
            console.log("IDENTITY ID ",identityId)
            const imgUrl = await Storage.get(imagePath,{
  level: 'protected',
  identityId: identityId // the identityId of that user
});
            const file = await fetch(imgUrl).then((res) => res.blob());

            return (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Image ${index + 1}`}
                style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '10px', margin: '0px 1%' }}
              />
            );
          })
        );

        setImageElements(images);
      }
    };

    fetchImages();
  }, [message.imageContent]);
  

  return (
    <>

     <Grid container key={message.id} direction={message.isUser ? 'row-reverse' : 'row'} justifyContent={message.isUser ? 'flex-end' : 'flex-start'} alignItems="center">
      <Grid item xs={0.4}>
        <Avatar sx={{ marginLeft: message.isUser ? '30%' : '50%' }} src={message.imgUrl} />
      </Grid>
      <Grid item xs={11}>
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
    padding: "5px",
    margin: "4px",
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
    <DeleteIcon sx={{ fontSize: "18px", padding: "4%", transition: 'opacity 1s' }} />
  </IconButton>
)}



        </>
      )}



    </StyledMessage>

      </Grid>
    

      </Grid>

         {imageElements &&(
     <Grid container sx={{marginTop:"-5.1%"}} direction={message.isUser ? 'row-reverse' : 'row'} justifyContent={message.isUser ? 'flex-end' : 'flex-start'} alignItems="center">
             <Grid item xs={0.4}>
        {/* <Avatar sx={{ marginLeft: message.isUser ? '30%' : '50%' }} src={message.imgUrl} /> */}
      </Grid>
      <Grid item xs={11}>
<StyledMessage sx={{}}
        key={message.id}
        isUser={message.isUser}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
     {imageElements && imageElements.length > 0 && (
        <>
          {imageElements.map((imgElement, index) => (
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', }}>
        
            <div key={index} style={{ margin: '0px 1%' }}>
              {imgElement}
            </div>
          
        </Box>
        ))}
        </>
      )}
         </StyledMessage>
      </Grid>
        
            </Grid>

    )}








      
          
    </>
  );
};

export default ChatMessage;
