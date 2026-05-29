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
            : 'text-[var(--text)] hover:bg-[color-mix(in_srgb,var(--primary)_10%,var(--surface))] hover:text-[var(--primary)]'
        }`
      }
    >
      <item.icon className="relative z-10 shrink-0 text-sm" />
      <span className="relative z-10 truncate">{item.label}</span>
    </NavLink>
  );

  return (
    <aside className="hidden h-dvh w-[238px] min-w-[238px] shrink-0 flex-col overflow-hidden bg-[var(--bg)] px-3 py-3 xl:flex">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="mb-3 flex shrink-0 items-center justify-between rounded-[22px] border border-[var(--border)] bg-[var(--surface)] px-4 py-4 shadow-[0_2px_8px_rgba(15,23,42,0.06)]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-lg shadow-black/10">
              <FaWrench />
            </div>
            <div>
              <p className="text-[15px] font-semibold tracking-tight text-[var(--text)]">BengkelPro</p>
              <p className="text-[11px] text-[var(--text-soft)]">Workshop control</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onAddMenusClick}
          className="mb-3 flex w-full shrink-0 items-center justify-center gap-2 rounded-[16px] bg-[var(--primary)] px-4 py-3 text-sm font-medium text-white shadow-[0_10px_24px_rgba(83,83,226,0.24)] transition hover:opacity-95"
        >
          <FaPlus />
          <span>Service Baru</span>
        </button>

        <nav className="min-h-0 flex-1 overflow-y-auto rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-2 shadow-[0_2px_8px_rgba(15,23,42,0.06)]">
          <div className="space-y-1">{mainMenu.map(renderLink)}</div>
        </nav>
      </div>

      <div className="mt-3 shrink-0 rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-2 shadow-[0_2px_8px_rgba(15,23,42,0.06)]">
        <Link
          to="/settings"
          className="flex w-full items-center gap-3 rounded-[16px] px-4 py-3 text-sm text-[var(--text-muted)] transition hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
        >
          <FaCog className="text-sm" />
          Settings
        </Link>
        <button
          type="button"
          onClick={() => alert('Anda menekan tombol keluar.')}
          className="flex w-full items-center gap-3 rounded-[16px] px-4 py-3 text-sm text-[var(--danger)] transition hover:bg-[color-mix(in_srgb,var(--danger)_10%,transparent)]"
        >
          <FaSignOutAlt className="text-sm" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

