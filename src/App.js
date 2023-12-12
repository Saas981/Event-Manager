import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Login from './Components/Login';
import SignUp from './Components/Signup';
import { Container, Grid } from '@mui/material';
import './App.css'; 


import config from './aws-exports';
import { Amplify } from 'aws-amplify';
Amplify.configure(config);

// App.js


function App({ signOut, user }) {
  return (
    <Router >
           <Navbar style={{zIndex:100}}/>
      <div style={{minHeight: '90vh',background: 'linear-gradient(to right, rgba(80, 63, 159,0.18), rgba(255, 81, 181,0.18))',}} >
   
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
            </Routes>
          </Grid>
      
      </div>
    </Router>
  );
}

export default App;
