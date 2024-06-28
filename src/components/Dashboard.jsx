import React, { useState } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(prevState => !prevState);
  };

  const handleUserMenuClose = () => {
    setIsUserMenuOpen(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">STORYLOFT</div>
        <ul className="navbar-links">
          <li><Link to="/portfolio">Portfolio</Link></li>
        </ul>
        <div className="navbar-user" onMouseLeave={handleUserMenuClose}>
          <div className="user-avatar" onClick={handleUserMenuToggle}>U</div>
          {isUserMenuOpen && (
            <div className="user-menu">
              <a href="#profile">Profile</a>
              <a href="#account">Account</a>
              <a href="#dashboard">Dashboard</a>
              <a href="#logout">Logout</a>
            </div>
          )}
        </div>
      </nav>
      <div className="content">
        <h1>Welcome to the Dashboard</h1>
        <p>This is a custom navbar example.</p>
      </div>
    </div>
  );
}

export default Dashboard;






