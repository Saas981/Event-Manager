
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Container,
  useMediaQuery,

  Menu,
  MenuItem,
  Stack,
  Slide,
  LinearProgress,
  Badge,
  CircularProgress,
  Avatar,
  
} from '@mui/material';
import { Home, Info, ContactMail, Person, Login, Logout, PersonAdd,Settings, Menu as MenuIcon, Dashboard } from '@mui/icons-material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import '../Styles/Navbar.css';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import { API, graphqlOperation } from 'aws-amplify';
import { listNotifications } from '../graphql/queries';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    width:"1px",
    height:"7px",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  
  },

}));


const Navbar = ({ user,setTheme,theme,userData }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = useState(false); // Added loading state
  const [searchQuery, setSearchQuery] = useState('');
  const [totalNotifications,setTotalNotifications] = useState(0)
  const navigate = useNavigate();


    const handleSearch = () => {
    // Navigate to the search page with the current searchQuery
    navigate(`/search/${searchQuery}`);
  };

  const handleClearSearch = () => {
    // Clear the search query and navigate to the search page
    setSearchQuery('');
    navigate(`/search`);
  };


const fetchAndSetTotalNotifications = async () => {
  try {
    if (userData?.id) {
      // Fetch notifications for the current user
      const response = await API.graphql({
        query: listNotifications,
        variables: {
          filter: { recepient: { eq: userData.id } },
          limit: 100,
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS', // Specify the authentication mode
      });

      // Update the total number of notifications
      setTotalNotifications(response.data.listNotifications.items.length);
    }
  } catch (error) {
    console.error('Error fetching notifications:', error);
    // Handle error appropriately
  }
};

// Call the function in useEffect
useEffect(() => {
  fetchAndSetTotalNotifications();
}, [userData]);


  console.log("CURRENT USER ",user)
  async function handleSignOut() {
    try {
      setLoading(true); // Set loading to true when starting sign-out
      await Auth.signOut();
      await new Promise(resolve => setTimeout(resolve, 1500));
      window.location.reload(); // Reload the page after successful sign-out
      window.location.href = '/login';

    } catch (error) {
      console.log('error signing out: ', error);
    } finally {
      setLoading(false); // Set loading to false whether sign-out succeeds or fails
    }
  }


  const trigger = useScrollTrigger({
    disableHysteresis: true,
    target: window,
    threshold: 50,
  });

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const pages = ['About', 'Contact', 'Login', 'Signup'];

  return (

    <>
    <Slide appear={false} direction="down" in={!trigger}>
<AppBar
  className="navbar"
  position="fixed"
  style={{
    opacity: 1,
      background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    padding:"0.5%",
    borderRadius: 0,
  }}
>       <Container>
          <Toolbar >
            <IconButton className="nav-button" edge="start" color="inherit" component={Link} to="/">
              <Home />
            </IconButton>
         
            <Typography variant="h6" style={{ flexGrow: 1, marginLeft: 'x', fontFamily: 'Poppins, sans-serif' }}>
              Event Manager
            </Typography>
            {1!=1 ? (
              // Hamburger menu for smaller screens
              <>
                <IconButton className="nav-button" edge="end" color="inherit" onClick={handleOpenMenu}>
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseMenu}>
                      <Typography textAlign="center" style={{ fontFamily: 'Poppins, sans-serif' }}>{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
           
             
                {user ? (
                  
                  <>
            <Button color="inherit" className="nav-button" component={Link} to="/about" style={{ marginTop: "4px", marginRight: '3%', fontFamily: 'Poppins, sans-serif',fontSize:"0.8rem" }}>
                  About
                  <Info style={{ marginLeft: '5px' }} />
                </Button>
                <Button color="inherit" className="nav-button" component={Link} to="/contact" style={{ marginTop: "4px", marginRight: '48%', fontFamily: 'Poppins, sans-serif',fontSize:"0.8rem"  }}>
                  Contact
                  <ContactMail style={{ marginLeft: '5px' }} />
                    
                </Button>
                 
                  {/* <Button color="inherit" className="nav-button" component={Link} to="/search" style={{ marginTop: "4px", marginRight: '40%', fontFamily: 'Poppins, sans-serif' }}>
                  Search
                  <SearchIcon style={{ marginLeft: '5px' }} />
                </Button> */} <Search sx={{marginTop: "4px",position:"absolute", left: '45%'}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
               placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
            />
          </Search>
              <IconButton className="nav-button" edge="start" color="inherit" component={Link} to="/notifications" sx={{marginRight:"1.5%"}}>
              <Badge badgeContent={totalNotifications}  color='error'>
                 <EmailIcon sx={{fontSize:"26px"}}/>
                 </Badge>
            </IconButton>

        
                  <Button color="inherit" className="nav-button" style={{ marginRight: '1px' }}>
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                    >
                         {userData?.profilePictureImage ?(
                          <Avatar onClick={handleOpenMenu} src={URL.createObjectURL(userData?.profilePictureImage)} sx={{ width: 48, height: 48}}/>
                               
                               
                                  ) :(  <Avatar onClick={handleOpenMenu} sx={{  width: 48, height: 48}} />)}
                    
                    </StyledBadge>

                   
                    <Menu
                      anchorEl={anchorEl}
                      style={{marginTop:'10px'}}
                      open={Boolean(anchorEl)}
                      onClose={handleCloseMenu}
                    >
                                <MenuItem component={Link} to="/profile" onClick={handleCloseMenu}>
                               
            <Person style={{ marginRight: '8px', fontSize: '22px' }} />

            <span style={{ fontSize: '15px' }}>Profile</span>
          </MenuItem>
                        <MenuItem component={Link} to="/dashboard" onClick={handleCloseMenu}>
            <Dashboard style={{ marginRight: '8px', fontSize: '22px' }} />
            <span style={{ fontSize: '15px' }}>Dashboard</span>
          </MenuItem>
          <MenuItem component={Link} to="/settings" onClick={handleCloseMenu}>
            <Settings style={{ marginRight: '8px', fontSize: '22px' }} />
            <span style={{ fontSize: '15px' }}>Settings</span>
          </MenuItem>
                     <MenuItem onClick={handleSignOut}>
            <Logout style={{ marginRight: '8px',fontSize:'22px' }} />
            <span style={{fontSize:'15px'}}>Log Out</span>
          </MenuItem>
        
                    </Menu>
                  </Button>
                </>
                ) : (
                  // Show login and signup icons when signed out
                  <>
                     <Button color="inherit" className="nav-button" component={Link} to="/about" style={{ marginTop: "4px", marginRight: '30px', fontFamily: 'Poppins, sans-serif' }}>
                  About
                  <Info style={{ marginLeft: '5px' }} />
                </Button>
                <Button color="inherit" className="nav-button" component={Link} to="/contact" style={{ marginTop: "4px", marginRight: '480px', fontFamily: 'Poppins, sans-serif' }}>
                  Contact
                  <ContactMail style={{ marginLeft: '5px' }} />
                </Button>
                    <Button color="inherit" className="nav-button" component={Link} to="/login" style={{ marginRight: '1px' }}>
                      <Login />
                    </Button>
                    <Button color="inherit" className="nav-button" component={Link} to="/signup" style={{ marginRight: '10px' }}>
                      <PersonAdd />
                    </Button>
                  </>
                )}
              </>
            )}
           
          </Toolbar>
        </Container>
       
        { loading && (
           <Stack sx={{ width: '100%', color: '#bfa3ff' }} spacing={2}>
           <LinearProgress
    style={{ position: "fixed", bottom: 0, left: 0, right: 0,height:"4px", backgroundColor: "#cec7fc" }}
    color="inherit"

    variant="indeterminate"
  />
         </Stack>
   
  
     
      )}
       
      </AppBar>
     
    </Slide>
   
      </>

  );
};

export default Navbar;



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 10, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));