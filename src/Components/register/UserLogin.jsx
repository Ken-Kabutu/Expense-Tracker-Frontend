import React, { useState } from "react";
import styled from "styled-components";

const UserLoginStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  form {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;

    div {
      margin-bottom: 1rem;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      border-radius: 20px;
      padding: 1rem;
      display: flex;
      flex-direction: column;

      label {
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      input {
        width: 100%;
        padding: 0.5rem;
        border-radius: 10px;
        border: 1px solid #ccc;
        outline: none;

        &:focus {
          border-color: var(--color-green);
        }
      }
    }

    .error {
      color: red;
      font-size: 0.9rem;
      margin-top: 0.5rem;
    }

    button {
      padding: 0.75rem 1rem;
      background-color: var(--color-green);
      color: white;
      border: none;
      border-radius: 20px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: darken(var(--color-green), 10%);
      }
    }
  }
`;

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
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
        const response = await fetch("/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.status === 200) {
          // Login successful, redirect to dashboard or another page
          // You can also set a state to indicate successful login
        } else if (response.status === 401) {
          // Handle invalid credentials
          setErrors({ login: "Invalid email or password" });
        } else {
          // Handle other errors (e.g., server error)
          setErrors({ general: "An error occurred during login" });
        }
      } catch (error) {
        // Handle network or other errors
        setErrors({ general: "An error occurred. Please try again later." });
      }
    }
  };

  return (
    <UserLoginStyled>
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
    </UserLoginStyled>
  );
};

export default UserLogin;
