import React from 'react';
import { FaHome, FaShoppingBag, FaHeadset } from 'react-icons/fa';

const Sidebar = ({ onAddMenusClick, onNavigate, currentPage }) => {
  const menuItems = [
    { id: 'dashboard', icon: FaHome, label: 'Dashboard' },
    { id: 'orders', icon: FaShoppingBag, label: 'Orders' },
    { id: 'customers', icon: FaHeadset, label: 'Customers' },
  ];

  return (
    <div className="w-80 bg-white shadow-lg p-8 flex flex-col justify-between h-screen overflow-y-auto border-r border-slate-200">
      <div>
        <div className="mb-10">
          <div className="flex items-end gap-2 mb-2">
            <h1 className="text-4xl font-black text-slate-900">IDOO SODAP</h1>
            <span className="text-4xl font-black text-emerald-500">.</span>
          </div>
          <p className="text-sm text-slate-500">Modern Admin Dashboard</p>
        </div>

        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-4 rounded-3xl transition hover:scale-105 ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                  type="button"
                >
                  <item.icon className="text-lg" />
                  <span className="text-base font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-10 rounded-[28px] bg-emerald-500 text-white p-6 shadow-xl">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div>
            <p className="text-sm opacity-80">Please organize your menus through button below!</p>
          </div>
          <div className="w-16 h-16 overflow-hidden rounded-full border-4 border-white shadow-lg flex-shrink-0">
            <img
              src="https://i.pinimg.com/736x/61/e3/9e/61e39e00865a39454ba0ef6051d42bb8.jpg"
              alt="Mido Herdiansyah"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <button
          onClick={onAddMenusClick}
          className="w-full rounded-2xl border border-white/30 bg-white/10 px-4 py-3 text-sm font-semibold transition hover:bg-white/20"
        >
          + Add Menus
        </button>
      </div>

      <div className="mt-8 text-sm text-slate-400">
        <p className="font-semibold text-slate-900">IDOO SODAP Restaurant Admin Dashboard</p>
        <p className="mt-1">© 2025 All Right Reserved</p>
      </div>
    </div>
  );
};

export default Sidebar;
