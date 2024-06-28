import React from 'react';
import './App.css';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Portfolio from './components/Portfolio';
import LoginForm from './components/LoginForm';

const DummyPage = ({ page }) => <div>{page}</div>;

function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          {/* Default redirect to /dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* Login route */}
          <Route path="/login" element={<LoginForm />} />

          {/* Dashboard and Portfolio routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />

          {/* Dynamic routes */}
          {[
            'brandcommunication', 
            'characters', 
            'clientandtestimonials', 
            'learninganddevelopment', 
            'newsupdates', 
            'performanceandfineart', 
            'support'
          ].map((page, index) => (
            <Route 
              key={index} 
              path={`/${page}`} 
              element={<DummyPage page={page.replace(/([A-Z])/g, ' $1').charAt(0).toUpperCase() + page.slice(1)} />} 
            />
          ))}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

