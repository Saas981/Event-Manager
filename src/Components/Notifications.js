import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Grid } from '@mui/material';
import { API, graphqlOperation } from 'aws-amplify';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import { Button } from '@mui/joy';
const NotificationsPage = ({ userData, setUserData }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (userData?.id) {
          const response = await API.graphql({
            query: queries.listNotifications,
            variables: {
              filter: { recepient: { eq: userData.id }},
              limit: 100,
            },
            authMode: 'AMAZON_COGNITO_USER_POOLS',
          });

          const sortedNotifications = response.data.listNotifications.items.sort((a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
          );

          setNotifications(sortedNotifications);

          // Update the status of fetched UNREAD notifications to READ
          if (response.data.listNotifications.items.length > 0) {
            const notificationIds = response.data.listNotifications.items.map(
              (notification) => notification.id
            );

            await markNotificationsAsRead(notificationIds);
          }
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        // Handle error appropriately
      }
    };

    const markNotificationsAsRead = async (notificationIds) => {
      for (const notificationId of notificationIds) {
        try {
          await API.graphql({
            query: mutations.updateNotification,
            variables: {
              input: {
                id: notificationId,
                status: 'READ',
              },
            },
            authMode: 'AMAZON_COGNITO_USER_POOLS',
          });
          console.log(`Notification with ID ${notificationId} updated successfully.`);
        } catch (error) {
          console.error(`Error updating notification with ID ${notificationId}:`, error);
          // Handle the error as needed
        }
      }
    };

    fetchNotifications();
  }, [userData, setUserData]);

  const handleAccept = async (senderId, notificationId) => {
    try {
      // Fetch the user data of the sender
      const getUserResponse = await API.graphql(graphqlOperation(queries.getUser, { id: senderId }));
      const senderData = getUserResponse.data.getUser;

      // Update the sender's friends attribute
      let senderFriends = JSON.parse(senderData?.friends);
      senderFriends[0][userData?.id] = { status: "friend" };

      // Perform the update using the updateUser mutation
      const updateSenderResponse = await API.graphql({
        query: mutations.updateUser,
        variables: {
          input: {
            id: senderId,
            friends: JSON.stringify(senderFriends),
            // Include any other fields you want to update
          },
        },
      });

      // Update the current user's friends attribute
      let currentUserFriends = JSON.parse(userData?.friends);
      currentUserFriends[0][senderId] = { status: "friend" };
      setUserData((prevUserData) => ({
        ...prevUserData,
        friends: JSON.stringify(currentUserFriends),
      }));

      // Delete the notification
      const deleteNotificationResponse = await API.graphql({
        query: mutations.deleteNotification,
        variables: {
          input: {
            id: notificationId,
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS', // Specify the authentication mode
      });

      console.log('Delete notification response:', deleteNotificationResponse);

      // Implement the logic to accept the friend request
      console.log(`Updated Friend RESPONSE : ${updateSenderResponse}`);
    } catch (error) {
      console.error('Error accepting friend request:', error);
      // Handle error appropriately
    }
  };

  const handleDecline = async (notificationId) => {
    try {
      // Implement the logic to decline the friend request
      const deleteNotificationResponse = await API.graphql({
        query: mutations.deleteNotification,
        variables: {
          input: {
            id: notificationId,
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
  
      console.log('Delete notification response:', deleteNotificationResponse);
      console.log(`Declined friend request with notificationId: ${notificationId}`);
  
      // Update state to remove the declined notification
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== notificationId)
      );
    } catch (error) {
      console.error('Error declining friend request:', error);
      // Handle error appropriately
    }
  };
  

  const handleClearAll = async () => {
    try {
      // Get the IDs of all notifications
      const notificationIds = notifications.map((notification) => notification.id);

      // Delete all notifications
      await Promise.all(
        notificationIds.map(async (notificationId) => {
          await API.graphql({
            query: mutations.deleteNotification,
            variables: {
              input: {
                id: notificationId,
              },
            },
            authMode: 'AMAZON_COGNITO_USER_POOLS',
          });
        })
      );

      // Clear notifications in the state
      setNotifications([]);
    } catch (error) {
      console.error('Error clearing notifications:', error);
      // Handle error appropriately
    }
  };

  return (
    <Container sx={{ marginTop: '2rem' }}>
      <Paper elevation={3} sx={{ borderRadius: '15px', padding: '2rem', backgroundColor: '#eee' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <Typography variant="h5" sx={{ fontFamily: 'Poppins',marginBottom: '1rem' }}>
              <NotificationsIcon sx={{ marginRight: '0.5rem', }} /> Notifications
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'right' }}>
            {notifications.length > 0 && (
              <Button
                variant="soft"
                color="primary"
                startIcon={<DeleteIcon />}
                onClick={handleClearAll}
                style={{marginBottom:16}}
              >
                Clear All
              </Button>
            )}
          </Grid>
        </Grid>

        {notifications.map((notification) => (
          <Paper
            key={notification.id}
            elevation={2}
            sx={{ padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}
          >
            <Typography
              sx={{
                fontFamily: 'Poppins',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1%',
              }}
            >
              {notification.type === 'FRIEND_REQUEST' ? (
                <PersonAddRoundedIcon sx={{ fontSize: '24px', marginRight: '1%' }} />
              ) : (
                <PrivacyTipIcon sx={{ fontSize: '24px', marginRight: '1%' }} />
              )}
              {notification.message}
            </Typography>

            {notification.type === 'FRIEND_REQUEST' && (
              <div sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '5%' }}>
                <Button
                 variant="soft"
                  color="success"
                  startIcon={<CheckIcon />}
                  onClick={() => handleAccept(notification.sender,notification.id)}
                >
                  Accept
                </Button>
                <Button
                  variant="soft"
                  color="danger"
                  startIcon={<ClearIcon />}
                  onClick={() => handleDecline(notification.id)}
                  sx={{ marginLeft: '1rem' }}
                >
                  Decline
                </Button>
              </div>
            )}
          </Paper>
        ))}

        {notifications.length === 0 && (
          <Typography sx={{ color: 'gray' }}>No notifications available.</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default NotificationsPage;
