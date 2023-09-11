import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/globalContext";

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

const UserLogin = (props) => {
  const navigate = useNavigate();
  const { loginUser } = useGlobalContext();

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
    setErrors({}); // clear errors before a new attempt

    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (response.ok) {
        // TODO: Save the token and user data in context/state.
        // Redirect to the dashboard or main page.
        localStorage.setItem("userToken", data.token);
        loginUser();
        // Notify the parent component about the successful login
        if (props.onLoginSuccess) {
          props.onLoginSuccess();
        }
        // Redirect to the dashboard after successful login
        console.log("Before navigate");
        navigate("/navigation");
        console.log("after navigate");
      } else {
        // Assuming backend returns an error object with specific fields.
        // If not, you might want to adapt this:
        setErrors(data.errors || { general: data.message || "Unknown error." });
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
      <SignUpLink>
        Don't have an account?
        <a onClick={() => navigate("/register")}>Sign Up</a>
      </SignUpLink>
    </UserLoginStyled>
  );
};

export default UserLogin;
