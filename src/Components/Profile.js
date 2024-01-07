import React, { useState, useEffect } from 'react';

const ProfileStyle = {
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: '#f5f5f5',
};

const Profile = () => {
  // State to store the dynamically fetched email
  // const [email, setEmail] = useState('');

  // Use useEffect to fetch data when the component mounts
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('https://api.example.com/user/123');
  //       const data = await response.json();
  //       setEmail(data.email);
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  return (
    <div style={ProfileStyle}>
      <h2>Static Name</h2>
      <p>Email</p>
    </div>
  );
};

export default Profile;
