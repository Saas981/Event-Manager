import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper,  IconButton } from '@mui/material';
import { API, graphqlOperation } from 'aws-amplify';
import { Button } from '@mui/joy';
import { listNotifications } from '../graphql/queries';
import { updateNotification } from '../graphql/mutations';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries'

const NotificationsPage = ({ userData,setUserData }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (userData?.id) {
          const response = await API.graphql({
            query: listNotifications,
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
        console.log("SENDER ID",senderId)
      // Fetch the user data of the sender
      const getUserResponse = await API.graphql(graphqlOperation(queries.getUser, { id: senderId }));
      const senderData = getUserResponse.data.getUser;
        console.log("THIS IS YOUR FRIEND ",getUserResponse)
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
  
     console.log('Update sender response:', updateSenderResponse);
  
      // Update the current user's friends attribute
      let currentUserFriends = JSON.parse(userData?.friends);
      currentUserFriends[0][senderId] = { status: "friend" };
            console.log("PAST USER FIRENDS ",JSON.parse(userData?.friends))

      console.log("CURRENT USER FIRENDS ",currentUserFriends)
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
    // Implement the logic to decline the friend request
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
    console.log(`Declined friend request with notificationId: ${notificationId}`);
  };

  return (
    <Container sx={{ marginTop: '2rem' }}>
      <Paper elevation={3} sx={{ borderRadius: '15px', padding: '2rem', backgroundColor: '#eee' }}>
        <Typography variant="h5" sx={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', fontFamily: 'Poppins' }}>
          <NotificationsIcon sx={{ marginRight: '0.5rem' }} /> Notifications
        </Typography>

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
    marginBottom:"1%"
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
