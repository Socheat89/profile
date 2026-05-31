import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './views/LandingPage';
import AdminPanel from './views/AdminPanel';
import { DataProvider } from './context/dataContext';

function App() {
  const [view, setView] = useState('landing'); // 'landing' or 'admin'

  return (
    <DataProvider>
      <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar currentView={view} setView={setView} />
        <main style={{ flexGrow: 1 }}>
          {view === 'landing' ? <LandingPage /> : <AdminPanel />}
        </main>
      </div>
    </DataProvider>
  );
}

export default App;
