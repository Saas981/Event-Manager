import React, { useEffect, useState } from 'react';
import { Typography, Container, Grid, Paper,Box, } from '@mui/material';
import StyledTabs from './StyledTabs'; // Import the StyledTabs component
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import  Button from "@mui/joy/Button"
import Switch from '@mui/material/Switch';
import ModalDialog from '@mui/joy/ModalDialog';
import Input from '@mui/joy/Input';
import ProfileUploader from './UploaderProfile';
import Textarea from '@mui/joy/Textarea';



const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const Settings = ({ themeType,setTheme,userData,setUserData,theme }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [profilePicture,setProfilePicture]= useState()
    const [bio, setBio  ] = useState('');

  const [open,setOpen] = useState(false)
  const [loadConfirmButton,setLoadConfirmButton] = useState(false)
  const [modalContent, setModalContent] = useState({
    type:'',
    title: '',
    description: '',
    inputLabel: '',
    inputValue: '',
  });

  useEffect(() => {
    console.log("USER DATA UPDATED ",userData)
    // Assuming that userData is an object and you want to update its profilePictureImage property
    setUserData((prevUserData) => ({
      ...prevUserData,
      profilePictureImage: profilePicture,
    }));
  }, [profilePicture]);
  
  

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

   const handleEdit = (settingType) => {
    return () => {
      console.log(`Edit ${settingType}`);
    
      setModalContent({
        type:settingType,
        title: `Edit ${settingType}`,
        description: `Please update your ${settingType}:`,
        inputLabel: settingType,
        inputValue: '', 
      });
        setOpen(true);
    };
  };

  const handleConfirm = () => {
    // Extract necessary information from modalContent
    const { type, inputValue } = modalContent;
  
    // Update the corresponding field in userData
    setUserData((prevUserData) => ({
      ...prevUserData,
      [type]: inputValue,
    }));
  
    // Close the modal
    setOpen(false);
  
    // Log the updated userData
    console.log("Updated UserData: ", userData);
  };
  

    const handleThemeToggle = () => {
    // Toggle between dark and light theme
    setTheme((prevTheme) => (prevTheme === 1 ? 0 : 1));
  };
  const [showPassword, setShowPassword] = useState(false);
  // hide password feature
  const SettingItem = ({ title, value, onEdit, theme }) => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <Typography variant="h6" sx={{ fontFamily: 'Poppins', color: "#393939", fontWeight: '700', marginRight: '8px', fontSize: '16px' }}>
        {title}:
      </Typography>
      {title === "Password" ? (
        <>
          <Typography variant="body1" sx={{ marginRight: 'auto', fontFamily: 'Poppins', backgroundColor: `${theme.palette.textBackdrop}`, padding: "6px", borderRadius: "6px", fontSize: '14px' }}>
            {showPassword ? value : '*'.repeat(value.length)}
          </Typography>
          <Button variant="soft" onClick={() => setShowPassword(!showPassword)} size="sm" sx={{ fontSize: "12px", padding: "3px 15px", fontFamily: 'Poppins', backgroundColor: "#94D8FF", color: "#004AAA", '&:hover': { backgroundColor: "#A9D7F1", color: "#6aa7f7" } }}>
            {showPassword ? "Hide" : "Show"}
          </Button>
        </>
      ) : (
        <>
          <Typography variant="body1" sx={{ marginRight: 'auto', fontFamily: 'Poppins', backgroundColor: `${theme.palette.textBackdrop}`, padding: "6px", borderRadius: "6px", fontSize: '14px' }}>
            {value}
          </Typography>
          <Button variant="soft" onClick={onEdit} size="sm" sx={{ fontSize: "12px", padding: "3px 15px", fontFamily: 'Poppins', backgroundColor: "#94D8FF", color: "#004AAA", '&:hover': { backgroundColor: "#A9D7F1", color: "#6aa7f7" } }}>
            Edit
          </Button>
        </>
      )}
    </div>
  );
  



  return (
    <>
    <Container sx={{ width: '100%', alignSelf: 'center' }}>
      <Grid container justifyContent="center" spacing={3}>
        {/* Left Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ borderRadius: '20px', padding: '25px', height: '100%', backgroundColor: `${theme.palette.background.paper}`, }}>
            {/* Use the SettingsHeader component */}
            <Typography variant="h4" mb={3} sx={{ fontFamily: 'Poppins', fontWeight: '700', marginBottom: "25px", textAlign: 'center',color:`${theme.palette.text.primary}`}}>
            User Settings
  </Typography>
            {/* Pass selectedTab as a prop to StyledTabs */}
            <StyledTabs selectedValue={selectedTab} onChange={handleTabChange} />
          </Paper>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ borderRadius: '20px', padding: '25px', height: '100%', paddingLeft: '50px', paddingRight: "45px", backgroundColor: `${theme.palette.background.paper}`, overflowY: 'auto' }}>
            {/* Content for the selected tab */}
            {selectedTab === 0 && (
              <div>
                {/* Use the SettingsHeader component */}
                <SettingsHeader title="Account Settings" />
                {/* Sample settings under the "Account Settings" tab */}
                <SettingItem theme={theme }title="Name" value={`${userData?.name}`} onEdit={handleEdit("name")} />
                <SettingItem theme={theme }title="Username" value={`${userData?.username}`} onEdit={handleEdit("username")} />
                <SettingItem theme={theme }title="Phone Number" value={`${userData?.phone}`} onEdit={handleEdit("phone")} />
                <SettingItem theme={theme }title="Email Address" value={`${userData?.email}`} onEdit={handleEdit("email")} />
                <SettingItem theme={theme }title="Password" value={`${userData?.password}`}  onEdit={handleEdit("password")} />
                
                 <Typography variant="h5" mb={3} sx={{  fontFamily: 'Poppins', fontWeight: '600', marginTop: "30px",color:"#292929", textAlign: 'left'}}>
                Account Deletion
                </Typography>
                 <Typography variant="body1" mb={3} sx={{ fontFamily: 'Poppins', textAlign: 'left', fontSize: '16px', lineHeight: '1.5' }}>
                  Are you sure that you want to delete your account? This will immediately log you out of your account and you will not be able to log in again.
                </Typography>
                <Button variant="soft" color="danger" size="lg" sx={{ width:"100%",borderRadius:"15px", fontFamily: 'Poppins', fontSize: '16px', padding: '10px 30px',backgroundColor: "#ffa3a4", '&:hover': { backgroundColor: "#FF6668" } }}>
                  Delete Account
                </Button>
              </div>
            )}
            {selectedTab === 1 && (
              <div>
                {/* Use the SettingsHeader component */}
                <SettingsHeader title="Privacy and Safety" />
                {/* Sample settings under the "Privacy and Safety" tab */}
               
              </div>
            )}
            {selectedTab === 2 && (
              <div>
                {/* Use the SettingsHeader component */}
                <SettingsHeader title="Parental Controls" />
                {/* Add your privacy settings content here */}
              </div>
            )}
            {selectedTab === 3 && (
              <div>
                {/* Account Deletion Section */}
                <SettingsHeader title="Customizations" sx={{ marginBottom: 0 }} />
                
             <Grid container>
      {/* This should be in 1 row with 1 grid item */}
      <Grid item  xs={3} sx={{marginTop:"0"}}>
           <SettingItemStatic theme={theme} title="Profile Picture" />
        <ProfileUploader savedFile={profilePicture} setSavedFile={setProfilePicture} sx={{marginTop:"1%"}}/>
     
      </Grid>

      {/* Description and text area box */}
      <Grid item xs={9}>
        <Box sx={{ marginLeft: 2 }}>
     <SettingItemStatic theme={theme} title="Bio" />

    
          <Textarea
          color="neutral"
  disabled={false}
  minRows={4}
  size="md"
  variant="outlined"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            aria-label="description"
            placeholder="Write your description here..."
            style={{ width: '100%', minHeight: '80px', padding: '8px', borderRadius: '4px' }}
          />
        </Box>
      </Grid>
    </Grid>



                 <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 3 }}>
     <SettingItemStatic theme={theme} title="Dark Mode" />
            <Switch
              checked={themeType === 1}
              onChange={handleThemeToggle}
              inputProps={{ 'aria-label': 'Dark Theme Toggle' }}
            />
          </Box>

          
              </div>
            )}
            {/* Add more sections for other tabs as needed */}
          </Paper>
        </Grid>
      </Grid>
    </Container>
    
                <Modal color="neutral" variant="soft" open={open} onClose={() => setOpen(false)} sx={{ 
 backdropFilter: "blur(2px)", 
backgroundColor: "rgb(32, 29, 41,0.3)"}}>
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
          <Typography id="nested-modal-title" level="h3"  sx={{fontFamily:"Poppins",fontWeight:"600",fontSize:"24px",marginBottom:"-10px"}}>
            {modalContent.title}
          </Typography>
          <Typography id="nested-modal-description" color="text.secondary "  sx={{fontFamily:"Poppins",fontWeight:"450",fontSize:"14px",marginTop:"0px"}}>
            {modalContent.description}
          </Typography>

          <Input size="sm" variant="outlined"
            label={modalContent.inputLabel}
        
            fullWidth
            value={modalContent.inputValue}
            onChange={(e) => setModalContent({ ...modalContent, inputValue: e.target.value })}
            sx={{ mt: 0 , }}
          
          />

          <Box
            sx={{
              mt: 2,
              display: 'flex',
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row-reverse' },
            }}
          >
            {!loadConfirmButton ?
              <Button variant="soft" color="success" onClick={() => {
                setOpen(false)
              handleConfirm()}}>
                Confirm
              </Button>
              :
              <Button loading variant="solid" color="success" onClick={() => {
                setOpen(false)
              handleConfirm()}}>
                Confirm
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


    </>
  );
};

const SettingsHeader = ({ title }) => (
  <Typography variant="h4" mb={3} sx={{ fontFamily: 'Poppins', fontWeight: '700', marginBottom: "30px", textAlign: 'left' }}>
    {title}
  </Typography>
);

// Custom component for each setting item
const SettingItem = ({ title, value, onEdit,theme }) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
    <Typography variant="h6" sx={{ fontFamily: 'Poppins',color:"#393939", fontWeight: '700', marginRight: '8px', fontSize: '16px' }}>
      {title}:
    </Typography>
    <Typography variant="body1" sx={{ marginRight: 'auto', fontFamily: 'Poppins', backgroundColor: `${theme.palette.textBackdrop}`, padding: "6px", borderRadius: "6px", fontSize: '14px' }}>
      {value}
    </Typography>
    <Button variant="soft" onClick={onEdit} size="sm" sx={{ fontSize: "12px", padding: "3px 15px", fontFamily: 'Poppins', backgroundColor: "#94D8FF", color: "#004AAA", '&:hover': { backgroundColor: "#A9D7F1", color: "#6aa7f7" } }}>
      Edit
    </Button>
  </div>
);

const SettingItemStatic = ({ title,theme }) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px',marginTop:"5px" }}>
    <Typography variant="h6" sx={{ fontFamily: 'Poppins',color:"#393939", fontWeight: '700', marginRight: '8px', fontSize: '16px' }}>
      {title}
    </Typography>
   
  </div>
);

export default Settings;
