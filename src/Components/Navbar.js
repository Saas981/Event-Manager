
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Container,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Stack,
  Slide,
  LinearProgress,
  Badge,
  CircularProgress,
  Avatar,
  ThemeProvider,
} from '@mui/material';
import { Home, Info, ContactMail, Person, Login, Logout, PersonAdd,Settings, Menu as MenuIcon, Dashboard } from '@mui/icons-material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { styled, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import '../Styles/Navbar.css';
import darkTheme from '../Themes/darkTheme';




const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    width:"1px",
    height:"7px",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      // position: 'absolute',
      // top: 0,
      // left: 0,
      // width: '100%',
      // height: '100%',
      // borderRadius: '50%',
      // // animation: 'ripple 1.2s infinite ease-in-out',
      // border: '1px solid currentColor',
      // content: '""',
    },
  },
  // '@keyframes ripple': {
  //   '0%': {
  //     transform: 'scale(.8)',
  //     opacity: 1,
  //   },
  //   '100%': {
  //     transform: 'scale(2.4)',
  //     opacity: 0,
  //   },
  // },
}));


const Navbar = ({ user,setTheme }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = useState(false); // Added loading state


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
        <ThemeProvider theme={darkTheme}>

    <>
    <Slide appear={false} direction="down" in={!trigger}>
<AppBar
  className="navbar"
  position="fixed"
  style={{
    opacity: 1,
    background: `linear-gradient(to right, ${darkTheme.palette.primary.main}, ${darkTheme.palette.secondary.main})`,
    borderRadius: 0,
  }}
>       <Container>
          <Toolbar >
            <IconButton className="nav-button" edge="start" color="inherit" component={Link} to="/">
              <Home />
            </IconButton>
            <Typography variant="h6" style={{ flexGrow: 1, marginLeft: '10px', fontFamily: 'Poppins, sans-serif' }}>
              Event Manager
            </Typography>
            {isMobile ? (
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
            <Button color="inherit" className="nav-button" component={Link} to="/about" style={{ marginTop: "4px", marginRight: '3%', fontFamily: 'Poppins, sans-serif' }}>
                  About
                  <Info style={{ marginLeft: '5px' }} />
                </Button>
                <Button color="inherit" className="nav-button" component={Link} to="/contact" style={{ marginTop: "4px", marginRight: '50%', fontFamily: 'Poppins, sans-serif' }}>
                  Contact
                  <ContactMail style={{ marginLeft: '5px' }} />
                </Button>
                  <Button color="inherit" className="nav-button" style={{ marginRight: '1px' }}>
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                    >
                      <Avatar onClick={handleOpenMenu} />
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
          </ThemeProvider>

  );
};

export default Navbar;
