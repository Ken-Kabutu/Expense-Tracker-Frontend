import React, { useState, useMemo } from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// Components
import UserLogin from "./Components/register/UserLogin";
import UserRegistration from "./Components/register/UserRegistration";
import Orb from "./Components/Orb/Orb";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import LandingPage from "./Components/landingpage/LandingPage";

// Context
import { useGlobalContext } from "./context/globalContext";

// Styles and Assets
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layouts";
import Navbar from "./Components/landingpage/NavBar";
function PrivateRoute({ isLoggedIn, children }) {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;

  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

function App() {
  const [active, setActive] = useState(1);
  const global = useGlobalContext();
  // isLoggedIn state to check if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  // For debug purposes, you can remove if not needed
  console.log(global);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => <Orb />, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <UserLogin onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route path="/register" element={<UserRegistration />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/income"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Income />
            </PrivateRoute>
          }
        />
        <Route
          path="/expenses"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Expenses />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
