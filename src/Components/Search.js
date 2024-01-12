import React from 'react';
import { Grid, Container, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const Search = () => {
  return (
    <Container sx={{ paddingTop: '5%', paddingBottom: '5%' }}>
      {/* Search Bar */}
     

      {/* Search Options */}
      <Grid container spacing={3} sx={{ border: '2px dashed #ddd', padding: '5%', backgroundColor: '#fff' }}>
        <TextField
        fullWidth
        variant="outlined"
        placeholder="Search..."
        sx={{
          fontFamily:"Poppins",
          marginBottom: '3%',
          backgroundColor: '#e1dcfc', // Set background color
          borderRadius: '5px', // Add border-radius for a sleek look
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
               <InputAdornment position="end" sx={{  fontFamily:"Poppins",marginLeft: '20px', padding: '0px' }}>
              <IconButton
                aria-label="clear search"
                size="small"
                sx={{
                  width: '10%',
                  height: '10%',
                  backgroundColor: '#ded2f7',
                  padding: '15px', // Adjusted padding
                  borderRadius: '20px',
                  '&:hover': { backgroundColor: '#b8a2e8' },
                }}
              >
                <ClearIcon fontSize="inherit" style={{ color: '#fff' }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      </Grid>

      {/* Search Results */}
      <Grid container spacing={3} sx={{ marginTop: '3%', border: '2px dashed #ddd', padding: '5%', backgroundColor: '#fff' }}>
        {/* Add your search results components here */}
        {/* For example, you can use Card, Typography, etc. */}
      </Grid>
    </Container>
  );
};

export default Search;
