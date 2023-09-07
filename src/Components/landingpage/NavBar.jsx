// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function Navbar() {
  return (
    <div>
      <h1>EXPENSE TRACKER</h1>
      <nav>
        <ul>
        <li>
            <Link to="/landingpage">HOME</Link>
          </li>
        
          {/* <li>
            <Link to="/expense-entry">Expense Entry</Link>
          </li>
          <li>
            <Link to="/expense-list">Expense List</Link>
          </li>  */}

          
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/registration">Registration</Link>
          </li>
         
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
