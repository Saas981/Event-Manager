import React, { useState,useEffect } from 'react';
import { Container, TextField, Grid, LinearProgress,Stack,Switch,IconButton,Autocomplete,Table,Paper,Avatar,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,  } from '@mui/material';
import Uploader from "./Uploader"
import CancelIcon from '@mui/icons-material/Cancel';import Snackbar from '@mui/joy/Snackbar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import { alpha, styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import ErrorOutlineSharpIcon from '@mui/icons-material/ErrorOutlineSharp';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import { getEvent,listUsers } from '../graphql/queries';
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ModalDialog from '@mui/joy/ModalDialog';
import Box from '@mui/joy/Box';
import { Storage } from 'aws-amplify';
import { notify } from '../Functions/notificationUtil';


const EditEvent = ({userId,theme,userData}) => {
      const { eventId } = useParams();
      const [usersToBeDeleted, setUsersToBeDeleted] = useState([]);

  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [loadCreateButton, setLoadCreateButton] = React.useState(false)
  const [savedFile, setSavedFile]= React.useState();
  const [eventDetails, setEventDetails] = useState({
    title: '',
    startTime: dayjs(),
    location: '',
    reoccuring: false,
    endTime: dayjs().add(1,'day'),
    capacity: 1,
    participants:`[ { "${userId}": { "permissions": "admin" } } ]`,
    description: '',
    organizer: userData?.username,
    coverImage:'',
    private:true,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');
const [selectedUsers, setSelectedUsers] = useState([]);

const [friendIds, setFriendIds]= useState([])
const [participantIds, setParticipantIds]= useState([])
const [userIds, setUserIds] = useState([]);
const [userResults, setUserResults] = useState([]);

const handleUserSelection = (event, newValue) => {
  // Use Set to ensure uniqueness and filter out duplicates
  const uniqueSelectedUsers = new Set([...selectedUsers, ...newValue]);

  // Convert Set back to an array and update state
  setSelectedUsers([...uniqueSelectedUsers]);

  console.log("SELECTED USERS ", [...uniqueSelectedUsers]);
};




useEffect(() => {
  // Ensure userData and friends are available before processing
  if (userData && userData.friends) {
    const friendsList = JSON.parse(userData.friends);

    // Filter friends with status "friend"
    const filteredFriendIds = Object.keys(friendsList[0]).filter(
      (friendId) => friendsList[0][friendId].status === 'friend'
    );
      setFriendIds(filteredFriendIds)
    // Update state using the previous state
    setUserIds((prevUserIds) => {
      // Use Set to ensure uniqueness and filter out duplicates
      const uniqueUserIds = new Set([...prevUserIds, ...filteredFriendIds]);

      // Convert Set back to an array
      return [...uniqueUserIds];
    });
  }
}, [userData]);



useEffect(() => {
  // Fetch users based on userIds
  const fetchUsers = async () => {
    try {
      const { data } = await API.graphql(graphqlOperation(listUsers, {
        filter: {
          or: userIds.map(id => ({ id: { eq: id } }))
        },
        limit: 10
      }));

      const users = data.listUsers.items;
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

      setUserResults(usersWithImgUrl);
      const filteredUsersWithImgUrl = usersWithImgUrl.filter((user) => participantIds.includes(user.id));
      console.log("PARTIG SLITS ",participantIds)
      // Set the filtered array as the new state
      setSelectedUsers(filteredUsersWithImgUrl)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  if (userIds.length > 0) {
    fetchUsers();
  }
}, [userIds]);





//FEtch the event details
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const { data } = await API.graphql({
          query: getEvent,
          variables: {
            id: eventId,
          },
          authMode: 'AMAZON_COGNITO_USER_POOLS', // Specify the authentication mode
        });
        
        if (!data.getEvent) { 
          window.location.href="/Error404"
          
          
        }
        
        const participants = JSON.parse(data.getEvent.participants);
      //  console.log("PARTICIAPNTS ",(participants[0][userData.id]["permissions"]!="admin"))
     //   console.log("USERID ",userData.id)
        
        if(userData){
            
                 // window.location.href="/unauthorized"
            if (participants[0][userData.id]["permissions"]!="admin") {
              console.log("REDIERECTING IN 1 2 3")
               window.location.href = "/unauthorized";
            }

        }

          setUserIds(
          (prevUserIds) => {
            // Use Set to ensure uniqueness and filter out duplicates
            const uniqueUserIds = new Set([...prevUserIds, ...Object.keys(participants[0])]);
      
            // Convert Set back to an array
            return [...uniqueUserIds];
          })
         // setSelectedUsers(Object.keys(participants[0]))
        console.log("SET USERS TO BE FETCHED ",Object.keys(participants[0]))
        
        setParticipantIds(Object.keys(participants[0]))

        let moddedData = data.getEvent;
       // console.log("------------USERNDATA ",userData)
        if(userData?.username){
  moddedData.organizer = userData?.username;
        }
        if(!moddedData?.private){
          moddedData.private = true;
        }
      
       // console.log("Join Event Data", moddedData);

         if (moddedData.coverImage) {
        try {
          const imgUrl = await Storage.get("eventCovers/"+moddedData.coverImage);
          const file = await fetch(imgUrl).then(res => res.blob());
          setSavedFile(file);
          moddedData = { ...moddedData, imgUrl: URL.createObjectURL(file) };
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      }


        setEventDetails(moddedData);
      //  console.log("FETCHED DATA",moddedData)

      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [eventId, userData]);  











  const handleFinish = async () => {
    try {
      setLoadCreateButton(true);
  
      if (savedFile) {
        setEventDetails((prevDetails) => ({
          ...prevDetails,
          ["coverImage"]: eventDetails.title + eventDetails.organizer + savedFile.name,
        }));
      }
  
      // Upload the file if there is a new cover image
      if (savedFile) {
        try {
          await Storage.put("eventCovers/"+eventDetails.title + eventDetails.organizer + savedFile.name, savedFile, {
            contentType: "image/png", // contentType is optional
          });
        } catch (error) {
          console.log("Error uploading file: ", error);
        }
      }
  

      const participants = JSON.parse(eventDetails.participants)[0];

      // Loop through each user in usersToBeDeleted and delete the corresponding key from participants
      for (const userToBeDeleted of usersToBeDeleted) {
        const userIdToDelete = userToBeDeleted.id;
      
        // Check if the user's key exists in participants before attempting to delete
        if (participants.hasOwnProperty(userIdToDelete)) {
          delete participants[userIdToDelete];
          const notificationMessage = `You were kicked from the Event: ${eventDetails.title} by ${userData?.name}`;

          const notificationResponse = await notify(userData.id,userIdToDelete, 'SYSTEM', notificationMessage, 'UNREAD', eventId);
        }
      }
      console.log("MODDED AROTPASTSGA ",participants)
      // Prepare updated event details for the updateEvent mutation
   const updatedEventDetails = {
      id: eventId,
      title: eventDetails.title,
      organizer: eventDetails.organizer,
      reoccuring: eventDetails.reoccuring,
      coverImage: savedFile ? eventDetails.title + eventDetails.organizer + savedFile.name : eventDetails.coverImage,
      startTime: eventDetails.startTime,
      endTime: eventDetails.endTime,
      description: eventDetails.description,
      location: eventDetails.location,
      capacity: eventDetails.capacity,
      private:eventDetails.private,
      participants: JSON.stringify([participants])
 
    };
  
      // Call the updateEvent mutation
         
          //console.log("SELCETD ",selectedUsers)
          const selectedUserIds = selectedUsers.map((user) => user.id);

// Extract participant IDs from eventDetails
const currentParticipantIds = JSON.parse(eventDetails.participants).map((participant) => Object.keys(participant));

// Find IDs in selectedUsers that are not in eventDetails.participants
const usersToBeAddedIds = selectedUserIds.filter((currentUserId) => !currentParticipantIds[0].includes(currentUserId));

// Loop through each user in usersToBeAdded
for (const userId of usersToBeAddedIds) {
  const notificationMessage = `You were Invited to Join this Event: ${updatedEventDetails.title} by ${userData?.name}`;

  // Send notification to the current user
  const notificationResponse = await notify(userData.id,userId, 'EVENT_REQUEST', notificationMessage, 'UNREAD', eventId);
}

            console.log("DATA ",updatedEventDetails)
            

      const updateEventResponse = await API.graphql({
        query: mutations.updateEvent,
        variables: {
          input: updatedEventDetails,
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
  
      console.log("Event updated successfully:", updateEventResponse);
  
      // After updating the event, you can redirect to the dashboard or perform other actions as needed
      // window.location.href = '/dashboard';
      setOpen(false);
      handleNext();
    } catch (error) {
      // Handle error
      console.error('Error updating event:', error);
    } finally {
      // Set createLoadButton to false after the operation is complete
      setLoadCreateButton(false);
    }
  };
  



  const openSnackbar = (message) => {
  setSnackbarMessage(message);
  setSnackbarOpen(true);

  // Set a timeout to close the Snackbar after 5 seconds
  setTimeout(() => {
    setSnackbarOpen(false);
  }, 5000);
};

  

  const totalSteps =3;

  const handleNext = () => {
    console.log("NEXT",activeStep)
    if (activeStep === 0) {

      // Check if title and organizer are provided before moving to the next step
      if (!eventDetails.title || !eventDetails.organizer) {
        openSnackbar("Please fill in the required fields: Title and Organizer.");
        return;
      }
    }
  
 setActiveStep((prevActiveStep) => prevActiveStep + 1);
     setProgress((prevProgress) => (prevProgress + 100 / totalSteps > 100 ? 100 : prevProgress + 100 / totalSteps));
  };
  
  
  

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setProgress((prevProgress) => (prevProgress - 100 / totalSteps < 0 ? 0 : prevProgress - 100 / totalSteps));
  };

  const handleReset = () => {
    setActiveStep(0);
    setProgress(0);
  };

  const handleChange = (field, value) => {
    console.log("VALUE ",value)
    if (field.includes("time")) {
        // Handle time-related updates if needed
    } else if (field === "capacity") {
        // Validate and only accept positive integers for the "Capacity" field
        const intValue = parseInt(value);
        
        if(intValue>=1 || isNaN(intValue)){
 setEventDetails((prevDetails) => ({ ...prevDetails, [field]: intValue }));
        }
 

    } else {
        setEventDetails((prevDetails) => ({ ...prevDetails, [field]: value }));
    }
};

//On blur set capacity to default value of 1
const handleBlur = (field) => {
  const value = eventDetails[field];

  // Check if the value is less than 0 or not a number
  if (isNaN(value) || value < 1 || value >= 1024) {
    // Set the value to 0
    handleChange(field, 1);

    // Show Snackbar only when the input is invalid
    openSnackbar("Please enter a number between 1 and 1024");
  }
};

const handleUserClick = (user) => {
  // Check if the user is already marked for deletion
  const isUserMarked = usersToBeDeleted.some((markedUser) => markedUser.id === user.id);

  // Toggle the user's deletion status
  if(user.id != userData.id){
    if (isUserMarked) {
      // If already marked, remove from the list
      setUsersToBeDeleted((prevUsers) => prevUsers.filter((markedUser) => markedUser.id !== user.id));
    } else {
      // If not marked, add to the list
      setUsersToBeDeleted((prevUsers) => [...prevUsers, user]);
    }
  }
 
};


  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (

<>
<Box
   sx={{  width:"auto",   
      backgroundColor: '#f4f4f4',
   borderRadius: '10px',
   borderBottomLeftRadius:'0px',
   WebkitBorderBottomRightRadius:'0px',

  background: '',
boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
  background: 'linear-gradient(to bottom right,rgba(90, 63, 192,0.6),rgba(32, 29, 41,1))',
  color: "#f8f8f8",
opacity:"1.9",
  fontWeight: 'bold',
  fontFamily: 'Poppins, sans-serif',
  '& > *': {
    fontFamily: 'inherit',
    fontSize: '28px',
  },
  padding: '4%',}}
   >
    
     <Typography level="h3" style={{ color:"#f8f8f8", fontWeight:"550", marginLeft: '10px', fontFamily: 'Inter, sans-serif' }}>
              Edit Event
            </Typography>
     </Box>
<Grid container spacing={2} sx={{padding:"24px",paddingTop:"10px",paddingBottom:"0px"}}>

<Grid item xs={6} sx={{marginTop:"10px"}}>
  <Grid item xs={12}>
    <TextField
      label="Title"
      fullWidth
      variant="outlined"
      value={eventDetails.title}
      onChange={(e) => handleChange('title', e.target.value)}
      sx={{ fontFamily: 'Inter', mb: 2 }}
    />
  </Grid>
  <Grid item xs={12} sx={{marginTop:"10px"}}>
  <TextField
//   label="Organizer Name"
  fullWidth
  variant="outlined"
  value={eventDetails.organizer} // Set the value to userData.username
  onChange={(e) => handleChange('organizer', e.target.value)}
  disabled // Set the disabled prop to make it disabled
  sx={{ fontFamily: 'Inter', mb: 2 }}
/>

  </Grid>
  <Grid item xs={12} sx={{marginTop:"10px"}}>
    <TextField
      label="Location"
      fullWidth
      variant="outlined"
      value={eventDetails.location}
      onChange={(e) => handleChange('location', e.target.value)}
      sx={{ fontFamily: 'Poppins', mb: 2 }}
    />
  </Grid>
  </Grid>
 


<Grid item xs={6}>
<Uploader savedFile={savedFile} setSavedFile={setSavedFile}/>
  </Grid>



</Grid>
</>
        );
      case 1:
        return (
            <>
  <Box
    sx={{
      width: "auto",
      backgroundColor: '#f4f4f4',
      borderRadius: '10px',
      borderBottomLeftRadius: '0px',
      WebkitBorderBottomRightRadius: '0px',
      padding: '25px',
      paddingBottom: '30px',
      background: "linear-gradient(to bottom right, rgba(74, 158, 226,0.6),rgba(90, 63, 192,0.6))",
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
      marginBottom: '10px',
    }}
  >
    <Typography level="h3" style={{ color: "#f8f8f8", fontWeight: "550", marginLeft: '10px', fontFamily: 'Inter' }}>
      Edit Event
    </Typography>
  </Box>

  <Grid container spacing={2} sx={{ padding: "24px", paddingTop: "10px", paddingBottom: "0px" }}>
    <Grid item xs={6} sx={{marginTop:"10px"}}>
      {/* Left side - Image upload */}
      {/* TIME START */}
      <Grid item xs={12}>
   
     <LocalizationProvider dateAdapter={AdapterDayjs}>
    
        <DateTimePicker 
         label="Start Time"
         orientation="landscape"
         InputLabelProps={{ shrink: true }}
         fullWidth
         variant="outlined"
   
         value={dayjs(eventDetails.startTime)}
 
       onChange={(newValue) => setEventDetails((prevDetails) => ({ ...prevDetails, ["startTime"]: newValue }))}
       sx={{  mb: 2,width:"100%" }}/>
   
    </LocalizationProvider>

  </Grid>

{/* TIME END */}
  <Grid item xs={12}>
   
   <LocalizationProvider dateAdapter={AdapterDayjs}>
  
      <DateTimePicker 
       label="End Time"
       
       InputLabelProps={{ shrink: true }}
       fullWidth
       variant="outlined"
 
       value={dayjs(eventDetails.endTime)}

     onChange={(newValue) => setEventDetails((prevDetails) => ({ ...prevDetails, ["endTime"]: newValue }))}
       sx={{ fontFamily: 'Poppins', mb: 2,width:"100%" }}/>
 
  </LocalizationProvider>

</Grid>

{/* OTHER INPUTS */}
<Grid container spacing={2} sx={{ padding: "24px", paddingTop: "10px", paddingBottom: "0px" }}>
  <Grid item xs={12}>
    {/* Left side - Image upload */}
    <Grid container spacing={2}>
    <Grid item xs={3} sx={{ color: '#bfa3ff' }}>
      <FormControlLabel
  labelPlacement="top"
  color="#888888"
  style={{
    fontFamily: 'Poppins',
    fontSize: '12px', // Added 'px' to specify the unit
    marginBottom: '2px', // Changed 'mb' to 'marginBottom' for clarity
    color: '#1f1f1f',
  }}  control={
    <PurpleSwitch
      defaultChecked
      size="large"
      value={eventDetails.private}
      onChange={(e) => handleChange('private', e.target.checked)}
      color="default"
    />
  }
  label={
    <span
      style={{
        fontFamily: 'Poppins', // Set your desired font family
        fontSize: '14px', // Set your desired font size
      }}
    >
      Private
    </span>
  }
/>

               
      </Grid>
            <Grid item xs={4} sx={{ color: '#bfa3ff' }}>
        <FormControlLabel
         labelPlacement="top"
         color="#888888"
         style={{ fontFamily: 'Poppins', fontSize:"12", mb: 2, color: "#1f1f1f" }}
         
          control={
            <PurpleSwitch
              defaultChecked
              
              size="large"
              value={eventDetails.reoccuring}
              onChange={(e) => handleChange('reoccuring',  e.target.checked)}
              color="default"
            />
          }
          label={
            <span
              style={{
                fontFamily: 'Poppins', // Set your desired font family
                fontSize: '14px', // Set your desired font size
              }}
            >
              Reoccuring
            </span>
          }
       
        />
               
      </Grid>
      <Grid item xs={5}>
        <TextField
          label="Capacity"
          type="number"
          fullWidth
          variant="outlined"
          value={eventDetails.capacity}
          onChange={(e) => handleChange('capacity', e.target.value)}
          onBlur={() => handleBlur('capacity')}
          sx={{ fontFamily: 'Poppins', mb: 2 }}
        />
      </Grid>
    </Grid>
  </Grid>
</Grid>


    </Grid>


{/* SECOND HALF RIGHT SIDE */}
    <Grid item xs={6}>
      {/* Right side - Text box for description input */}
      <TextField
        label="Description"
        multiline
        rows={8}
        fullWidth
        variant="outlined"
        value={eventDetails.description}
        onChange={(e) => handleChange('description', e.target.value)}
        sx={{ fontFamily: 'Poppins', mb: 2 }}
      />
    </Grid>
  </Grid>
</>

        );
      case 2:
        return(
          <>
          {/* header */}
            <Box
    sx={{
      width: "auto",
      backgroundColor: '#f4f4f4',
      borderRadius: '10px',
      borderBottomLeftRadius: '0px',
      WebkitBorderBottomRightRadius: '0px',
      padding: '21px',
      paddingBottom: '30px',
      background: "linear-gradient(to bottom right, rgba(74, 158, 226,0.6),rgba(90, 63, 192,0.6))",
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
      marginBottom: '4px',
    }}
  >
    <Typography level="h3" style={{ color: "#f8f8f8", fontWeight: "550", marginLeft: '10px', fontFamily: 'Inter' }}>
      Add/Remove Participants
    </Typography>
  </Box>
  {/* body */}
          <Box p={3} bgcolor="#f0f0f0" borderRadius={16}> {/* Added margins, background color, and border radius */}
          <Grid container spacing={0}>
            <Grid item xs={12}>
            <Autocomplete
            multiple
            id="friend-search"
            options={userResults}
            getOptionLabel={(option) => option.name}
            onChange={handleUserSelection}
            sx={{fontFamily:"Poppins"}}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search and add friends"
                variant="outlined"
                sx={{ fontFamily: 'Poppins' }} // Set the font to Poppins
              />
            )}
          />
            </Grid>
  
            <Grid item xs={12} mt={2}>
              {/* <Typography variant="h5" mb={1} mt={2} fontWeight="bold" sx={{fontFamily:"Poppins",fontSize:"16px"}}>
                Your Participants
              </Typography> */}
              <TableContainer component={Paper} elevation={3} borderRadius={16} sx={{maxHeight:"200px", height:"200px",    overflowY: 'auto',
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
    },}}> {/* Improved styling for the table */}
      <Table>
      <TableHead>
        {/* Add your table headers here */}
      </TableHead>
      <TableBody>
        {selectedUsers.map((user) => (
          <TableRow
            key={user.id}
            onClick={() => handleUserClick(user)}
            sx={{ backgroundColor: usersToBeDeleted.some((markedUser) => markedUser.id === user.id) ? '#FFCCCC' : 'inherit' }}
          >
            <TableCell sx={{ padding: '6px',paddingLeft:"10px" }}>
              <Avatar src={user.imgUrl} />
            </TableCell>
            <TableCell sx={{ padding: '5px' }}>
              <Typography variant="body1" sx={{ textAlign: 'left' }}>
                {user.username}
              </Typography>
            </TableCell>
            {usersToBeDeleted.some((markedUser) => markedUser.id === user.id) ? (
              <TableCell align="right">
                <CancelIcon color="error" fontSize="small" /> {/* Trash icon */}
              </TableCell>
            ):(
              <TableCell align="right" sx={{width:"100%"}}>
              {/* <DeleteIcon color="error" fontSize="small" /> Trash icon */}
            </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
        </>
        )
      case 3:
        return(
            <>
            <Box
              sx={{
                width: "auto",
                backgroundColor: '#f4f4f4',
                borderRadius: '10px',
                borderBottomLeftRadius: '0px',
                WebkitBorderBottomRightRadius: '0px',
                padding: '25px',
                paddingBottom: '30px',
                background: "linear-gradient(to bottom right, rgba(74, 158, 226,0.6),rgba(90, 63, 192,0.6))",
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
                marginBottom: '10px',
                margin: 'auto',
              }}
            >
              <Typography level="h3" style={{ color: "#f8f8f8", fontWeight: "550", marginLeft: '10px', fontFamily: 'Poppins, sans-serif' }}>
                Send Invitations
              </Typography>
            </Box>
            <Grid container spacing={2} sx={{ padding: "24px", paddingTop: "0px", paddingBottom: "0px", margin: 'auto', }}>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ fontFamily: 'Poppins', mb: 2 }}>
                  Share the following link with your attendees :
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Invite Link"
                  fullWidth
                  value={`${window.location.origin}/join/${eventId.slice(0, 8)}`}  // Placeholder link
                  sx={{ fontFamily: 'Poppins', mb: 2, width: '50%' }}
                  InputProps={{
                    endAdornment: (
                      <IconButton aria-label="copy" onClick={() => navigator.clipboard.writeText(`${window.location.origin}/join/${eventId.slice(0, 8)}`)}>
                        <FileCopyIcon />
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </>
        )
        case 4:
            return(
                <>
                <Box
                  sx={{
                    width: "auto",
                    backgroundColor: '#f4f4f4',
                    borderRadius: '10px',
                    borderBottomLeftRadius: '0px',
                    WebkitBorderBottomRightRadius: '0px',
                    padding: '25px',
                    paddingBottom: '30px',
                    background: "linear-gradient(to bottom right, rgba(74, 158, 226,0.6),rgba(90, 63, 192,0.6))",
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
                    marginBottom: '10px',
                    margin: 'auto',
                  }}
                >
                  <Typography variant="h5" style={{ color: "#f8f8f8", fontWeight: "550", marginLeft: '10px', fontFamily: 'Poppins, sans-serif' }}>
                    Create Event
                  </Typography>
                </Box>
                <Grid container spacing={2} sx={{ padding: "24px", paddingTop: "0px", paddingBottom: "0px", margin: 'auto', }}>
                  <Grid item xs={12}>
                    <Typography variant="body1" sx={{ fontFamily: 'Poppins', mb: 2, fontSize:"24px" }}>
                     Thats it!.
                    </Typography>
                  </Grid>
             
                </Grid>
              </>
            )
      default:
        return null;
    }
  };

  return (
    <Container style={{ color:"#f8f8f8"}}maxWidth="md">
       <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="nested-modal-title"
          aria-describedby="nested-modal-description"
          sx={(theme) => ({
            [theme.breakpoints.only('xs')]: {
              top: 'unset',
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
              transform: 'none',
              maxWidth: 'unset',
            },
          })}
        >
<Typography id="nested-modal-title" level="h4">
  Confirm Your Changes
</Typography>
<Typography id="nested-modal-description" color="text.secondary">
  Are you sure you want to make these changes? These can affect your event.
</Typography>

          <Box
            sx={{
              mt: 1,
              display: 'flex',
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row-reverse' },
            }}
          >
            {!loadCreateButton? 
              <Button variant="soft" color="success" onClick={() => handleFinish()}>
              Update
            </Button>
            :
            
            
            <Button loading variant="solid" color="success" onClick={() => handleFinish()}>
            Update
          </Button>
            }
          
            <Button
              variant="soft"
              color="danger"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
      <Box
        boxShadow={3}
        mt={2}
     
        style={{
          background: '#f4f4f4',
          borderRadius: '10px',
          color: '#333',
        }}
      >
        {/* Linear Progress */}
       
        {/* Content for the current step */}
        {renderStepContent(activeStep)}
        <Stack sx={{ width: 'auto', color: '#bfa3ff',padding:"24px",paddingTop:"0px",paddingBottom:"0px" }} spacing={2}>
        <LinearProgress variant="determinate" style={{marginTop:"3%"    }}value={progress} color="inherit"/>
        </Stack>

        {/* Navigation buttons */}
        <Box mt={2} sx={{padding:"24px",paddingTop:"0px"}}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}>
            <Button variant="soft" disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            {activeStep === totalSteps-1  ? (
             <Button variant="soft" color="primary" onClick={()=>{      setOpen(true)}} startDecorator={<SaveAsIcon/>}>
             Finish
           </Button>
           
            ) : (
              <>
              {activeStep === totalSteps  ? ( 
                <Button variant="soft" color="primary" onClick={()=> window.location.href = '/dashboard'}>
                Done?
              </Button>
              ):(

                <Button variant="soft" color="primary"   onClick={handleNext}>
                Next
              </Button>

              )}

              </>
             
            )}
          </Box>
        </Box>
        
      </Box>
      
  <Snackbar
        variant="soft"
        color="danger"
        open={snackbarOpen}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        startDecorator={<ErrorOutlineSharpIcon />}
        endDecorator={
          <Button
            onClick={() => setSnackbarOpen(false)}
            size="sm"
            variant="soft"
            color="danger"
          >
            Dismiss
          </Button>
        }
      >
        {snackbarMessage}
      </Snackbar>


    </Container>
  );
};

export default EditEvent;




const PurpleSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: "#98a1fa",
      '&:hover': {
        backgroundColor: alpha("#c5b0ff", theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: "#c5b0ff",
    },
  }));