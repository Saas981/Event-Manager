import React, { useState, useEffect } from 'react';
import { Grid, Container, TextField, InputAdornment, IconButton, Card, CardContent, Typography, Avatar, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { Button } from '@mui/joy';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { listUsers } from '../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { useParams } from 'react-router-dom';
import { Storage } from 'aws-amplify';
import * as mutations from '../graphql/mutations'



const Search = ({userData,setUserData}) => {
 const { query: defaultQuery } = useParams();

  // Variables to store search results and search queries
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState(defaultQuery || '');

      //function to search
      const fetchUsers = async () => {
        try {
            //list Users which have the search query in their email or name. Also limit results to 30.
          const { data } = await API.graphql(graphqlOperation(listUsers, {
            filter: {
              or: [
                { email: { contains: searchQuery } },
                 { username: { contains: searchQuery } },
                { name: { contains: searchQuery } }
              ]
            },
            limit: 30
          }));
          //set results to data
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
          console.log("USERS RETREIVED ",searchResults)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

  
    useEffect(() => {
    fetchUsers();
  }, [searchQuery]);
  //When serachQuery changes call the use Effect above
  
  
  
  //Initial call to fetch users
    useEffect(() => {
    fetchUsers();
  }, []);


  const [anchorEl, setAnchorEl] = useState(null);

  // Function to handle opening the menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle closing the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleAddFriend = (userId) =>{
    console.log(" firend id",userId)
    console.log("EXSTING friends ",JSON.parse(userData?.friends)[0][userId])
      let friends = JSON.parse(userData?.friends);


      friends[0][userId] = { status:"friend" };
     
          setUserData((prevUserData) => ({
      ...prevUserData,
      friends: JSON.stringify(friends),
    }));
  }

    const handleRemoveFriend = (userId) =>{
    console.log(" firend id",userId)
    console.log("EXSTING friends ",userData?.friends)
      let friends = JSON.parse(userData?.friends);


      friends[0][userId] = { status:"oldFriend" };
     
          setUserData((prevUserData) => ({
      ...prevUserData,
      friends: JSON.stringify(friends),
    }));
  }


  return (
    <Container sx={{ paddingTop: '1%', paddingBottom: '5%' }}>
      {/* Search Bar */}
     

      {/* Search Options */}
      <Grid container spacing={3} sx={{ border: '2px dashed #ddd', padding: '5%', backgroundColor: '#fff' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            fontFamily: 'Poppins',
            marginBottom: '3%',
            backgroundColor: '#e1dcfc',
            borderRadius: '5px',
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end" sx={{ fontFamily: 'Poppins', marginLeft: '20px', padding: '0px' }}>
                <IconButton
                  aria-label="clear search"
                  size="small"
                  sx={{
                    width: '10%',
                    height: '10%',
                    backgroundColor: '#ded2f7',
                    padding: '15px',
                    borderRadius: '20px',
                    '&:hover': { backgroundColor: '#b8a2e8' },
                  }}
                  onClick={() => setSearchQuery('')}
                >
                  <ClearIcon fontSize="inherit" style={{ color: '#fff' }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      {/* Search Results */}
    <Grid
  container
  spacing={3}
  sx={{
    marginTop: '3%',
    border: '2px solid #ddd', // Set border styles
    borderRadius: '8px', // Set border-radius
    padding: '0%',
    backgroundColor: 'none',
    maxHeight: '800px',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '8px', // Set the width of the scrollbar
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#aaa', // Color of the thumb
      borderRadius: '8px', // Radius of the thumb
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'none', // Color of the track
    },
  }}
>

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
        <IconButton
          aria-label="more"
          id={`user-menu-${user.id}`}
          aria-controls={`user-menu-${user.id}`}
          aria-haspopup="true"
          onClick={handleMenuOpen}
        >
          <MoreVertIcon />
        </IconButton>
        {userData?.id != user.id ?
        
        (
            <>
            {JSON.parse(userData?.friends)[0][user.id]?.status=="friend"?(
            <Button
          variant="plain"
          color="danger"
          size="small"
          onClick={() => handleRemoveFriend(user.id)}
          sx={{ marginLeft: '16px', marginRight: '10px' }}
        >
          Remove Friend
        </Button>
        ):(
<Button
          variant="plain"
          color="primary"
          size="small"
          onClick={() => handleAddFriend(user.id)}
          sx={{ marginLeft: '16px', marginRight: '10px' }}
        >
          Add Friend
        </Button>
        )}
 </>
        ):(
 <Button
          variant="plain"
          color="neutral"
          size="small"
          onClick={() => console.log("This is you!")}
          sx={{ marginLeft: '16px', marginRight: '10px' }}
        >
          This is you
        </Button>
        )}
       
        <Menu
          id={`user-menu-${user.id}`}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Nickname</MenuItem>
          <MenuItem onClick={handleMenuClose}>Block</MenuItem>
          <MenuItem onClick={handleMenuClose}>Option 3</MenuItem>
        </Menu>
      </div>
    </Card>
  ))}
</Grid>

    </Container>
  );
};

export default Search;
