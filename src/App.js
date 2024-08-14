import React from 'react';
import './App.css';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Portfolio from './components/Portfolio';
import LoginForm from './components/LoginForm';
import Testimonials from './components/Testimonials';

const DummyPage = ({ page }) => <div>{page}</div>;

function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
         
          <Route path="/" element={<Navigate to="/dashboard" />} />

        
          <Route path="/login" element={<LoginForm />} />

          
          <Route path="/dashboard" element={<Dashboard />} />

         
          <Route path="/portfolio" element={<Portfolio />} />


          {[
            'brandcommunication', 
            'characters', 
            'clientandtestimonial', 
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

          
          <Route path="/clientandtestimonials" element={<Testimonials />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
