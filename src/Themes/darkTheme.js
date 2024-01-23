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
      paper: '#f1f1f1', // Paper color for dark mode (e.g., card backgrounds)
    },
    text: {
     primary: '#08041c',
      secondary: '#231f69',
    },
    action: {
      active: '#ffffff', // Active (selected) item color
      hover: '#333333', // Hover color for interactive elements
    },
    textBackdrop:"#e8e8e8",
    divider: '#666666', // Divider color
  },
 
});

export default darkTheme;
