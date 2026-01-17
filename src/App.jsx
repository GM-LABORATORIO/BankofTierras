import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30">
      {!showDashboard ? (
        <LandingPage onEnter={() => setShowDashboard(true)} />
      ) : (
        <Dashboard onBack={() => setShowDashboard(false)} />
      )}
    </div>
  );
}

export default App;
