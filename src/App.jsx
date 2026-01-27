import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import LifeMapPage from './components/LifeMapPage';

function App() {
  const [view, setView] = useState('landing'); // 'landing', 'dashboard', 'discovery'

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30">
      {view === 'landing' && <LandingPage onEnter={() => setView('dashboard')} onDiscovery={() => setView('discovery')} />}
      {view === 'dashboard' && <Dashboard onBack={() => setView('landing')} onDiscovery={() => setView('discovery')} />}
      {view === 'discovery' && <LifeMapPage onBack={() => setView('landing')} />}
    </div>
  );
}

export default App;
