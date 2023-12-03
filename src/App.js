// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Login from './Components/Login';
import SignUp from './Components/Signup';
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import config from './aws-exports';
import { Amplify } from 'aws-amplify';
Amplify.configure(config);

function App({ signOut, user }) {

  return (
    <Router>
      <div>
        <Navbar /> {/* Use the Navbar component here */}
        <hr />

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
