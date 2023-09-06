// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/landingpage/NavBar';
import ExpenseEntryForm from './components/dashboard/ExpenseEntryForm';
import ExpenseList from './components/dashboard/ExpenseList';
import UserLogin from './components/register/UserLogin';
import UserRegistration from './components/register/UserRegistration';
import LandingPage from './components/landingpage/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DarkModeProvider } from './DarkModeContext'; // Import the context

function App() {
  return (
    <DarkModeProvider> 
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/landingpage" element={<LandingPage />} />
            <Route path="/expense-entry" element={<ExpenseEntryForm />} />
            <Route path="/expense-list" element={<ExpenseList />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/registration" element={<UserRegistration />} />
          </Routes>
        </div>
      </Router>
    </DarkModeProvider> 
  );
}

export default App;
