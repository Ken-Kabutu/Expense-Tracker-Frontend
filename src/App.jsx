// App.jsx
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Navbar from './components/landingpage/NavBar'; 
// import ExpenseEntryForm from './components/dashboard/ExpenseEntryForm'; 
// import ExpenseList from './components/dashboard/ExpenseList';
import UserLogin from './Components/register/UserLogin';
import UserRegistration from './Components/register/UserRegistration';
// import LandingPage from './components/landingpage/LandingPage';
import React, { useState, useMemo } from "react";
// import LoginForm from "./Components/LoginForm";

import styled from "styled-components";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import { useGlobalContext } from "./context/globalContext";
// import SignUpForm from "./Components/SignUpForm";

// function App() {
//   return (
//     <Router>
//       <div>
//         <Navbar />
//         <Routes>
//         <Route path="/landingpage" element={<LandingPage />} />
//         <Route path="/expense-entry" element={<ExpenseEntryForm />} />
//         <Route path="/expense-list" element={<ExpenseList />} />
//         <Route path="/login" element={<UserLogin />} />
//         <Route path="/registration" element={<UserRegistration />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

function App() {
  const [active, setActive] = useState(1);

  const global = useGlobalContext();
  console.log(global);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <UserLogin />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      case 5:
        return <UserRegistration />;

      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>{displayData()}</main>
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




