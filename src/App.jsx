import React, { useEffect, useState, useMemo } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import bg from "./img/bg.png";
import { MainLayout, InnerLayout } from "./styles/Layouts";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import { useGlobalContext } from "./context/globalContext";
import Orb from "./Components/Orb/Orb";
import UserLogin from "./Components/register/UserLogin";
import UserRegistration from "./Components/register/UserRegistration";

function PrivateRoute({ children }) {
  const global = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!global.isLoggedIn) {
      navigate("/login");
    }
  }, [global.isLoggedIn, navigate]);

  if (!global.isLoggedIn) {
    return null;
  }

  return children;
}

function App() {
  const [active, setActive] = useState(1);
  const global = useGlobalContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const handleLoginSuccess = () => {
  //   setIsLoggedIn(true);
  // };

  // const displayData = () => {
  //   switch (active) {
  //     case 1:
  //       return <Dashboard />;
  //     case 2:
  //       return <Income />;
  //     case 3:
  //       return <Expenses />;
  //     case 4:
  //       return <UserLogin />;
  //     default:
  //       return <Dashboard />;
  //   }
  // };

  const orbMemo = useMemo(() => <Orb />, []);

  // For debug purposes, you can remove if not needed
  // console.log(global);

  return (
    <AppStyled bg={bg}>
      <MainLayout className="App">
        {orbMemo}
        <Router>
          <Navigation
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            active={active}
            setActive={setActive}
          />

          <InnerLayout>
            <Routes>
              <Route path="/login" element={<UserLogin />} />
              <Route path="/register" element={<UserRegistration />} />

              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/income"
                element={
                  <PrivateRoute>
                    <Income />
                  </PrivateRoute>
                }
              />
              <Route
                path="/expenses"
                element={
                  <PrivateRoute>
                    <Expenses />
                  </PrivateRoute>
                }
              />
            </Routes>
          </InnerLayout>
        </Router>
      </MainLayout>
    </AppStyled>
  );
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

export default App;
///
