import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaBell, FaChartBar, FaCog } from 'react-icons/fa';
import SearchModal from '../components/SearchModal';
import ProfileModal from '../components/ProfileModal';
import NotificationDropdown from '../components/NotificationDropdown';

const Header = ({ onAnalyticsClick, onSettingsClick }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close notification when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    if (isNotificationOpen || isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isNotificationOpen, isSearchOpen]);

  return (
    <>
      <header className="bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between shadow-md relative sticky top-0 z-10">
        <div className="flex-1 max-w-xl" ref={searchInputRef}>
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search for orders, customers, menus..."
              onClick={() => setIsSearchOpen(true)}
              className="w-full rounded-2xl border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-white px-12 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:shadow-lg focus:shadow-emerald-200"
              readOnly
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div ref={notificationRef} className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative rounded-2xl bg-gradient-to-br from-sky-400 to-sky-500 p-3 text-white shadow-md transition hover:shadow-lg hover:scale-105"
              type="button"
            >
              <FaBell />
              <span className="absolute -top-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] text-white font-semibold">
                50
              </span>
            </button>
            {/* Notification Dropdown */}
            {isNotificationOpen && (
              <div className="absolute top-full right-0 mt-2">
                <NotificationDropdown isOpen={isNotificationOpen} />
              </div>
            )}
          </div>

          <button
            onClick={onAnalyticsClick}
            className="rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-500 p-3 text-white shadow-md transition hover:shadow-lg hover:scale-105"
            type="button"
            title="Analytics"
          >
            <FaChartBar />
          </button>
          <button
            onClick={onSettingsClick}
            className="rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 p-3 text-white shadow-md transition hover:shadow-lg hover:scale-105"
            type="button"
            title="Settings"
          >
            <FaCog />
          </button>

          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 px-4 py-2 text-white shadow-md transition hover:shadow-lg hover:scale-105"
            type="button"
          >
            <div className="text-right">
              <p className="text-sm font-semibold">Hello, Mido Herdiansyah</p>
            </div>
            <img
              src="https://i.pinimg.com/736x/61/e3/9e/61e39e00865a39454ba0ef6051d42bb8.jpg"
              alt="Mido Herdiansyah"
              className="h-14 w-14 rounded-full object-cover border-2 border-emerald-400"
            />
          </button>
        </div>
      </header>

      {/* Modals */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
};

export default Header;
