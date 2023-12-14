import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/system';
import { fetchAuthSession } from 'aws-amplify/auth';

const DashboardContainer = styled(Container)({
  textAlign: 'center',
  marginTop: '20px',
});

const DashboardPaper = styled(Paper)({
  padding: '20px',
  marginBottom: '20px',
  borderRadius: '15px',
  background: 'linear-gradient(to bottom, #F5F5F5, #F3ECFF)',
});

const DashboardCard = styled(Paper)({
  padding: '30px',
  marginBottom: '20px',
  minHeight: '150px',
  borderRadius: '11px',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  },
});



const items = [
  { id: 1, name: 'Event 1', date: '2023-01-15' },
  { id: 2, name: 'Event 2', date: '2023-02-20' },
  { id: 3, name: 'Event 3', date: '2023-03-10' },
];

const Dashboard = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    async function checkSession() {
      try {
        const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
        if (accessToken && idToken) {
          setShowDashboard(true);
        }
      } catch (err) {
        console.log(err);
      }
    }

    checkSession();
  }, []);

  if (!showDashboard) {
    return(
        <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh', // Adjust the height based on your design preference
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        Not Authorized
      </Typography>
      <Typography
        variant="body1"
        align="center"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        You do not have permission to access this page.
      </Typography>
      {/* You can add more styling or components as needed */}
    </Container>

    )
  }
  return (
    <DashboardContainer maxWidth="md">
      <DashboardPaper elevation={3}>
      <Typography variant="h3" component="div" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', color: '#333' }}>
       Welcome to Your Dashboard
      </Typography>
        <Typography variant="h6" color="textSecondary" style={{ marginTop: '20px' }}>
          Explore and manage your events effortlessly.
        </Typography>
      </DashboardPaper>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={4}>
          <DashboardCard elevation={3}>
            <Typography variant="h6">Event List</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DashboardCard>
        </Grid>
      </Grid>

      
    </DashboardContainer>
  );
};

export default Dashboard;
