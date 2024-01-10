import React from 'react';
import { Typography, Tabs, Tab, Grid, Paper, Button } from '@mui/material';

// Custom Component for Setting Header
const SettingHeader = ({ children }) => (
  <Typography variant="h6" style={{ marginBottom: '10px', fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.99)', fontFamily: 'Poppins' }}>
    {children}
  </Typography>
);

// Custom Component for Setting Description
const SettingDescription = ({ children }) => (
  <Typography style={{ marginBottom: '15px', color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'Poppins' }}>
    {children}
  </Typography>
);

// Custom Component for Setting Container
const SettingContainer = ({ children }) => (
  <Paper style={{ padding: '20px', background: '#36393f', marginBottom: '20px' }}>
    {children}
  </Paper>
);

const Settings = ({ theme }) => {
  return (
    <div style={{ padding: '20%', paddingTop: '8%', minHeight: '100vh' }}>
      {/* Title */}
      <Typography variant="h4" style={{ marginBottom: '20px', color: '#fff', fontFamily: 'Poppins' }}>
        User Settings
      </Typography>

      {/* Tabs for Navigation */}
      <Tabs value={0} textColor="success" indicatorColor="primary" style={{ marginBottom: '20px' }}>
        <Tab label="General" />
        <Tab label="Security" />
        <Tab label="Notifications" />
      </Tabs>

      {/* Settings Grid */}
      <Grid container spacing={3}>
        {/* Dummy Input 1 */}
        <Grid item xs={12}>
          <SettingContainer>
            <SettingHeader>General Setting 1</SettingHeader>
            <SettingDescription>Description of the setting goes here.</SettingDescription>
            <Button variant="contained" color="primary">
              Click Me
            </Button>
          </SettingContainer>
        </Grid>

        {/* Dummy Input 2 */}
        <Grid item xs={12}>
          <SettingContainer>
            <SettingHeader>General Setting 2</SettingHeader>
            <SettingDescription>Description of the setting goes here.</SettingDescription>
            <Button variant="contained" color="primary">
              Click Me
            </Button>
          </SettingContainer>
        </Grid>

        {/* Dummy Input 3 */}
        <Grid item xs={12}>
          <SettingContainer>
            <SettingHeader>Security Setting 1</SettingHeader>
            <SettingDescription>Description of the setting goes here.</SettingDescription>
            <Button variant="contained" color="primary">
              Click Me
            </Button>
          </SettingContainer>
        </Grid>

        {/* Add more dummy inputs as needed */}
      </Grid>
    </div>
  );
};

export default Settings;
