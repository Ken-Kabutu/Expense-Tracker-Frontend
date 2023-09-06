import React, { useState } from 'react';

const UserLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (validateForm()) {
          try {
              const response = await fetch('/users/login', {
                  method: 'POST',  // This HTTP verb is POST, which is correct for login
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(formData),
              });
  
              const data = await response.json();
              if (data && data.errors) {
                  setErrors(data.errors);
              } else if (data && data.message) {
                  if(response.status === 200) {
                      // Handle successful login logic here
                      // For example: redirection or storing the token
                  } else {
                      setErrors({ general: data.message });
                  }
              } else {
                  setErrors({ general: 'An unknown error occurred. Please try again later.' });
              }
          } catch (error) {
              setErrors({ general: 'An error occurred. Please try again later.' });
          }
      }
  };
  
  
    return (
        <div>
            <h2>User Login</h2>
            <form onSubmit={handleSubmit}>
                {/* Email Input */}
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

                {/* Password Input */}
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

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default UserLogin;


