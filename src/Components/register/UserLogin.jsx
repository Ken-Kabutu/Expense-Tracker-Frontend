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
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
      setErrors({ general: "An error occurred. Please try again later." });
    }
  };

  return (
    <UserLoginStyled>
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
    </UserLoginStyled>
  );
};

export default UserLogin;
