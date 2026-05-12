import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './tailwind.css';
import Sidebar from '../layouts/Sidebar';
import Header from '../layouts/Header';
import Dashboard from '../pages/Dashboard';
import Orders from '../pages/Orders';
import Customers from '../pages/Customers';
import Analytics from '../pages/Analytics';
import Settings from '../pages/Settings';
import AddMenusModal from '../components/AddMenusModal';

function App() {
  const [isAddMenusOpen, setIsAddMenusOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onViewAllOrders={() => setCurrentPage('orders')} />;
      case 'orders':
        return <Orders />;
      case 'customers':
        return <Customers />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onViewAllOrders={() => setCurrentPage('orders')} />;
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex overflow-hidden">
      <Sidebar 
        onAddMenusClick={() => setIsAddMenusOpen(true)}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />

      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        <Header onAnalyticsClick={() => setCurrentPage('analytics')} onSettingsClick={() => setCurrentPage('settings')} />
        <main className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-slate-50 via-white to-slate-50">
          {renderPage()}
        </main>
      </div>

      <AddMenusModal isOpen={isAddMenusOpen} onClose={() => setIsAddMenusOpen(false)} />
    </div>
  );
}

const container = document.getElementById('root');
if (!container) {
  throw new Error('Failed to find the root element');
}
const root = createRoot(container);
root.render(<App />);

export default App;
