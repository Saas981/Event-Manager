import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
   
       mode: 'light',
    primary: {
      main: '#b499f9',
      light: '#ddd0ff',
      dark: '#332754',
    },
    secondary: {
      main: '#a4e3f7',
      light: '#deeef5',
      dark: '#152c33',
    },
    background: {
      default: '#ffffff', // Default background color for light mode
      paper: '#e6e4f2', // Paper color for light mode (e.g., card backgrounds)
    },
    text: {
      primary: '#151229', // Default text color for light mode
      secondary: '#757575', // Secondary text color for light mode
    },
    action: {
      active: '#8e24aa', // Active (selected) item color
      hover: '#e0e0e0', // Hover color for interactive elements
    },
        textBackdrop:"#f8f8f8",

    divider: '#bdbdbd', // Divider color
  },
});

export default lightTheme;


