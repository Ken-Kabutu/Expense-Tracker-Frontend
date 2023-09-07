import React, { useState } from 'react';


const UserLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    
    const [errors, setErrors] = useState({});


      // Function to handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

      // Function to validate the login form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
        newErrors.email = 'Invalid email address';
        }

        if (!formData.password.trim()) {
        newErrors.password = 'Password is required';
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
            const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            });

            if (response.status === 200) {
            // Login successful, redirect to dashboard or another page
            // You can also set a state to indicate successful login
            } else if (response.status === 401) {
            // Handle invalid credentials
            setErrors({ login: 'Invalid email or password' });
            } else {
            // Handle other errors (e.g., server error)
            setErrors({ general: 'An error occurred during login' });
            }
        } catch (error) {
            // Handle network or other errors
            setErrors({ general: 'An error occurred. Please try again later.' });
        }
        }
    };


    return (
        <div>
          <h2>User Login</h2>
          <form onSubmit={handleSubmit}>
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
            {errors.login && <p className="error">{errors.login}</p>}
            {errors.general && <p className="error">{errors.general}</p>}
            <button type="submit">Login</button>
          </form>
        </div>
    );

};

export default UserLogin;