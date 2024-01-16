import React from 'react';
import { Grid, Typography, Avatar, Button, Box, Paper, Skeleton } from '@mui/material';
import { red } from '@mui/material/colors';

const Profile = ({ userData }) => {
  const imageUrl = userData?.profilePictureImage ? URL.createObjectURL(userData.profilePictureImage) : '';

  return (
    <Grid container spacing={2} sx={{ width: '80%' }}>
      {/* First Column */}
      <Grid item xs={8}>
        <Paper elevation={3} sx={{ borderRadius: '20px', padding: '20px', backgroundColor: '#fff' }}>
        <Typography variant="h5" sx={{ marginBottom: '10px', borderRadius: '10px', background: '#f0f0f0', padding: '5px' }}>
            Your Profile
          </Typography>
          <Grid container spacing={0}>
      {/* First Column */}
      <Grid item xs={6} sx={{ backgroundColor: 'gold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Avatar alt="Profile picture" src={imageUrl} sx={{ width: '120px', height: '120px' }} />
      </Grid>

      {/* Second Column */}
      <Grid item xs={2} sx={{ width: '80%', backgroundColor: 'red', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10px' }}>
        <Typography variant="h6">{userData?.username}</Typography>
        <Typography variant="body1">Your bio goes here...</Typography>
      </Grid>
    </Grid>
          {/* Profile Picture and Bio */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box>
            </Box>
          </Box>
        </Paper>
      </Grid>

      {/* Second Column */}
      <Grid item xs={4}>
        <Paper elevation={3} sx={{ borderRadius: '20px', padding: '20px', backgroundColor: '#fff' }}>
          <Typography variant="h5" sx={{ marginBottom: '10px', borderRadius: '10px', background: '#f0f0f0', padding: '5px' }}>
            Friends
          </Typography>
          {/* Friends List or Related Content */}
          <Box>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            {/* Add more skeletons or actual content */}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Profile;