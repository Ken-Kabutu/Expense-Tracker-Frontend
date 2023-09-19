import React, {
  useEffect,
  useState,
  useContext,
  useMemo,
  Component,
} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import bg from "./img/bg.png";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import Orb from "./Components/Orb/Orb";
import UserLogin from "./Components/register/UserLogin";
import UserRegistration from "./Components/register/UserRegistration";
import { UserContext } from "./context/UserContext";
import { MainLayout, InnerLayout } from "./styles/Layouts";

function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return <Component {...rest} />;
}

function App() {
  const [active, setActive] = useState(1);
  const { user, setUser } = useContext(UserContext);
  const orbMemo = useMemo(() => <Orb />, []);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  // if (!user) return <UserLogin onLogin={setUser} />;

  return (
    <Router>
      <AppStyled bg={bg}>
        <MainLayout className="App">
          {orbMemo}
          {user && (
            <Navigation
              user={user}
              setUser={setUser}
              active={active}
              setActive={setActive}
            />
          )}
          <InnerLayout>
            <Routes>
              <Route
                path="/login"
                element={
                  !user ? <UserLogin onLogin={setUser} /> : <Dashboard />
                }
              />
              <Route
                path="/register"
                element={!user ? <UserRegistration /> : <Dashboard />}
              />
              <Route
                path="/"
                element={
                  user ? (
                    <PrivateRoute component={Dashboard} />
                  ) : (
                    <UserLogin onLogin={setUser} />
                  )
                }
              />
              <Route
                path="/income"
                element={
                  user ? (
                    <PrivateRoute component={Income} />
                  ) : (
                    <UserLogin onLogin={setUser} />
                  )
                }
              />
              <Route
                path="/expenses"
                element={
                  user ? (
                    <PrivateRoute component={Expenses} />
                  ) : (
                    <UserLogin onLogin={setUser} />
                  )
                }
              />
            </Routes>
          </InnerLayout>
        </MainLayout>
      </AppStyled>
    </Router>
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
