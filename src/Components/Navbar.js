import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Container,
  Avatar,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Slide,
} from '@mui/material';
import { Home, Info, ContactMail, Login, Person, PersonAdd, Menu as MenuIcon } from '@mui/icons-material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import '../Styles/Navbar.css';

const Navbar = ({ user, signOut }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState(null);

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
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar className="navbar" position="fixed" style={{ opacity: 0.5, background: 'linear-gradient(to right, #ae9dfa, #f7abd7)', borderRadius: 0 }}>
        <Container>
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
                <Button color="inherit" className="nav-button" component={Link} to="/about" style={{ marginTop: "4px", marginRight: '30px', fontFamily: 'Poppins, sans-serif' }}>
                  About
                  <Info style={{ marginLeft: '5px' }} />
                </Button>
                <Button color="inherit" className="nav-button" component={Link} to="/contact" style={{ marginTop: "4px", marginRight: '480px', fontFamily: 'Poppins, sans-serif' }}>
                  Contact
                  <ContactMail style={{ marginLeft: '5px' }} />
                </Button>
                {user ? (
                  // Show profile icon when signed in
                  <Avatar alt="User Avatar" src="/avatar.jpg" style={{ marginLeft: '10px' }} />
                ) : (
                  // Show login and signup icons when signed out
                  <>
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
      </AppBar>
    </Slide>
  );
};

export default Navbar;
