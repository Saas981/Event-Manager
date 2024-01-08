import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    type: 'dark', // Use dark mode
    primary: {
      main: '#1b1133', // Dark purple primary color
      contrastText: '#ffffff', // Text color against primary color
    },
    secondary: {
      main: '#111433', // Super dark purple secondary color
      contrastText: '#ffffff', // Text color against secondary color
    },
    background: {
      default: '#121212', // Default background color for dark mode
      paper: '#1E1E1E', // Paper color for dark mode (e.g., card backgrounds)
    },
    text: {
      primary: '#ffffff', // Default text color for dark mode
      secondary: '#A9A9A9', // Secondary text color for dark mode
    },
    action: {
      active: '#ffffff', // Active (selected) item color
      hover: '#333333', // Hover color for interactive elements
    },
    divider: '#666666', // Divider color
  },
 
});

export default darkTheme;
