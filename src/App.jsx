import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  const [view, setView] = useState('landing'); // 'landing', 'dashboard'

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-[var(--cpx-bg)] text-[var(--cpx-text-primary)] selection:bg-emerald-500/30">
          {view === 'landing' && <LandingPage onEnter={() => setView('dashboard')} />}
          {view === 'dashboard' && <Dashboard onBack={() => setView('landing')} />}
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
