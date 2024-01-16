import React, { useState } from 'react';
import { Container, TextField, Grid, LinearProgress,Stack,Switch,IconButton } from '@mui/material';
import Uploader from "./Uploader"
import Snackbar from '@mui/joy/Snackbar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import FormControlLabel from '@mui/material/FormControlLabel';
import { alpha, styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import ErrorOutlineSharpIcon from '@mui/icons-material/ErrorOutlineSharp';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ModalDialog from '@mui/joy/ModalDialog';
import Box from '@mui/joy/Box';
import { Storage } from 'aws-amplify';


const CreateEvent = ({userId,theme,userData}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [loadCreateButton, setLoadCreateButton] = React.useState(false)
  const [savedFile, setSavedFile]= React.useState();
  const [eventId,setEventId]= React.useState();
  const [eventDetails, setEventDetails] = useState({
    title: '',
    startTime: dayjs(),
    location: '',
    reoccuring: false,
    endTime: dayjs().add(1,'day'),
    capacity: 1,
    participants:`[ { "${userId}": { "permissions": "admin" } } ]`,
    description: '',
    organizer: userData.username,
    coverImage:'',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');

  

const openSnackbar = (message) => {
  setSnackbarMessage(message);
  setSnackbarOpen(true);

  // Set a timeout to close the Snackbar after 5 seconds
  setTimeout(() => {
    setSnackbarOpen(false);
  }, 5000);
};
  const handleFinish = async () => {
    // Assuming you have the mutation defined, replace 'createEvent' with your actual mutation
    try {
      setLoadCreateButton(true);
      if(savedFile){
        setEventDetails((prevDetails) => ({ ...prevDetails, ["coverImage"]: eventDetails.title+eventDetails.organizer+savedFile.name }))
      }
      console.log("FILE", savedFile)
        try {
          await Storage.put("eventCovers/"+eventDetails.title+eventDetails.organizer+savedFile.name , savedFile, {
            contentType: "image/png", // contentType is optional
          });
        } catch (error) {
          console.log("Error uploading file: ", error);
        }

    //  Storage.put(savedFile,savedFile.name)
    

       console.log("EVENT DETAILS CREATING ",eventDetails)

      let updatedEventDetails = eventDetails
      if(savedFile){
        updatedEventDetails = { ...eventDetails, coverImage: eventDetails.title+eventDetails.organizer+savedFile.name  };
      }
      console.log("USER ID RIGHT NOW ", userId)

       const createEventResponse = await API.graphql({ 
         query: mutations.createEvent,
         variables: {
           input: updatedEventDetails,
         }
       });
      const thisEventId = createEventResponse.data.createEvent.id;
      setEventId(thisEventId)
   

setTimeout(() => {
  // After 3 seconds, set createLoadButton to false and redirect to the dashboard
  setLoadCreateButton(false);
  setOpen(false);
  handleNext()
  // window.location.href = '/dashboard';

}, 100);
    } catch (error) {
      // Handle error
      console.error('Error creating event:', error);
    }
  };

  

  const totalSteps =2;

  const handleNext = () => {
    if (activeStep === 0) {
      handleChange("participants",`[ { "${userId}": { "permissions": "admin" } } ]`)

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
   padding: '25px',
   paddingBottom:'30px',
   background: "linear-gradient(to bottom right, rgba(74, 158, 226,0.6),rgba(90, 63, 192,0.6))",
   boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
   marginBottom: '10px',}}
   >
    
     <Typography level="h3" style={{ color:"#f8f8f8", fontWeight:"550", marginLeft: '10px', fontFamily: 'Inter, sans-serif' }}>
              Event Creation 
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
  label="Organizer Name"
  fullWidth
  variant="outlined"
  value={userData.username} // Set the value to userData.username
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
      Event Creation
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
   
         value={eventDetails.startTime}
 
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
 
       value={eventDetails.endTime}

     onChange={(newValue) => setEventDetails((prevDetails) => ({ ...prevDetails, ["endTime"]: newValue }))}
       sx={{ fontFamily: 'Poppins', mb: 2,width:"100%" }}/>
 
  </LocalizationProvider>

</Grid>

{/* OTHER INPUTS */}
<Grid container spacing={2} sx={{ padding: "24px", paddingTop: "10px", paddingBottom: "0px" }}>
  <Grid item xs={12}>
    {/* Left side - Image upload */}
    <Grid container spacing={2}>
      <Grid item xs={6} sx={{ color: '#bfa3ff' }}>
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
          label="Reoccuring"
       
        />
      </Grid>
      <Grid item xs={6}>
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
                  value={`link/${eventId}`}  // Placeholder link
                  sx={{ fontFamily: 'Poppins', mb: 2, width: '50%' }}
                  InputProps={{
                    endAdornment: (
                      <IconButton aria-label="copy" onClick={() => navigator.clipboard.writeText(`${window.location.origin}/join/${eventId}`)}>
                        <FileCopyIcon />
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
            </Grid>
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
  Confirm Event Creation
</Typography>
<Typography id="nested-modal-description" color="text.secondary">
  Are you sure you want to create this event? Once created, some details may be irreversible.
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
              Create
            </Button>
            :
            
            
            <Button loading variant="solid" color="success" onClick={() => handleFinish()}>
            Create
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

export default CreateEvent;




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