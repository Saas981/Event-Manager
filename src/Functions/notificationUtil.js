// notificationUtil.js
import { API, graphqlOperation } from 'aws-amplify';
import {createNotification} from '../graphql/mutations';

const notify = async (sender, recepient, type, message, status, other) => {
  const notificationInput = {
    sender,
    recepient,
    type,
    message,
    status,
    other,
  };

  try {
    // Call the createNotification mutation
    const createNotificationResponse = await API.graphql({
      query: createNotification,
      variables: { input: notificationInput },
      authMode: 'AMAZON_COGNITO_USER_POOLS', // Ensure proper authentication
    });

    console.log('Notification created successfully:', createNotificationResponse);

    // Return the created notification data or handle as needed
    return createNotificationResponse.data.createNotification;
  } catch (error) {
    console.error('Error creating notification:', error);
    // Handle the error as needed
    throw error;
  }
};

export { notify };
