import React, { useState, useEffect } from 'react';
import { Grid,  InputAdornment, IconButton,Typography, Avatar, Button, Box, Paper, Skeleton,Menu,MenuItem, Card, CardContent, } from '@mui/material';
import { red } from '@mui/material/colors';
import { listUsers,getUser } from '../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { Storage } from 'aws-amplify';


const Profile = ({ userData }) => {
  const imageUrl = userData?.profilePictureImage ? URL.createObjectURL(userData.profilePictureImage) : '';
  const [searchIds, setSearchIds] = useState([])
  const [searchResults, setSearchResults] = useState([]);
    useEffect(() => {
    // Ensure userData and friends are available before processing
    if (userData && userData.friends) {
      const friendsList = JSON.parse(userData.friends);

      // Filter friends with status "friend"
      const friendIds = Object.keys(friendsList[0]).filter(
        (friendId) => friendsList[0][friendId].status === 'friend'
      );
        console.log("FRIEND IDS ",friendIds)
      setSearchIds(friendIds);
    }
  }, [userData]);



    useEffect(() => {
    // Your existing useEffect code...
     

    // Fetch users based on searchIds
    const fetchUsers = async () => {
      try {
        console.log("SEraCH DEISA ",searchIds)
         const { data } = await API.graphql(graphqlOperation(listUsers, {
          filter: {
            or: searchIds.map(id => ({ id: { eq: id } }))
          },
          limit: 10
        }));
        
        console.log("RETRIVED SEARHCIDS PROFILE ", data)
        const users = data.listUsers.items;
        const usersWithImgUrl = await Promise.all(users.map(async (user) => {
          if (user.profilePicture) {
            try {
              const imgUrl = await Storage.get(user.profilePicture);
              return { ...user, imgUrl };
            } catch (error) {
              console.error('Error fetching data:', error);
              return user; // Return the user without imgUrl in case of an error
            }
          } else {
            return user; // Return the user without imgUrl if profilePicture is not present
          }
        }));

        setSearchResults(usersWithImgUrl);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (searchIds.length > 0) {
      fetchUsers();
    }
  }, [ searchIds]);



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
             {searchResults.map((user) => (

               <Card key={user.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', margin: '20px 10px' }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ width: 56, height: 56 }} src={user.imgUrl} />
        <div style={{ marginLeft: '16px' }}>
          <Typography variant="h6" component="div" sx={{ fontFamily: "Poppins" }}>
            {user.name}
          </Typography>
          <Typography variant="h6" component="div" sx={{ fontSize: 14, color: "#a8a8a8" }}>
            {user.username}
          </Typography>
          <Typography variant="h6" component="div" sx={{ mt: 2 }}>
            {user.email}
          </Typography>
        </div>
      </CardContent>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* <IconButton
          aria-label="more"
          id={`user-menu-${user.id}`}
          aria-controls={`user-menu-${user.id}`}
          aria-haspopup="true"
          onClick={handleMenuOpen}
        >
          <MoreVertIcon />
        </IconButton>

       
        <Menu
          id={`user-menu-${user.id}`}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Nickname</MenuItem>
          <MenuItem onClick={handleMenuClose}>Block</MenuItem>
          <MenuItem onClick={handleMenuClose}>Option 3</MenuItem>
        </Menu> */}
      </div>
    </Card>


             ))}



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