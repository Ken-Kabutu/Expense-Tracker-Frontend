import React from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../../DarkModeContext'; // Import the hook

function Navbar() {
  const { isDarkMode, toggleDarkMode } = useDarkMode(); // Use the hook

  return (
    <nav className={`navbar navbar-expand-lg ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container">
        <h1 className="navbar-brand">EXPENSE TRACKER</h1>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/landingpage">
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/registration">
                Registration
              </Link>
            </li>
          </ul>
          {/* Dark Mode Toggle Button */}
          <button
            className={`btn ${isDarkMode ? 'btn-light' : 'btn-dark'}`}
            onClick={toggleDarkMode}
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
