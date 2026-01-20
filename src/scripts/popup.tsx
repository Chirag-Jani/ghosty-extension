import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import '../index.css';

import History from '../pages/History';
import Home from '../pages/Home';
import Onboarding from '../pages/Onboarding';
import Settings from '../pages/Settings';

const App = () => {
  // Mock authentication/seed check state
  const hasSeed = false; 

  return (
    <HashRouter>
      <div className="w-[360px] h-[600px] bg-background text-foreground overflow-hidden font-sans select-none">
        <Routes>
          <Route path="/" element={hasSeed ? <Navigate to="/home" /> : <Navigate to="/onboarding" />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/home" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
