import React, { useState, useEffect } from 'react';

const ProfileStyle = {
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: '#f5f5f5',
  maxWidth: '400px',
  margin: 'auto',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const ProfileHeader = {
  fontSize: '24px',
  marginBottom: '10px',
};

const ProfileSubheader = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '5px',
};

const ProfileContent = {
  fontSize: '16px',
  marginBottom: '15px',
};

const EditButton = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const Profile = () => {
  const [photo, setPhoto] = useState(null); // To store the profile photo (not implemented here)
  const [username, setUsername] = useState('');
  const [name, setName] = useState('John Doe'); // Static name for now
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace this with your actual data fetching logic
        const response = await fetch('https://api.example.com/user/123');
        const data = await response.json();
        
        setPhoto(data.photo); // Assuming the API returns a photo URL
        setUsername(data.email); // Setting username to the email address
        setEmail(data.email);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  const handleEditProfile = () => {
    // Add logic to navigate to the edit profile page or show an edit modal
    console.log('Edit Profile clicked!');
  };

  return (
    <div style={ProfileStyle}>
      <h2 style={ProfileHeader}>User Profile</h2>
      <div style={{ marginBottom: '15px' }}>
        <img
          src={photo || 'https://via.placeholder.com/150'} // Placeholder image if no photo is available
          alt="Profile"
          style={{ width: '150px', borderRadius: '50%', marginBottom: '10px' }}
        />
      </div>
      <div style={ProfileSubheader}>Username:</div>
      <p style={ProfileContent}>{username}</p>
      <div style={ProfileSubheader}>Name:</div>
      <p style={ProfileContent}>{name}</p>
      <div style={ProfileSubheader}>Email:</div>
      <p style={ProfileContent}>{email}</p>
      <button style={EditButton} onClick={handleEditProfile}>
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;
