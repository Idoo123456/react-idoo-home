import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import AddMenusModal from '../components/AddMenusModal';

const MainLayout = () => {
  const [isQuickServiceOpen, setIsQuickServiceOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  return (
    <div className="h-dvh w-screen overflow-hidden bg-[#f4f6fb] text-[#0f172a]">
      <div className="flex h-full w-full overflow-hidden">
        <Sidebar onAddMenusClick={() => setIsQuickServiceOpen(true)} />

        <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden bg-[#f4f6fb]">
          <Header
            onQuickService={() => setIsQuickServiceOpen(true)}
            theme={theme}
            onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
          />
          <main className="min-h-0 min-w-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8 xl:px-10">
            <Outlet />
          </main>
        </div>
      </div>

      <AddMenusModal
        isOpen={isQuickServiceOpen}
        onClose={() => setIsQuickServiceOpen(false)}
      />
    </div>
  );
};

export default MainLayout;

