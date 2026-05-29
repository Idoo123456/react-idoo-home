import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import AddMenusModal from '../components/AddMenusModal';

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light';

  const savedTheme = localStorage.getItem('bengkelpro_theme');
  if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const MainLayout = () => {
  const [isQuickServiceOpen, setIsQuickServiceOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('bengkelpro_theme', theme);
  }, [theme]);

  return (
    <div className="h-dvh w-full overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      <div className="flex h-full w-full overflow-hidden">
        <Sidebar onAddMenusClick={() => setIsQuickServiceOpen(true)} />

        <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden bg-[var(--bg)]">
          <Header
            onQuickService={() => setIsQuickServiceOpen(true)}
            theme={theme}
            onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
          />
          <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-4 py-5 sm:px-6 lg:px-8 xl:px-10">
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

