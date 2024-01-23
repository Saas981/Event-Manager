import React, { useEffect, useState, useRef } from 'react';
import { Container, Typography, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText,Box, FormControl } from '@mui/material';
import { Input, Button, styled, Skeleton } from '@mui/joy';
import { API, graphqlOperation } from 'aws-amplify';
import { CircularProgress } from '@mui/material';
import { Storage } from 'aws-amplify';
import TuneIcon from '@mui/icons-material/Tune';
import * as queries from '../graphql/queries';
import * as mutations from "../graphql/mutations"
import * as subscriptions from "../graphql/subscriptions"
import Uploader from './Uploader';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import ChatMessage from './ChatMessage';
import IconButton from '@mui/joy/IconButton';

const ChatRoom = ({ userData, theme, chatRoom }) => {
  const containerRef = useRef(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [pushMessage,setPushMessage] = useState()
  const [characters,setCharacters] = useState(250);
  const [message, setMessage] = useState('');
  const [isTimeoutActive, setIsTimeoutActive] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [scroll, setScroll] = useState(true)
  const [isSettings,SetIsSettings] = useState(false)
    const [savedFile, setSavedFile]= React.useState();
    const [background,setBackground] = React.useState('none');
  const gradientMappings = {
  default: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(255,0,175,1) 0%, rgba(0,212,255,1) 100%)',
  halloween: 'linear-gradient(135deg, #ff9900 0%, #ff6600 100%)',
  midnight: 'linear-gradient(135deg, #080819 0%, #222244 100%)',
  lgbtRainbow: 'linear-gradient(45deg, #f79cd4 0%, #fbd2c9 16.666%, #fff5ba 33.333%, #b4f2e1 50%, #a8ddf6 66.666%, #d7aefb 83.333%, #f79cd4 100%)',
  pastelSunset: 'linear-gradient(to right, #ff9999, #ffcc99)',
  oceanBreeze: 'linear-gradient(to right, #66c2ff, #99ccff)',
  mintyFresh: 'linear-gradient(to right, #aaffc3, #ccffd9)',
  disgustingTheme: 'linear-gradient(45deg, #b39c8e 0%, #8b7765 16.666%, #634f42 33.333%, #402d20 50%, #402d20 66.666%, #634f42 83.333%, #8b7765 100%)',
  
  // Add more gradient mappings as needed
};

      const handleBackgroundChange = (event,newValue) => {
        console.log("BACKGROUND THEEM SELECTED ", newValue)
    const selectedGradient = gradientMappings[newValue] || gradientMappings.default;
    setBackground(selectedGradient);
  };



  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (chatRoom) {

            console.log("CHATROOM DETAILS ",chatRoom)
            const participantsString = chatRoom.participants;
const participantsArray = JSON.parse(participantsString);

// Extract the keys from the objects in the array
const participantUserIds = Object.keys(participantsArray[0])

//    const participantUserIds = JSON.parse(chatRoom.participants).map((participant) => Object.keys(participant)[0]);
console.log("USER RETRIEVED000000000000000", Object.keys(participantsArray[0]))

          // Fetch user details using listUsers
          const usersResponse = await API.graphql(
            graphqlOperation(queries.listUsers, {
              filter: {
            or: participantUserIds.map(id => ({ id: { eq: id } }))
          },
            })
          );

            const users = usersResponse.data.listUsers.items
                  const usersWithImgUrl = await Promise.all(users.map(async (user) => {
          if (user.profilePicture) {
            try {
              const imgUrl = await Storage.get(user.profilePicture);
              return { ...user, imgUrl };
            } catch (error) {
              console.error('Error fetching data:', error);
              return user; // Return the user without imgUrl in case of an error
            }
          } else {
            return user; // Return the user without imgUrl if profilePicture is not present
          }
        }));

           

          // Update state with fetched user details
          console.log("RETRIVED SUERS ",usersWithImgUrl)
          
          setParticipants(usersWithImgUrl);






          const messagesResponse = await API.graphql(
            graphqlOperation(queries.listMessages, {
              filter: { chatRoomId: { eq: chatRoom.id } },
              limit: 100, // Adjust the limit as needed
            })
          );

            const fetchedMessages = messagesResponse.data.listMessages.items.map((message) => {
          const participant = usersWithImgUrl.find((p) => p.id === message.sender);
          return {
            ...message,
            isUser: message.sender === userData?.id,
            imgUrl: participant?.imgUrl, // Retrieve imgUrl from participant object
          };
        });
   const sortedMessages = fetchedMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

console.log("RIGHT NOW PARTICIPANTS ", usersWithImgUrl);
console.log("SORTED MESSAGES ", sortedMessages);
setChatMessages(sortedMessages);

       
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [chatRoom]);


  useEffect(()=>{
   // console.log("SUBSCRIPTION CRETED")
          const subscription = API.graphql(
      graphqlOperation(subscriptions.onCreateMessage, { chatRoomId: chatRoom?.id })
    ).subscribe({
      next: (messageData) => {
        
        // Update the state with the new message
        const newMessage = messageData.value.data.onCreateMessage;
                setPushMessage(newMessage)
                
      },
      error: (error) => {
        console.error('Subscription error:', error);
      },
    });
  },[])

  useEffect(()=>{
    if(userData && participants && pushMessage){
        const newMessage = pushMessage
         const participant = participants.find((p) => p.id === newMessage.sender);
        console.log("NEW MESAAGE",newMessage)
                console.log("NEW Participants",participant)
                console.log("NEW userData",userData?.id)

        newMessage.isUser =  (newMessage.sender === userData?.id)
        newMessage.imgUrl = participant?.imgUrl
    
        //console.log("SUBSC RIBED NEW MESSAGE ICNOMGIN NOW ",newMessage)
       // console.log("DATA ID ",userData?.id)
        setChatMessages((prevMessages) => [...prevMessages, newMessage]);
        
    }
  },[userData,participants,pushMessage])




    const scrollToBottom = () => {
      if(containerRef?.current)
      {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;

      }
  }

     useEffect(() => {
      if(scroll){
           scrollToBottom()
      }
 
  }, [chatMessages,scroll]);



  //MESSAGE FUNCTIONS

  const handleMessageChange = (event) => {
    const inputValue = event.target.value;
  
    // Limit the input value to 200 characters
    const limitedValue = inputValue.slice(0, 250);
     setCharacters(250-limitedValue.length)
    setMessage(limitedValue);
  };
  




 const handleKeyPress = async (event) => {
    if (event.key === 'Enter' && !isTimeoutActive && userData && chatRoom) {
      console.log('Message value:', message);
      setMessage('');
      setIsTimeoutActive(true);
        setScroll(true)

      try {
        // Create a new message using GraphQL mutation
        const createMessageResponse = await API.graphql(
          graphqlOperation(mutations.createMessage, {
            input: {
              textContent: message,
              sender: userData?.id,
              senderName: userData?.name,
              chatRoomId: chatRoom?.id,
            },
          })
        );
        console.log('New Message Created:', createMessageResponse.data.createMessage);

        // Fetch and update the messages after creating a new one
       

        // Set a timeout to re-enable Enter key after a delay (e.g., 2 seconds)
           

        setTimeout(() => {
          setIsTimeoutActive(false);

        }, 2000); // Adjust the timeout duration as needed
      } catch (error) {
        console.error('Error creating message:', error);
        setIsTimeoutActive(false); // Reset isTimeoutActive in case of an error
      }
    }
  };




const toggleSettings = () =>{
  SetIsSettings(!isSettings)
}

const handleDeleteMessage = async (id, sender) => {
  setScroll(false)
  console.log(JSON.parse(chatRoom.participants)[0][userData.id].permissions)
  const isAdmin = JSON.parse(chatRoom.participants)[0][userData.id].permissions == "admin"
  if (userData.id === sender || isAdmin) {
    console.log("Deleting message with id:", id, " by sender:", sender);

    try {
      // Delete the message using GraphQL mutation
      await API.graphql(
        graphqlOperation(mutations.deleteMessage, {
          input: {
            id: id,
          },
        })
      );

      // Update the state to remove the deleted message
      setChatMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  } else {
    console.log("You don't have permission to delete this message.");
    // Handle the case where the user doesn't have permission to delete the message
    // You can show a notification or handle it as needed
  }
};





   return (
    <Container maxWidth="lg" style={{ marginTop: '20px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
      <Grid container spacing={2}>
        {/* Left half with user list */}
     <Grid item xs={4}>
      <StyledTypography variant="h6" align="center">
        Participants
      </StyledTypography>
      <List sx={{ backgroundColor: '#f8f8f8', borderRadius: '10px', height: 'auto' }}>
        {participants.map((participant, index) => (
          <ListItem key={participant.id}>
            <ListItemAvatar>
              <Avatar alt={participant.name} src={participant.imgUrl} />
            </ListItemAvatar>
            <ListItemText primary={participant.name} />
          </ListItem>
        ))}
      </List>
    </Grid>

        {/* Right half with the chatroom */}
        <Grid item xs={8} >
          {/* Chat messages go here (static) */}
          
          <StyledTypography variant="h6" sx={{position:"relative", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {chatRoom ? (
      <span>{chatRoom.name}</span>
    ) : (
      <Skeleton variant="rectangular" width={200} height="1.5em" sx={{ margin: 'auto' }} />
    )}
   <Box sx={{ position: "absolute", top: "20%", right: "3%" }}>
    <IconButton onClick={toggleSettings}>
      <TuneIcon />
    </IconButton>
  </Box>
  </StyledTypography>




          {/* Display static messages */}

          {/* Text input bar */}
          <div style={{ display: 'flex', alignItems: 'flex-end', borderRadius: '10px', backgroundColor: "#f8f8f8", minHeight: "500px" }}>
           
           {/* SETTINGS BELOW */}
           {isSettings?(
              <Grid container>
      <Grid item xs={6}>
        <Typography>Background Theme</Typography>
        <FormControl fullWidth>
          <Select
            defaultValue={background}
            onChange={handleBackgroundChange}
          >
             <Option value="default">Default</Option>
  <Option value="halloween">Halloween</Option>
  <Option value="midnight">Midnight</Option>
  <Option value="lgbtRainbow">LGBT </Option>
     <Option value="pastelSunset">pastelSunset</Option>
  <Option value="oceanBreeze">oceanBreeze</Option>
  <Option value="mintyFresh">mintyFresh </Option>
  <Option value="disgustingTheme">surpise</Option>

          </Select>
        </FormControl>
      </Grid>
           </Grid>
           ):
           (
          // MESSAGES BELOW
      <Grid container>
            <Grid ref={containerRef} item xs={12} sx={{    background: background,
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
      backgroundColor: 'none', // Color of the track
    },
        'scroll-behavior': 'smooth',
    'scroll-margin': '0px',
    'scroll-snap-coordinate': '0% 100%',
    'scroll-snap-destination': '0% 100%',
    'scroll-snap-type': 'y mandatory',
    'scroll-padding-bottom': '150px',
    
    }}>
          {/* MESSAGES GO HERE */}
          {chatMessages.slice(-50).map((message) => (
  <Grid container key={message.id} direction={message.isUser ? 'row-reverse' : 'row'} justifyContent={message.isUser ? 'flex-end' : 'flex-start'} alignItems="center">
    <Grid item xs={0.4}>
      <Avatar sx={{ marginLeft: message.isUser ? '30%' : '50%' }} src={message.imgUrl} />
    </Grid>
    <Grid item xs={11}>
    
       <ChatMessage
            isAdmin = {JSON.parse(chatRoom.participants)[0][userData.id].permissions == "admin" || message.sender == userData.id}
            message={message}
            onDelete={handleDeleteMessage} // Replace with your actual delete message logic
          />
    </Grid>
  </Grid>
))}




            </Grid>



                {/* INPUT */}
            <Grid item xs={12} sx={{position:"relative"}}>
        <StyledInput
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
              disabled={isTimeoutActive} 
          value={message}
          onChange={(event) => handleMessageChange(event)}
          onKeyDown={(event) => handleKeyPress(event)}
        />
        <Typography sx={{ marginLeft: 2,display:characters>250 ?"none":"flex",position:"absolute",fontSize:"0.65rem",top:"80%",right:"3.5%",color:characters>50 ?"#577" :"#f77",fontFamily:"Poppins",fontWeight:"500", }}>{characters} characters left</Typography> 
        {isTimeoutActive && <CircularProgress  color="secondary" size={20} sx={{ marginLeft: 2,position:"absolute",top:"40%",right:"50%" }} />}
      </Grid>





           </Grid>

           )}
     
                   
           
           
           
           
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
  position:"relative",
  fontFamily:"Poppins",
  borderRadius: '5px',
  marginBottom: '10px',
  color: '#333',
});

// Custom styled Message component
const StyledMessage = styled('div')(({ isUser }) => ({
    display: 'flex',
 overflowWrap: 'break-word',
 whiteSpace: 'break-spaces',
 
    alignItems: 'flex-end',
    margin: '2% 6%',
    marginRight: isUser && "0%",
        marginLeft: isUser && "auto",

    padding: '12px',
    borderRadius: '10px',
    width:'fit-content', 
    maxWidth:"60%",
    minWidth:"25%",
    backgroundColor: isUser ? '#B5BBFD' : '#e9e9e9', // Use purple for isUser, and default color otherwise
    fontFamily: 'Poppins',
    color: '#000',
  }));
  