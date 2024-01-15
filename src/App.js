import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Login from './Components/Login';
import SignUp from './Components/Signup';
import CreateEvent from './Components/CreateEvent';
import JoinEventPage from './Components/JoinEvent';
import Profile from './Components/Profile'
import Settings from './Components/Settings'
import ErrorPage from './Components/ErrorPage';
import EditEvent from './Components/EditEvent'
import UnauthorizedPage from './Components/UnauthorizedPage'
import Search from './Components/Search';
import Dashboard from './Components/Dashboard'
import { Container, Grid } from '@mui/material';
import './App.css'; 

import { Auth } from 'aws-amplify';
import config from './aws-exports';
import { Amplify } from 'aws-amplify';
import { ThemeProvider } from '@mui/material/styles';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from './graphql/mutations';
import * as queries from './graphql/queries'
import darkTheme from './Themes/darkTheme';
import lightTheme from './Themes/lightTheme';
import { Storage } from 'aws-amplify';


Amplify.configure(config);
// App.js


async function currentSession() {
  try {
    const { accessToken, idToken } = (await Auth.currentSession()).tokens ?? {};
    console.log("SESSION", accessToken)
  } catch (err) {
    console.log(err);
  }
}
currentSession()


function App({ signOut}) {
  const [theme,setTheme]= React.useState(darkTheme)
  const [themeType,setThemeType] = React.useState(1)
  const [user, setUser] = React.useState(null);
  const [userEmail, setUserEmail] = React.useState(null);
 const [userData, setUserData]= React.useState(null)



  useEffect(() => {
    const fetchProfilePicture = async () => {
      console.log("WAHT WE HAVE NOW ",userData)
      if (userData?.profilePicture) {
        console.log("PROFILEPICTUREIMAGE ",userData.profilePicture)
        try {
          // Fetch the profile picture from Storage
          const imgUrl = await Storage.get(userData.profilePicture)
          const file = await fetch(imgUrl).then(res => res.blob());
          console.log("IMGA URARL ",imgUrl)
              setUserData((prevUserData) => ({
      ...prevUserData,
      profilePictureImage: file,
    }));
          // Set the profile picture state
  
        } catch (error) {
          console.log("Error fetching profile picture: ", error);
        }
      }
    };
  
    // Call the function when userData.profilePicture changes
    fetchProfilePicture();
  }, [userData?.profilePicture]);









 useEffect(()=>{
  if(themeType==0){
    setTheme(lightTheme)
  }
  if(themeType==1){
    setTheme(darkTheme)
  }
 },[themeType])
   
 
  useEffect(() => {
    const currentAuthenticatedUser = async () => {
      try {
        const userDetails = await Auth.currentAuthenticatedUser();
        console.dir( userDetails);
        //console.log(`The userId: ${userId}`);
        //console.log(`The signInDetails: ${JSON.stringify(signInDetails)}`);
       // console.log(name)
       setUser(userDetails.username)
       setUserEmail(userDetails.attributes.email)
      } catch (err) {
        console.log(err);
      }
    };

    // Call the function when the component mounts
    currentAuthenticatedUser();
  }, [])


  //This is to see if a userObject has been made for ht autehnticated user. If not we can make that object
  useEffect(() => {
    const fetchOrCreateUserObject = async () => {
      try {
        // Check if the user object exists
        const getUserResponse = await API.graphql(graphqlOperation(queries.getUser, { id: user }));
        const existingUserObject = getUserResponse.data.getUser;
  
        if (!existingUserObject) {
          // If the user object doesn't exist, create it
          const createUserResponse = await API.graphql(graphqlOperation(mutations.createUser, { input: { id: user,email:userEmail } }));
          console.log("Newly created user object:", createUserResponse.data.createUser);
          setUserData(createUserResponse)
        } else {
        setUserData(existingUserObject)
          console.log("Existing user object:", existingUserObject);
        }
      } catch (error) {
        console.error("Error fetching or creating user object:", error);
      }
    };
  
    if (user) {
      fetchOrCreateUserObject();
    }
  }, [user]);



  useEffect(() => {
    const updateUserProfile = async () => {
      try {
        if (userData) {
          const { id, name,username,phone,profilePicture /* other properties from userData */ } = userData;
          const updatedUser = await API.graphql(
            {
            query: mutations.updateUser,
            variables: {
              input: {
               id: id,
               name:name,
               username:username,
               phone:phone,
               profilePicture:profilePicture
              },
            },
          }
          
          );
          console.log("User updated:", updatedUser.data.updateUser);
        }
      } catch (error) {
        console.error("Error updating user:", error);
      }
    };
  
    // Call the function when userData changes
    updateUserProfile();
  }, [userData]);
  
  
  




  return (
    
    <Router >
           <Navbar user={user} userData={userData} theme={theme} style={{zIndex:100}}/>
 <div style={{
          width:"100%",
          background: themeType === 1
            ? 'linear-gradient(to right, #1d1629, #1e1e24 )'
            : 'linear-gradient(to right, rgba(80, 63, 159,0.18), rgba(255, 81, 181,0.18))',
          paddingBottom: "10%",
          minHeight:"100vh"
        }}>   

          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ paddingTop: '9%', }}
            
          >
            <Routes>
            
              <Route path="/" element={<Home theme={theme}/>} />
              <Route path="/about" element={<About theme={theme}/>} />
              <Route path="/contact" element={<Contact theme={theme} />} />
              <Route path="/login" element={<Login theme={theme}/>} />
              <Route path="/signup" element={<SignUp theme={theme}/>} />
              <Route path="/dashboard" element={<Dashboard userId={user} />} />
              <Route path="/create" element={<CreateEvent userId={user}/>} />
              <Route path="/join/:eventId" element={<JoinEventPage user={user}/>} />
              <Route path="/profile" element={<Profile theme={theme}/>}/>
                            <Route path="/unauthorized" element={<UnauthorizedPage theme={theme}/>}/>

              <Route path='*' element={<ErrorPage theme={theme}/>}  />

             <Route path="/edit/:eventId" element={<EditEvent userId={user}/>} />

               <Route path="/search" element={<Search theme={theme} userId={user}/>}/>
                             <Route path="/search/:query" element={<Search theme={theme} userId={user}/>}/>


              <Route  path="/settings" element={<Settings userData={userData} setUserData={setUserData} theme={theme }themeType={themeType} setTheme={setThemeType}/>}/>
            </Routes>
          </Grid>
                    
      
      </div>
   
    </Router>
  );
}

export default App;
