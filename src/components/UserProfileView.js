import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserProfileView() {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get('/api/user-profile') // Replace with your API endpoint
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* Display other user information */}
    </div>
  );
}

export default UserProfileView;