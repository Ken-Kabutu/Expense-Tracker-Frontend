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
        <div>
            <h2>User Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={loginData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={loginData.password}
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

