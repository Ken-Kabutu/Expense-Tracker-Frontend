import React, { useState } from 'react';
import axios from 'axios';

function UserProfileUpdate() {
  const [user, setUser] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('/api/update-profile', user) // Replace with your API endpoint
      .then((response) => {
        console.log('Profile updated successfully');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={user.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} />
        </div>
        {/* Add more fields as needed */}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default UserProfileUpdate;