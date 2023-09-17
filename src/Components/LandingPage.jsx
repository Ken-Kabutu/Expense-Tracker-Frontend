import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LandingPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  text-align: center;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  button {
    padding: 0.75rem 1.5rem;
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
`;

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <LandingPageStyled>
      <h1>Welcome to Our App!</h1>
      <p>Join our platform to manage your expenses and financials.</p>
      <button onClick={() => navigate("/register")}>Get Started</button>
    </LandingPageStyled>
  );
};

export default LandingPage;
