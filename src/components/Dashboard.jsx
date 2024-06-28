import React, { useState } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  
  const navigate = useNavigate();

 

  const goToPage = (page) => {
    navigate(`/${page}`);
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="navbar-logo">STORYLOFT ADMIN</div>
      </nav>
      <div className="content">
        <div className="button-grid">
          {['Brand Communication', 'Characters', 'Client and Testimonials', 'Learning and Development', 'News & Updates', 'Performance and Fine Art', 'Portfolio', 'Support'].map((label, index) => (
            <button 
              key={index} 
              className="dashboard-button" 
              onClick={() => goToPage(label.toLowerCase().replace(/ /g, ''))}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;






