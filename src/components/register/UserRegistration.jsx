import React, { useState } from 'react';

const UserRegistration = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    
    const [errors, setErrors] = useState({});

      // Function to handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


  // Function to validate the registration form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

        // Set errors and return true if there are no errors
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    // Function to handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (validateForm()) {
          try {
              const response = await fetch('/users/register', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(formData),
              });
  
              if (response.status === 201) {
                  // Successful registration
                  // Handle redirection or set state here, perhaps show a success message or redirect user to login page
              } else {
                  // Handle error responses
                  const data = await response.json();
                  setErrors(data.errors);
              }
          } catch (error) {
              // This catch block handles network errors, not HTTP errors. So if there's an issue reaching the server or if there's no network connection, it will come here.
              setErrors({ general: 'An error occurred. Please try again later.' });
          }
      }
  };
  


    
  return (
    <div>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        {errors.general && <p className="error">{errors.general}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};


export default UserRegistration;


