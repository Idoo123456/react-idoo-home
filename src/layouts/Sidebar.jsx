import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  FaCarSide,
  FaChartPie,
  FaCog,
  FaHeadset,
  FaHome,
  FaRegFileAlt,
  FaRegListAlt,
  FaPlus,
  FaSignOutAlt,
  FaRegDotCircle,
  FaTools,
  FaWrench,
} from 'react-icons/fa';

const mainMenu = [
  { path: '/dashboard', icon: FaHome, label: 'Dashboard' },
  { path: '/service', icon: FaRegListAlt, label: 'Antrian Service' },
  { path: '/mekanik', icon: FaTools, label: 'Mekanik' },
  { path: '/booking', icon: FaRegDotCircle, label: 'Booking' },
  { path: '/kendaraan', icon: FaCarSide, label: 'Kendaraan' },
  { path: '/customers', icon: FaHeadset, label: 'Pelanggan' },
  { path: '/sparepart', icon: FaRegFileAlt, label: 'Sparepart' },
  { path: '/invoice', icon: FaRegFileAlt, label: 'Invoice' },
  { path: '/analytics', icon: FaChartPie, label: 'Laporan' },
];

const Sidebar = ({ onAddMenusClick }) => {

  const renderLink = (item) => (
    <NavLink
      key={`${item.path}-${item.label}`}
      to={item.path}
      end={item.path === '/dashboard'}
      className={({ isActive }) =>
        `group flex min-h-10 items-center gap-3 rounded-[14px] px-4 py-2.5 text-sm font-medium transition ${
          isActive
            ? 'bg-[#5353e2] text-white shadow-lg shadow-[0_8px_20px_rgba(83,83,226,0.24)]'
            : 'text-[#0f172a] hover:bg-[#eef0ff] hover:text-[#5353e2]'
        }`
      }
    >
      <item.icon className="relative z-10 shrink-0 text-sm" />
      <span className="relative z-10 truncate">{item.label}</span>
    </NavLink>
  );

  return (
    <aside className="hidden h-dvh w-[238px] shrink-0 flex-col justify-between overflow-hidden bg-[#f4f6fb] px-3 py-3 lg:flex">
      <div className="min-h-0">
        <div className="mb-3 flex items-center justify-between rounded-[22px] bg-white px-4 py-4 shadow-[0_2px_8px_rgba(15,23,42,0.06)]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5353e2] text-white shadow-lg shadow-black/10">
              <FaWrench />
            </div>
            <div>
              <p className="text-[15px] font-semibold tracking-tight text-[#0f172a]">BengkelPro</p>
              <p className="text-[11px] text-[#8f9ab0]">Workshop control</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onAddMenusClick}
          className="mb-3 flex w-full items-center justify-center gap-2 rounded-[16px] bg-[#5353e2] px-4 py-3 text-sm font-medium text-white shadow-[0_10px_24px_rgba(83,83,226,0.24)] transition hover:bg-[#3d3dc7]"
        >
          <FaPlus />
          <span>Service Baru</span>
        </button>

        <nav className="overflow-hidden rounded-[22px] bg-white p-2 shadow-[0_2px_8px_rgba(15,23,42,0.06)]">
          <div className="space-y-1">{mainMenu.map(renderLink)}</div>
        </nav>
      </div>

      <div className="rounded-[22px] bg-white p-2 shadow-[0_2px_8px_rgba(15,23,42,0.06)]">
        <Link
          to="/settings"
          className="flex w-full items-center gap-3 rounded-[16px] px-4 py-3 text-sm text-[#5b6478] transition hover:bg-[#f4f6fb] hover:text-[#0f172a]"
        >
          <FaCog className="text-sm" />
          Settings
        </Link>
        <button
          type="button"
          onClick={() => alert('Anda menekan tombol keluar.')}
          className="flex w-full items-center gap-3 rounded-[16px] px-4 py-3 text-sm text-[#ef4444] transition hover:bg-[#fff5f5]"
        >
          <FaSignOutAlt className="text-sm" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

