import React, { useState, useMemo } from "react";
import styled from "styled-components";

// Components
import UserLogin from "./Components/register/UserLogin";
import UserRegistration from "./Components/register/UserRegistration";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import LandingPage from "./Components/landingpage/LandingPage";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Context
import { useGlobalContext } from "./context/globalContext";

// Styles and Assets
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layouts";
import Navbar from "./Components/landingpage/NavBar";

function App() {
  const [active, setActive] = useState(1);
  const global = useGlobalContext();
  // isLoggedIn state to check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  // For debug purpose, you can remove if not needed
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
    <AppStyled className="App">
      {/* {orbMemo} */}
      {!isLoggedIn ? (
        <>
          <UserLogin onLoginSuccess={handleLoginSuccess} />
          <UserRegistration />
        </>
      ) : (
        <MainLayout>
          <Navigation active={active} setActive={setActive} />
          <main>{displayData()}</main>
        </MainLayout>
      )}
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
