import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const BASE_URL = "http://localhost:3000";

const SignUpLink = styled.div`
  margin-top: 1rem;
  a {
    color: var(--color-green);
    cursor: pointer;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const UserRegistrationStyled = styled.div`
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
const UserRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch(`${BASE_URL}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: formData }), // Nest formData under "user" key
        });

        const data = await response.json();

        if (response.status === 201) {
          // TODO: Handle successful registration (like navigating to login or dashboard)
          navigate("/login"); // for example, redirecting to login after registration
        } else {
          // Display errors from the backend
          setErrors(
            data.errors || { general: "An unexpected error occurred." }
          );
        }
      } catch (error) {
        setErrors({ general: "An error occurred. Please try again later." });
      }
    }
  };

  return (
    <UserRegistrationStyled>
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
      <SignUpLink>
        Already have an account?
        <a onClick={() => navigate("/login")}>Login</a>
      </SignUpLink>
    </UserRegistrationStyled>
  );
};

export default UserRegistration;
