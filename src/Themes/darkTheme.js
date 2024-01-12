import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',

    primary: {
      main: '#1b1133',
      light: '#ddd0ff',
      dark: '#291f48',
    },
    secondary: {
      main: '#111433',
      light: '#deeef5',
      dark: '#152c33',
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
