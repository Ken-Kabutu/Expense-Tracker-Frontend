import React, { useState } from 'react';

const UserLogin = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();
            if (response.ok) {
                // Save the token and user data, perhaps in a context or state, and redirect to the dashboard or main page.
            } else {
                setErrors(data.errors);
            }
        } catch (error) {
            setErrors({ general: 'An error occurred. Please try again later.' });
        }
    };

    return (
      <div className="container">
      <h2>User Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        {errors.login && <div className="alert alert-danger">{errors.login}</div>}
        {errors.general && <div className="alert alert-danger">{errors.general}</div>}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
    );
};

export default UserLogin;

