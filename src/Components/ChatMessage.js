import React, { useState,useEffect } from 'react';
import { Typography, IconButton,Box } from '@mui/material';
import { Container, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText, FormControl } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link as BlueLink } from '@mui/material';

import { styled } from '@mui/joy';
import Backdrop from '@mui/material/Backdrop';
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
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };


  useEffect(() => {
    const fetchImages = async () => {
      if (message.imageContent && message.imageContent.length > 0) {
        const imagePaths = JSON.parse(message.imageContent);
        const images = await Promise.all(
          imagePaths.map(async (imagePath, index) => {
            const imgUrl = await Storage.get(imagePath);
            const file = await fetch(imgUrl).then((res) => res.blob());
            return {
              index,
              file,
              imagePath,
            };
          })
        );

        setImageElements(images);
      }
    };

    fetchImages();
  }, [message.imageContent]);
  

   const renderContent = () => {
    // Check if textContent looks like a URL
    const isLink = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(message.textContent);

    if (isLink) {
      // If it's a link, render a blue link component
      return (
        <BlueLink href={message.textContent} target="_blank" rel="noopener noreferrer">
          {message.textContent}
        </BlueLink>
      );
    } else {
      // If it's not a link, render regular text
      return (
        <Typography
          sx={{
            marginLeft: '5px',
            marginRight: '5px',
            fontFamily: 'Poppins',
            fontWeight: '500',
            alignSelf: 'flex-start',
            textAlign: 'left',
            whiteSpace: 'break-spaces',
          }}
        >
          {message.textContent}
        </Typography>
      );
    }
  };



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
  
          {renderContent()}
         
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
         <Box
                key={imgElement.index}
                style={{ margin: '0px 1%', cursor: 'pointer' }}
                onClick={() => handleOpen(imgElement)}
              >
                <img
                  src={URL.createObjectURL(imgElement.file)}
                  alt={`Image ${imgElement.index + 1}`}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '200px',
                    borderRadius: '10px',
                  }}
                />
              </Box>
        ))}
        </>
      )}
         </StyledMessage>
      </Grid>
        
            </Grid>

    )}


       {selectedImage && (
       <Backdrop
       sx={{ color: '#111', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
       open={open}
       onClick={handleClose}
     >
       <img
         src={URL.createObjectURL(selectedImage.file)}
         alt={`Selected Image`}
         style={{ maxWidth: '70%', maxHeight: '70%', borderRadius: '10px' }}
       />
     </Backdrop>
     
      )}





      
          
    </>
  );
};

export default ChatMessage;
