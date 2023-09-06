// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import CSS for the Navbar component


function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/expense-entry">Expense Entry</Link>
        </li>
        <li>
          <Link to="/expense-list">Expense List</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/registration">Registration</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
