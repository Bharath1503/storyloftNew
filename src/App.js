import React from 'react';
import './App.css';
import { HashRouter, Route, Routes,  } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Portfolio from './components/Portfolio';

function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          {/* <Route path="/login" element={<LoginForm />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
          {/* <Route path="/" element={<Navigate to="/login" />} /> */}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
