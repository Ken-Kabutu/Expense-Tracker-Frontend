import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// Components
import UserLogin from "./Components/register/UserLogin";
import UserRegistration from "./Components/register/UserRegistration";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
//import Navigation from "./Components/Navigation/Navigation";
// Context
import { useGlobalContext } from "./context/globalContext";

function PrivateRoute({ children, isLoggedIn }) {
  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
}

function App() {
  const global = useGlobalContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // For debug purposes, you can remove if not needed
  console.log(global);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />

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
