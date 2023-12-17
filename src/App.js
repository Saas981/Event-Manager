import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Login from './Components/Login';
import SignUp from './Components/Signup';
import Dashboard from './Components/Dashboard'
import { Container, Grid } from '@mui/material';
import './App.css'; 

import { getCurrentUser } from 'aws-amplify/auth';
import config from './aws-exports';
import { Amplify } from 'aws-amplify';
import { fetchAuthSession } from 'aws-amplify/auth';
import { CookieStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
Amplify.configure(config);
cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage());
// App.js


async function currentSession() {
  try {
    const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
    console.log("SESSION", accessToken)
  } catch (err) {
    console.log(err);
  }
}
currentSession()


function App({ signOut}) {
  const [user, setUser] = React.useState(null);
 
  useEffect(() => {
    const currentAuthenticatedUser = async () => {
      try {
        const username = await getCurrentUser();
        console.log(`The username: ${JSON.stringify(username)}`);
        //console.log(`The userId: ${userId}`);
        //console.log(`The signInDetails: ${JSON.stringify(signInDetails)}`);
       // console.log(name)
       setUser(username.signInDetails.loginId)
      } catch (err) {
        console.log(err);
      }
    };

    // Call the function when the component mounts
    currentAuthenticatedUser();
  }, [])
  return (
    <Router >
           <Navbar user={user}style={{zIndex:100}}/>
      <div style={{minHeight: '90vh',height:"auto",background: 'linear-gradient(to right, rgba(80, 63, 159,0.18), rgba(255, 81, 181,0.18))',paddingBottom:"10%",paddingTop:"6%"}} >
   
        <br></br>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ paddingTop: '20px', }}
            
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Grid>
      
      </div>
    </Router>
  );
}

export default App;
