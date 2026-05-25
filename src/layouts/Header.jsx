import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  FaAngleDown,
  FaBell,
  FaCalendarAlt,
  FaCarSide,
  FaChartPie,
  FaCog,
  FaRegFileAlt,
  FaRegListAlt,
  FaRegDotCircle,
  FaHeadset,
  FaHome,
  FaMoon,
  FaSearch,
  FaSignOutAlt,
  FaSun,
  FaTools,
} from 'react-icons/fa';

const mobileMenu = [
  { path: '/dashboard', icon: FaHome, label: 'Dashboard' },
  { path: '/service', icon: FaRegListAlt, label: 'Service' },
  { path: '/mekanik', icon: FaTools, label: 'Mekanik' },
  { path: '/booking', icon: FaRegDotCircle, label: 'Booking' },
  { path: '/kendaraan', icon: FaCarSide, label: 'Kendaraan' },
  { path: '/customers', icon: FaHeadset, label: 'Pelanggan' },
  { path: '/sparepart', icon: FaRegFileAlt, label: 'Sparepart' },
  { path: '/invoice', icon: FaRegFileAlt, label: 'Invoice' },
  { path: '/analytics', icon: FaChartPie, label: 'Laporan' },
  { path: '/settings', icon: FaCog, label: 'Settings' },
];

const searchData = [
  { title: 'Dashboard Bengkel', subtitle: 'Ringkasan service dan performa bengkel', category: 'Halaman', path: '/dashboard' },
  { title: 'Service Tune Up Mesin', subtitle: 'SRV-2401 - Rafi Hidayat - B 1209 TQ', category: 'Service', path: '/service' },
  { title: 'Service Ganti Oli', subtitle: 'SRV-2402 - Citra Lestari - D 7781 FI', category: 'Service', path: '/service' },
  { title: 'Service Kelistrikan', subtitle: 'SRV-2404 - Maya Putri - F 9812 CA', category: 'Service', path: '/service' },
  { title: 'Toyota Avanza', subtitle: 'B 1209 TQ - Pemilik Rafi Hidayat', category: 'Kendaraan', path: '/kendaraan' },
  { title: 'Honda Beat', subtitle: 'D 7781 FI - Pemilik Citra Lestari', category: 'Kendaraan', path: '/kendaraan' },
  { title: 'Yamaha NMAX', subtitle: 'AD 4201 NN - Pemilik Yoga Pratama', category: 'Kendaraan', path: '/kendaraan' },
  { title: 'Rafi Hidayat', subtitle: 'Customer Gold - 2 kendaraan', category: 'Customer', path: '/customers' },
  { title: 'Citra Lestari', subtitle: 'Customer Silver - 1 kendaraan', category: 'Customer', path: '/customers' },
  { title: 'Maya Putri', subtitle: 'Customer Gold - 3 kendaraan', category: 'Customer', path: '/customers' },
  { title: 'Laporan Service Mingguan', subtitle: 'Grafik service, omzet, rating, dan growth', category: 'Laporan', path: '/analytics' },
  { title: 'Pengaturan Bengkel', subtitle: 'Profil admin, notifikasi, invoice, backup', category: 'Pengaturan', path: '/settings' },
];

const defaultProfile = {
  name: 'Admin Bengkel',
  email: 'admin@bengkelpro.test',
  branch: 'Cabang Jakarta',
};

const getSavedProfile = () => {
  try {
    const savedProfile = localStorage.getItem('bengkelpro_admin_profile');
    return savedProfile ? { ...defaultProfile, ...JSON.parse(savedProfile) } : defaultProfile;
  } catch {
    return defaultProfile;
  }
};

const getInitials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'AB';

const Header = ({ onQuickService, theme, onToggleTheme }) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [showNotif, setShowNotif] = useState(false);
  const [profile, setProfile] = useState(getSavedProfile);

  useEffect(() => {
    const handleProfileUpdated = (event) => {
      setProfile(event.detail || getSavedProfile());
    };

    const handleStorage = (event) => {
      if (event.key === 'bengkelpro_admin_profile') {
        setProfile(getSavedProfile());
      }
    };

    window.addEventListener('bengkelpro-profile-updated', handleProfileUpdated);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('bengkelpro-profile-updated', handleProfileUpdated);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const normalizedKeyword = keyword.trim().toLowerCase();
  const searchResults = normalizedKeyword
    ? searchData.filter((item) =>
        [item.title, item.subtitle, item.category]
          .join(' ')
          .toLowerCase()
          .includes(normalizedKeyword)
      )
    : [];

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchResults.length > 0) {
      navigate(searchResults[0].path);
    }
  };

  const handleOpenResult = (item) => {
    navigate(item.path);
    setKeyword('');
    alert(`Membuka ${item.category}: ${item.title}`);
  };

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_86%,transparent)] px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8 xl:px-10">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--primary)]">
            Workshop Management
          </p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight text-[var(--text)] sm:text-[30px]">
            Dashboard Bengkel Motor & Mobil
          </h1>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <form onSubmit={handleSearchSubmit} className="relative min-w-0 sm:flex-1 xl:w-80 xl:flex-none">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" />
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Cari service, plat, customer..."
              className="input-shell h-12 w-full rounded-2xl pl-11 pr-4 text-sm font-medium outline-none transition focus:border-[var(--primary)]"
            />

            {keyword && (
              <div className="absolute left-0 right-0 top-14 z-30 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl">
                <div className="border-b border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm font-semibold text-[var(--text)]">
                  {searchResults.length > 0
                    ? `${searchResults.length} hasil ditemukan`
                    : `Tidak ada hasil untuk "${keyword}"`}
                </div>

                <div className="max-h-80 overflow-y-auto p-2">
                  {searchResults.length > 0 ? (
                    searchResults.map((item) => (
                      <button
                        key={`${item.category}-${item.title}`}
                        type="button"
                        onClick={() => handleOpenResult(item)}
                        className="flex w-full items-start justify-between gap-3 rounded-2xl px-3 py-3 text-left transition hover:bg-[var(--surface-2)]"
                      >
                        <span>
                          <span className="block text-sm font-semibold text-[var(--text)]">{item.title}</span>
                          <span className="mt-1 block text-xs text-[var(--text-muted)]">{item.subtitle}</span>
                        </span>
                        <span className="shrink-0 rounded-full bg-[var(--surface-2)] px-3 py-1 text-[11px] font-semibold text-[var(--primary)]">
                          {item.category}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center text-sm text-[var(--text-muted)]">
                      Coba cari nama customer, nomor plat, service, atau laporan.
                    </div>
                  )}
                </div>
              </div>
            )}
          </form>

          <button
            type="button"
            onClick={onQuickService}
            className="btn-primary inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-semibold transition hover:opacity-95 sm:flex-none"
          >
            <FaCalendarAlt />
            Booking
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] transition hover:border-[var(--primary)]"
            aria-label="Toggle dark mode"
            title={theme === 'dark' ? 'Mode terang' : 'Mode gelap'}
          >
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotif((prev) => !prev)}
              className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] transition hover:border-[var(--primary)]"
            >
              <FaBell />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--danger)] text-[10px] font-semibold text-white">
                3
              </span>
            </button>
            {showNotif && (
              <div className="absolute right-0 mt-3 w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-xl">
                {['Avanza B 1290 TQ selesai spooring', 'Beat AD 7781 FE menunggu sparepart', 'Customer Rafi konfirmasi booking'].map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => alert(item)}
                    className="block w-full rounded-2xl px-3 py-2 text-left text-sm text-[var(--text-muted)] hover:bg-[var(--surface-2)]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/settings"
            className="flex h-12 items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] transition hover:border-[var(--primary)]"
            title={`${profile.name} - ${profile.branch}`}
          >
            <span className="hidden max-w-32 truncate sm:block">{profile.name}</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-[var(--primary)] text-xs font-semibold text-white">
              {getInitials(profile.name)}
            </span>
            <FaAngleDown className="text-[var(--text-soft)]" />
          </Link>
        </div>
      </div>

      <nav className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 xl:hidden">
        {mobileMenu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex min-w-[82px] flex-none flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] ${
                isActive ? 'chip-active' : 'chip'
              }`
            }
          >
            <item.icon />
            {item.label}
          </NavLink>
        ))}
        <button
          type="button"
          onClick={() => alert('Anda menekan tombol keluar.')}
          className="chip flex min-w-[82px] flex-none flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] text-[var(--danger)]"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </nav>

      {keyword && (
        <div className="mt-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2 text-sm text-[var(--text-muted)]">
          Pencarian aktif: {keyword}. Tekan Enter untuk membuka hasil pertama.
        </div>
      )}
    </header>
  );
};

export default Header;

