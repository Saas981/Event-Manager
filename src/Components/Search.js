import React, { useState, useEffect } from 'react';
import { Grid, Container, TextField, InputAdornment, IconButton, Card, CardContent, Typography, Avatar, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { listUsers } from '../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { useParams } from 'react-router-dom';
import { Storage } from 'aws-amplify';




const Search = () => {
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
      <Grid container spacing={3} sx={{ marginTop: '3%', border: '2px dashed #ddd', padding: '5%', backgroundColor: '#fff' }}>
  {searchResults.map((user) => (
    <Card key={user.id} sx={{ width: "30%", margin: '20px 10px' }}>
      <CardContent>
        <div style={{ position:"relative" }}>
        <Avatar sx={{ width: 56, height: 56 }} src={user.imgUrl}/>
            <Typography variant="h6" component="div" sx={{ marginTop:2,fontFamily:"Poppins" }}>
          {user.name}
        </Typography>
        <Typography variant="h6" component="div" sx={{ marginTop:0,fontSize:14,color:"#a8a8a8" }}>
          {user.username}
        </Typography>
        <Typography variant="h6" component="div" sx={{ mt: 2 }}>
          {user.email}
        </Typography>
        
 <div style={{ height: "100px",width: "100px",overflow: "auto"}}>
          <IconButton
            aria-label="more"
            id={`user-menu-${user.id}`}
            aria-controls={`user-menu-${user.id}`}
            aria-haspopup="true"
            onClick={handleMenuOpen}
            sx={{ position: 'absolute', top: 10, right: 10 }}
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
          </Menu>
        </div>
        </div>
       
      </CardContent>
    </Card>
  ))}
</Grid>

    </Container>
  );
};

export default Search;
