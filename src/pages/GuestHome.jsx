import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaArrowRight,
  FaBars,
  FaBolt,
  FaCalendarAlt,
  FaCarSide,
  FaCheck,
  FaClock,
  FaCog,
  FaFilter,
  FaMapMarkerAlt,
  FaMotorcycle,
  FaOilCan,
  FaPhoneAlt,
  FaSearch,
  FaShieldAlt,
  FaStar,
  FaTimes,
  FaTools,
  FaUserShield,
  FaWrench,
  FaSun,
  FaMoon,
  FaSignOutAlt,
  FaHistory,
  FaGift,
  FaEnvelope,
  FaHeart,
  FaEdit,
  FaIdCard,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import ProfessionalAlert from '../components/ProfessionalAlert';
import LogoutConfirmModal from '../components/LogoutConfirmModal';
import { getMemberAccountProfile } from '../utils/profile';

const services = [
  { name: 'Tune Up Lengkap', category: 'Mobil', price: 350000, duration: '90 menit', icon: FaCarSide, description: 'Pemeriksaan mesin, busi, filter, dan performa kendaraan secara menyeluruh.' },
  { name: 'Service Motor Matic', category: 'Motor', price: 120000, duration: '60 menit', icon: FaMotorcycle, description: 'Perawatan CVT, injeksi, oli, dan pengecekan sistem motor matic.' },
  { name: 'Ganti Oli Premium', category: 'Perawatan', price: 95000, duration: '30 menit', icon: FaOilCan, description: 'Penggantian oli berkualitas dan pemeriksaan kondisi mesin dasar.' },
  { name: 'Service Kelistrikan', category: 'Elektrikal', price: 150000, duration: '75 menit', icon: FaBolt, description: 'Diagnosa aki, lampu, starter, alternator, dan sistem kelistrikan.' },
  { name: 'Perawatan Kaki-kaki', category: 'Mobil', price: 275000, duration: '120 menit', icon: FaCog, description: 'Pemeriksaan suspensi, spooring, balancing, rem, dan kemudi.' },
  { name: 'Inspeksi Kendaraan', category: 'Perawatan', price: 75000, duration: '45 menit', icon: FaShieldAlt, description: 'Pemeriksaan 25 titik untuk memastikan kendaraan tetap aman digunakan.' },
];

const products = [
  { name: 'Oli Mesin 10W-40', category: 'Pelumas', price: 85000, stock: 42, accent: 'from-indigo-500 to-violet-600' },
  { name: 'Kampas Rem Premium', category: 'Pengereman', price: 120000, stock: 8, accent: 'from-violet-500 to-fuchsia-600' },
  { name: 'Busi Iridium', category: 'Mesin', price: 95000, stock: 16, accent: 'from-blue-500 to-indigo-600' },
  { name: 'Filter Udara OEM', category: 'Filter', price: 75000, stock: 6, accent: 'from-purple-500 to-indigo-700' },
];

const testimonials = [
  { name: 'Rafi Hidayat', vehicle: 'Toyota Avanza', text: 'Booking mudah, estimasi jelas, dan kendaraan selesai tepat waktu. Bengkel paling profesional!', rating: 5, initial: 'RH' },
  { name: 'Citra Lestari', vehicle: 'Honda Beat', text: 'Pelayanannya ramah dan saya selalu mendapat update proses servis secara real-time.', rating: 5, initial: 'CL' },
  { name: 'Maya Putri', vehicle: 'Daihatsu Sigra', text: 'Bengkel modern dengan mekanik yang komunikatif dan hasil kerja yang sangat memuaskan.', rating: 5, initial: 'MP' },
];

const formatPrice = (price) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);

const defaultMemberData = {
  name: 'Budi Santoso',
  email: 'budi.santoso@email.com',
  phone: '0812-3456-7890',
  address: 'Jl. Melati Raya No. 18, Jakarta Selatan',
  city: 'Jakarta',
  tier: 'Gold',
  points: 2450,
  nextTierPoints: 5000,
  vehicles: [
    { plate: 'B 1209 TQ', name: 'Toyota Avanza', lastService: '12 Mei 2024' },
    { plate: 'D 7781 FI', name: 'Honda Beat', lastService: '05 Jun 2024' }
  ]
};

const getSavedMemberProfile = () => {
  if (typeof window === 'undefined') return defaultMemberData;

  try {
    const accountProfile = getMemberAccountProfile();
    const savedProfile = localStorage.getItem('bengkelpro_member_profile');
    return savedProfile
      ? { ...defaultMemberData, ...JSON.parse(savedProfile), ...accountProfile }
      : { ...defaultMemberData, ...accountProfile };
  } catch {
    return defaultMemberData;
  }
};

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light';
  const savedTheme = localStorage.getItem('bengkelpro_theme');
  if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] } }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const GuestHome = () => {
  const navigate = useNavigate();
  
  // Deteksi apakah yang login adalah member
  const isMember = typeof window !== 'undefined' && localStorage.getItem('bengkelpro_user_mode') === 'member';

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Semua');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [theme, setTheme] = useState(getInitialTheme);
  const [memberMenuOpen, setMemberMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [memberData, setMemberData] = useState(getSavedMemberProfile);
  const [profileForm, setProfileForm] = useState(getSavedMemberProfile);

  // Alert State for member features
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false, title: '', message: '', type: 'info',
  });

  const showAlert = (title, message, type) => {
    setAlertConfig({ isOpen: true, title, message, type });
  };

  const openLogoutConfirm = () => {
    setMemberMenuOpen(false);
    setMobileMenuOpen(false);
    setLogoutConfirmOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('bengkelpro_user');
    localStorage.removeItem('bengkelpro_user_mode');
    setLogoutConfirmOpen(false);
    navigate('/login');
  };

  const openProfileSettings = () => {
    setProfileForm(memberData);
    setMemberMenuOpen(false);
    setMobileMenuOpen(false);
    setProfileModalOpen(true);
  };

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = (event) => {
    event.preventDefault();
    const updatedProfile = {
      ...memberData,
      ...profileForm,
      vehicles: memberData.vehicles,
      points: memberData.points,
      tier: memberData.tier,
      nextTierPoints: memberData.nextTierPoints,
    };

    setMemberData(updatedProfile);
    localStorage.setItem('bengkelpro_member_profile', JSON.stringify(updatedProfile));
    setProfileModalOpen(false);
    showAlert('Profil Diperbarui', 'Perubahan profil member berhasil disimpan.', 'success');
  };

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('bengkelpro_theme', theme);
  }, [theme]);

  const filteredServices = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return services.filter((service) => {
      const matchesCategory = category === 'Semua' || service.category === category;
      const matchesQuery = !normalizedQuery || service.name.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const openBooking = (serviceName = '') => {
    setSelectedService(serviceName);
    setBookingSuccess(false);
    setBookingOpen(true);
  };

  const handleBooking = (event) => {
    event.preventDefault();
    setBookingSuccess(true);
    if (isMember) {
      showAlert('Booking Berhasil', 'Jadwal service Anda telah ditambahkan. Kami akan menghubungi Anda segera.', 'success');
    }
  };

  const progressPercentage = isMember ? (memberData.points / memberData.nextTierPoints) * 100 : 0;

  return (
    <div className="h-dvh overflow-y-auto bg-[#f7f7ff] text-slate-900 transition-colors dark:bg-[#0b0f1a] dark:text-slate-100">
      
      <ProfessionalAlert 
        isOpen={alertConfig.isOpen} 
        onClose={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))} 
        title={alertConfig.title} 
        message={alertConfig.message} 
        type={alertConfig.type} 
      />

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-indigo-100/50 bg-white/80 backdrop-blur-2xl transition-colors dark:border-slate-800/50 dark:bg-slate-900/80">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#home" className="flex items-center gap-3 group">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 transition-transform group-hover:scale-105">
              <FaWrench className="text-sm" />
            </span>
            <span>
              <span className="block text-base font-extrabold tracking-tight dark:text-white">BengkelPro</span>
              <span className="block text-[9px] font-bold uppercase tracking-[0.22em] text-indigo-600/80 dark:text-indigo-400/80">
                {isMember ? 'Member Area' : 'Auto Care Center'}
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-[13px] font-semibold text-slate-500 dark:text-slate-400 lg:flex">
            {[
              ['Beranda', '#home'],
              ...(isMember ? [['Kendaraan', '#vehicles']] : []),
              ['Layanan', '#services'],
              ...(isMember ? [['Loyalti', '#loyalty']] : [['Produk', '#products'], ['Ulasan', '#reviews']]),
            ].map(([label, href]) => (
              <a key={href} href={href} className="relative py-1 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <button
              type="button"
              onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-500 transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-indigo-500/50 dark:hover:text-indigo-400"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
            </button>

            {isMember ? (
              <>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setMemberMenuOpen((prev) => !prev)}
                    className="flex items-center gap-3 rounded-2xl px-2 py-1 text-sm transition-all hover:bg-indigo-50 dark:hover:bg-slate-800"
                  >
                    <div className="text-right">
                      <p className="text-[13px] font-bold text-slate-800 dark:text-slate-100">{memberData.name}</p>
                      <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">{memberData.points} Poin</p>
                    </div>
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-bold flex items-center justify-center text-xs shadow-lg shadow-indigo-500/20">
                      {memberData.name.charAt(0)}
                    </div>
                    <FaCog className="text-xs text-slate-400" />
                  </button>

                  <AnimatePresence>
                    {memberMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
                      >
                        <div className="border-b border-slate-100 p-4 dark:border-slate-800">
                          <p className="text-sm font-extrabold text-slate-900 dark:text-white">{memberData.name}</p>
                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{memberData.email}</p>
                        </div>
                        <button
                          type="button"
                          onClick={openProfileSettings}
                          className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-bold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700 dark:text-slate-200 dark:hover:bg-indigo-900/20 dark:hover:text-indigo-300"
                        >
                          <FaEdit className="text-indigo-500" /> Setting Profil
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <button
                  onClick={openLogoutConfirm}
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-red-400 transition-all hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                  title="Logout"
                >
                  <FaSignOutAlt className="text-sm" />
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="inline-flex h-10 items-center gap-2 rounded-xl px-4 text-[13px] font-semibold text-slate-600 border border-slate-200/80 transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 dark:text-slate-300 dark:border-slate-700 dark:hover:border-indigo-500/50 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
              >
                <FaUserShield className="text-xs" /> Login
              </button>
            )}
            
            {!isMember && (
              <button
                type="button"
                onClick={() => openBooking()}
                className="inline-flex h-10 items-center gap-2 rounded-xl px-5 text-[13px] font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30"
                style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}
              >
                Booking <FaArrowRight className="text-xs" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((current) => !current)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 sm:hidden"
            aria-label="Buka menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="border-t border-slate-100 bg-white px-5 dark:border-slate-800 dark:bg-slate-900 sm:hidden overflow-hidden"
            >
              <div className="grid gap-1.5 py-4 text-sm font-semibold text-slate-700 dark:text-slate-200">
                
                {isMember && (
                  <div className="mb-2 px-4 py-3 bg-indigo-50 rounded-xl dark:bg-indigo-900/20">
                    <p className="font-bold text-slate-800 dark:text-slate-100">{memberData.name}</p>
                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{memberData.points} Poin Loyalti</p>
                    <button
                      type="button"
                      onClick={openProfileSettings}
                      className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-indigo-700 shadow-sm dark:bg-slate-800 dark:text-indigo-300"
                    >
                      <FaEdit /> Setting Profil
                    </button>
                  </div>
                )}

                <div className="flex justify-between items-center mb-2 px-4 py-2">
                  <span className="text-slate-500 dark:text-slate-400 text-sm">Tema Gelap</span>
                  <button onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))} className="text-indigo-600 dark:text-indigo-400">
                    {theme === 'dark' ? <FaSun /> : <FaMoon />}
                  </button>
                </div>

                {(isMember ? [
                  ['Beranda', '#home'],
                  ['Kendaraan Anda', '#vehicles'],
                  ['Layanan', '#services'],
                  ['Loyalti', '#loyalty'],
                ] : [
                  ['Beranda', '#home'],
                  ['Layanan', '#services'],
                  ['Produk', '#products'],
                  ['Ulasan', '#reviews'],
                ]).map(([label, href]) => (
                  <a key={href} href={href} onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-4 py-3 hover:bg-indigo-50 dark:hover:bg-indigo-900/30">
                    {label}
                  </a>
                ))}
                
                {isMember ? (
                  <button type="button" onClick={openLogoutConfirm} className="rounded-xl px-4 py-3 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2">
                    <FaSignOutAlt /> Keluar
                  </button>
                ) : (
                  <button type="button" onClick={() => navigate('/login')} className="rounded-xl px-4 py-3 text-left text-indigo-700 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/30">
                    Login
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="home" className="relative overflow-hidden transition-colors"
          style={{
            background: theme === 'dark'
              ? 'linear-gradient(135deg, #0b0f1a 0%, #1e1659 40%, #2d1b6e 60%, #1a103d 100%)'
              : 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 35%, #c7d2fe 60%, #ddd6fe 100%)',
          }}
        >
          {/* Decorative blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -right-36 -top-36 h-[500px] w-[500px] rounded-full bg-violet-500/15 blur-[100px] dark:bg-violet-500/10 animate-float" />
            <div className="absolute -bottom-44 left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-400/10 blur-[100px] dark:bg-indigo-500/8 animate-float" style={{ animationDelay: '2s' }} />
            <div className="absolute left-2/3 top-1/4 h-72 w-72 rounded-full bg-fuchsia-400/8 blur-[80px] dark:bg-fuchsia-500/5 animate-float" style={{ animationDelay: '4s' }} />
          </div>
          
          <div className={`relative mx-auto ${isMember ? 'grid min-h-[640px] max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.95fr_1.05fr]' : 'grid min-h-[580px] max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]'}`}>
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-slate-900 dark:text-white"
            >
              {isMember ? (
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200/60 bg-white/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-700 shadow-sm backdrop-blur dark:border-amber-400/20 dark:bg-white/5 dark:text-amber-300">
                  <FaStar className="text-amber-400" /> Member {memberData.tier}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-white/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-indigo-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-violet-200"
                >
                  <FaStar className="text-amber-400 dark:text-amber-300" /> Bengkel terpercaya untuk kendaraan Anda
                </motion.div>
              )}

              <h1 className={`${isMember ? 'max-w-3xl text-4xl leading-[1.1] sm:text-5xl lg:text-6xl' : 'max-w-3xl text-4xl leading-[1.06] sm:text-5xl lg:text-6xl xl:text-[3.75rem]'} font-extrabold tracking-tight`}>
                {isMember ? (
                  `Selamat Datang, ${memberData.name.split(' ')[0]}!`
                ) : (
                  <>
                    Rawat kendaraan dengan cara yang lebih
                    <span className="block bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent dark:from-violet-300 dark:via-fuchsia-300 dark:to-pink-300">modern.</span>
                  </>
                )}
              </h1>
              
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300/90">
                {isMember ? 
                  "Jadwalkan servis kendaraan Anda secara instan, lacak riwayat perbaikan, dan nikmati keuntungan eksklusif khusus member BengkelPro." : 
                  "Temukan layanan, cek harga, pilih jadwal, dan pantau kebutuhan kendaraan dalam satu pengalaman bengkel yang praktis."
                }
              </p>
              
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => openBooking()}
                  className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl px-7 font-bold text-white shadow-xl shadow-indigo-600/20 transition-all hover:-translate-y-0.5 hover:shadow-2xl dark:shadow-indigo-500/15"
                  style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}
                >
                  <FaCalendarAlt /> Booking Sekarang
                </button>
                {isMember ? (
                  <button
                    onClick={() => showAlert('Promo Member', 'Anda mendapatkan Diskon 15% untuk Ganti Oli bulan ini!', 'info')}
                    className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl border border-indigo-200/60 bg-white/50 px-7 font-bold text-indigo-700 backdrop-blur transition-all hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                  >
                    <FaGift /> Cek Promo Anda
                  </button>
                ) : (
                  <a href="#services" className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl border border-indigo-200/60 bg-white/50 px-7 font-bold text-indigo-700 backdrop-blur transition-all hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                    Lihat Katalog <FaArrowRight className="text-sm" />
                  </a>
                )}
              </div>

              {!isMember && (
                <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-600 dark:text-slate-300/80">
                  {['Harga transparan', 'Mekanik berpengalaman', 'Garansi layanan'].map((text) => (
                    <span key={text} className="flex items-center gap-2">
                      <FaCheck className="text-indigo-600 dark:text-violet-400" /> {text}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Right Content / Cards */}
            {isMember ? (
              // MEMBER LOYALTY CARD
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="grid gap-5"
              >
                <div className="rounded-3xl border border-white/60 bg-white/60 p-6 text-slate-900 shadow-xl shadow-indigo-100/50 backdrop-blur-xl dark:border-white/8 dark:bg-white/5 dark:text-white dark:shadow-indigo-900/30">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-2xl font-extrabold text-white shadow-lg shadow-indigo-500/25">
                        {memberData.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300">Profil Member</p>
                        <h3 className="mt-1 text-2xl font-extrabold">{memberData.name}</h3>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{memberData.city} - {memberData.tier} Member</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={openProfileSettings}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-200 bg-white text-indigo-600 transition hover:bg-indigo-50 dark:border-white/10 dark:bg-white/5 dark:text-indigo-300 dark:hover:bg-white/10"
                      title="Setting Profil"
                    >
                      <FaEdit />
                    </button>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white/70 p-4 dark:bg-slate-900/50">
                      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400"><FaEnvelope /> Email</p>
                      <p className="mt-2 truncate text-sm font-bold text-slate-700 dark:text-slate-200">{memberData.email}</p>
                    </div>
                    <div className="rounded-2xl bg-white/70 p-4 dark:bg-slate-900/50">
                      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400"><FaPhoneAlt /> Telepon</p>
                      <p className="mt-2 text-sm font-bold text-slate-700 dark:text-slate-200">{memberData.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/60 bg-white/50 p-6 text-slate-900 shadow-xl shadow-indigo-100/40 backdrop-blur-xl dark:border-white/8 dark:bg-white/5 dark:text-white dark:shadow-indigo-900/30">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-amber-100 p-2.5 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400">
                        <FaStar className="text-xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">Poin Loyalti</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Kumpulkan poin untuk reward</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-extrabold text-indigo-600 dark:text-amber-300">{memberData.points}</p>
                      <p className="text-[10px] uppercase tracking-wider text-slate-400">Poin Aktif</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="mb-2 flex justify-between text-xs font-bold">
                      <span className="text-indigo-600 dark:text-amber-300">Gold</span>
                      <span className="text-slate-400">Platinum ({memberData.nextTierPoints} pts)</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 dark:from-amber-400 dark:to-amber-500"
                      />
                    </div>
                    <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                      Hanya butuh {memberData.nextTierPoints - memberData.points} poin lagi untuk naik ke Platinum!
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    ['Kendaraan', memberData.vehicles.length, FaCarSide],
                    ['Booking Aktif', 2, FaCalendarAlt],
                    ['Reward', '15%', FaGift],
                  ].map(([label, value, Icon]) => (
                    <div key={label} className="rounded-2xl border border-white/50 bg-white/45 p-4 shadow-lg shadow-indigo-100/30 backdrop-blur dark:border-white/8 dark:bg-white/5">
                      <Icon className="text-lg text-indigo-600 dark:text-indigo-300" />
                      <p className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white">{value}</p>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              // GUEST QUICK SERVICE CARD
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="relative hidden lg:block"
              >
                <div className="rounded-3xl border border-white/50 bg-white/30 p-5 shadow-2xl shadow-indigo-200/40 backdrop-blur-xl sm:p-6 dark:border-white/8 dark:bg-white/5 dark:shadow-indigo-950/30">
                  <div className="rounded-2xl bg-white p-6 text-slate-900 shadow-sm dark:bg-slate-900/90 dark:text-white dark:border dark:border-slate-800/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Quick Service</p>
                        <h2 className="mt-1 text-xl font-extrabold">Cek kebutuhan kendaraan</h2>
                      </div>
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 text-indigo-600 dark:from-indigo-900/30 dark:to-violet-900/30 dark:text-indigo-400">
                        <FaTools />
                      </span>
                    </div>
                    <div className="mt-5 grid gap-2.5">
                      {services.slice(0, 3).map((service) => {
                        const Icon = service.icon;
                        return (
                          <button
                            key={service.name}
                            type="button"
                            onClick={() => openBooking(service.name)}
                            className="group flex items-center gap-4 rounded-xl border border-slate-100 p-3.5 text-left transition-all hover:border-indigo-200 hover:bg-indigo-50/50 hover:shadow-sm dark:border-slate-800 dark:hover:border-indigo-500/30 dark:hover:bg-slate-800/50"
                          >
                            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400">
                              <Icon className="text-sm" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-bold">{service.name}</span>
                              <span className="block text-xs text-slate-400 dark:text-slate-500">Mulai {formatPrice(service.price)}</span>
                            </span>
                            <FaArrowRight className="text-xs text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-indigo-600 dark:text-slate-600 dark:group-hover:text-indigo-400" />
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-100 pt-5 text-center dark:border-slate-800">
                      {[
                        ['4.9', 'Rating'],
                        ['2.5K+', 'Pelanggan'],
                        ['8+', 'Mekanik'],
                      ].map(([val, label]) => (
                        <div key={label}>
                          <p className="text-xl font-extrabold text-indigo-700 dark:text-indigo-400">{val}</p>
                          <p className="text-[11px] text-slate-400 font-medium">{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        </section>

        {/* MEMBER VEHICLES SECTION */}
        {isMember && (
          <section id="vehicles" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeInUp} className="mb-10 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">Garasi Anda</p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Kendaraan Terdaftar</h2>
              </div>
              <button 
                onClick={() => showAlert('Tambah Kendaraan', 'Silakan hubungi admin di bengkel untuk meregistrasikan kendaraan baru Anda.', 'warning')}
                className="hidden sm:inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-indigo-50 px-5 text-sm font-semibold text-indigo-700 transition-all hover:bg-indigo-100 hover:-translate-y-0.5 dark:bg-indigo-900/20 dark:text-indigo-300 dark:hover:bg-indigo-900/30"
              >
                + Tambah Kendaraan
              </button>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid gap-5 md:grid-cols-2">
              {memberData.vehicles.map((vehicle, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-800/40">
                  <div className="flex items-center gap-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 text-indigo-600 dark:from-indigo-900/30 dark:to-violet-900/30 dark:text-indigo-400">
                      <FaCarSide className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{vehicle.name}</h3>
                      <p className="mt-1 inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-0.5 text-sm font-bold font-mono text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {vehicle.plate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3 border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100 dark:border-slate-800">
                    <div className="text-left sm:text-right">
                      <p className="text-xs text-slate-400 font-semibold">Service Terakhir</p>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{vehicle.lastService}</p>
                    </div>
                    <button 
                      onClick={() => showAlert('Riwayat Service', `Memuat riwayat perbaikan untuk ${vehicle.plate}...`, 'info')}
                      className="flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-500 hover:border-indigo-500 hover:text-indigo-600 transition-all dark:border-slate-700 dark:text-slate-400 dark:hover:border-indigo-500/50 dark:hover:text-indigo-400"
                    >
                      <FaHistory className="text-xs" /> Riwayat
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        {/* SERVICES CATALOG */}
        <section id="services" className={`mx-auto max-w-7xl px-5 ${isMember ? 'py-16' : 'py-20'} sm:px-8`}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeInUp} className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">Katalog Layanan</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl dark:text-white">Solusi lengkap untuk kendaraan Anda</h2>
              <p className="mt-3 max-w-2xl text-slate-500 dark:text-slate-400">Pilih layanan sesuai kebutuhan dengan harga awal dan estimasi waktu yang jelas.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Cari layanan..."
                  className="h-12 w-full rounded-xl border border-slate-200/80 bg-white pl-11 pr-4 text-sm font-medium outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 sm:w-56 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-500 dark:focus:ring-indigo-500/10"
                />
              </label>
              <label className="relative">
                <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="h-12 w-full appearance-none rounded-xl border border-slate-200/80 bg-white pl-11 pr-9 text-sm font-medium outline-none focus:border-indigo-500 sm:w-44 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  {['Semua', 'Mobil', 'Motor', 'Perawatan', 'Elektrikal'].map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-30px' }} variants={staggerContainer} className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredServices.map((service) => {
              const Icon = service.icon;
              return (
                <motion.article key={service.name} variants={fadeInUp} className="group rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-1.5 hover:border-indigo-200 hover:shadow-[0_20px_60px_rgba(79,70,229,0.1)] dark:border-slate-800 dark:bg-slate-800/40 dark:shadow-none dark:hover:border-indigo-500/30 dark:hover:shadow-[0_20px_60px_rgba(79,70,229,0.08)]">
                  <div className="flex items-start justify-between">
                    <span className="flex h-13 w-13 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 text-xl text-indigo-600 transition-transform group-hover:scale-110 dark:from-indigo-900/30 dark:to-violet-900/30 dark:text-indigo-400">
                      <Icon />
                    </span>
                    <span className="rounded-lg bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">{service.category}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold dark:text-white">{service.name}</h3>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500 dark:text-slate-400">{service.description}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-slate-400">
                    <span className="flex items-center gap-1.5"><FaClock className="text-indigo-500 dark:text-indigo-400" /> {service.duration}</span>
                    <span className="flex items-center gap-1.5"><FaShieldAlt className="text-indigo-500 dark:text-indigo-400" /> Bergaransi</span>
                  </div>
                  <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-5 dark:border-slate-700/50">
                    <div>
                      <p className="text-[11px] text-slate-400 font-medium">Mulai dari</p>
                      <p className="text-lg font-extrabold text-indigo-700 dark:text-indigo-400">{formatPrice(service.price)}</p>
                    </div>
                    <button type="button" onClick={() => openBooking(service.name)} className="flex h-10 w-10 items-center justify-center rounded-xl text-white transition-all group-hover:scale-105 shadow-lg shadow-indigo-600/20" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
                      <FaArrowRight className="text-sm" />
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </section>

        {/* PRODUCTS & REVIEWS (GUEST ONLY) */}
        {!isMember && (
          <>
            <section id="products" className="bg-white py-20 transition-colors dark:bg-slate-900/30">
              <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">Produk Pilihan</p>
                  <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl dark:text-white">Sparepart berkualitas dan terjamin</h2>
                </motion.div>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {products.map((product) => (
                    <motion.article key={product.name} variants={fadeInUp} className="group overflow-hidden rounded-2xl border border-slate-200/60 bg-white transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-800/40">
                      <div className={`flex h-40 items-center justify-center bg-gradient-to-br ${product.accent} transition-transform`}>
                        <FaTools className="text-5xl text-white/80 drop-shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-6" />
                      </div>
                      <div className="p-5">
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-400">{product.category}</p>
                        <h3 className="mt-2 font-extrabold dark:text-white">{product.name}</h3>
                        <div className="mt-4 flex items-center justify-between">
                          <p className="font-extrabold text-indigo-700 dark:text-indigo-400">{formatPrice(product.price)}</p>
                          <span className={`rounded-lg px-2.5 py-1 text-[11px] font-bold ${product.stock < 10 ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'}`}>
                            Stok {product.stock}
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              </div>
            </section>

            <section id="reviews" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer} className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
                <motion.div variants={fadeInUp}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">Cerita Pelanggan</p>
                  <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl dark:text-white">Dipercaya untuk menjaga perjalanan tetap nyaman.</h2>
                  <p className="mt-4 leading-7 text-slate-500 dark:text-slate-400">Kami membangun pengalaman bengkel yang transparan, ramah, dan mudah dipahami setiap pelanggan.</p>
                  <div className="mt-7 inline-flex items-center gap-4 rounded-2xl px-6 py-4 text-white shadow-lg shadow-indigo-600/15" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
                    <span className="text-3xl font-extrabold">4.9</span>
                    <span>
                      <span className="flex gap-1 text-amber-300">{[1, 2, 3, 4, 5].map((item) => <FaStar key={item} className="text-sm" />)}</span>
                      <span className="mt-1 block text-xs text-indigo-200">Dari 1.250+ ulasan</span>
                    </span>
                  </div>
                </motion.div>
                <div className="grid gap-4 md:grid-cols-3">
                  {testimonials.map((testimonial, idx) => (
                    <motion.article
                      key={testimonial.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                      className="rounded-2xl border border-slate-200/60 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-800/40"
                    >
                      <div className="flex gap-1 text-sm text-amber-400">
                        {Array.from({ length: testimonial.rating }, (_, index) => <FaStar key={index} />)}
                      </div>
                      <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">"{testimonial.text}"</p>
                      <div className="mt-5 border-t border-slate-100 pt-4 flex items-center gap-3 dark:border-slate-700/50">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-xs font-bold text-white">
                          {testimonial.initial}
                        </div>
                        <div>
                          <p className="text-sm font-bold dark:text-white">{testimonial.name}</p>
                          <p className="text-xs text-slate-400">{testimonial.vehicle}</p>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            </section>
            
            {/* Guest CTA */}
            <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden rounded-3xl px-8 py-14 text-white sm:px-14 lg:flex lg:items-center lg:justify-between"
                style={{ background: 'linear-gradient(135deg, #1e1659, #4c1d95, #6d28d9)' }}
              >
                {/* Decorative */}
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-400/10 blur-[60px]"></div>
                <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-indigo-400/10 blur-[50px]"></div>
                
                <div className="relative z-10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-violet-300">Siap merawat kendaraan?</p>
                  <h2 className="mt-3 text-3xl font-extrabold">Booking hari ini, berkendara lebih tenang besok.</h2>
                  <div className="mt-4 flex flex-wrap gap-5 text-sm text-indigo-200">
                    <span className="flex items-center gap-2"><FaMapMarkerAlt /> Cabang Jakarta</span>
                    <span className="flex items-center gap-2"><FaPhoneAlt /> +62 812-3456-7890</span>
                  </div>
                </div>
                <button type="button" onClick={() => openBooking()} className="relative z-10 mt-8 inline-flex h-14 items-center gap-3 rounded-2xl bg-white px-7 font-bold text-indigo-700 shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl lg:mt-0">
                  Pilih Jadwal <FaArrowRight />
                </button>
              </motion.div>
            </section>
          </>
        )}

        {/* LOYALTY SECTION (MEMBER ONLY) */}
        {isMember && (
          <section id="loyalty" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-amber-200/60 bg-amber-50/50 overflow-hidden lg:flex dark:border-amber-900/30 dark:bg-amber-950/10"
            >
              <div className="p-8 md:p-12 lg:w-1/2 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 mb-4 text-xs font-bold text-amber-800 w-max dark:bg-amber-900/30 dark:text-amber-400">
                  <FaGift className="text-amber-500" /> Rewards Member
                </div>
                <h2 className="text-3xl font-extrabold text-amber-900 tracking-tight dark:text-amber-100">Tukarkan Poin Anda dengan Hadiah Menarik</h2>
                <p className="mt-4 text-amber-800/70 leading-relaxed dark:text-amber-200/60">
                  Sebagai member {memberData.tier}, Anda mendapatkan prioritas layanan, diskon sparepart 10%, dan gratis cuci kendaraan setiap selesai servis.
                </p>
                <button 
                  onClick={() => showAlert('Katalog Rewards', 'Katalog reward sedang diperbarui. Nantikan hadiah-hadiah menarik dari kami!', 'info')}
                  className="mt-8 w-max rounded-xl px-6 py-3.5 font-bold text-white shadow-lg shadow-amber-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl"
                  style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
                >
                  Lihat Katalog Rewards
                </button>
              </div>
              <div className="lg:w-1/2 bg-amber-100/50 p-8 md:p-12 relative flex items-center justify-center dark:bg-amber-900/10">
                <FaStar className="text-[180px] text-amber-300/30 absolute dark:text-amber-500/10" />
                <div className="relative z-10 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl w-full max-w-sm border border-white/60 dark:border-slate-700/50 dark:bg-slate-800/80">
                  <h3 className="font-extrabold text-center text-slate-800 text-xl mb-5 dark:text-slate-100">Keuntungan Gold</h3>
                  <ul className="space-y-3.5 text-sm font-semibold text-slate-600 dark:text-slate-300">
                    {['Diskon Servis 15%', 'Gratis Spooring & Balancing', 'Prioritas Antrian VIP', 'Poin 2x Lipat'].map((benefit) => (
                      <li key={benefit} className="flex items-center gap-3"><FaCheck className="text-emerald-500 dark:text-emerald-400" /> {benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </section>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200/60 bg-white transition-colors dark:border-slate-800/50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md">
                <FaWrench className="text-xs" />
              </div>
              <span className="font-extrabold text-slate-900 dark:text-slate-100">BengkelPro</span>
            </div>
            <p className="text-sm text-slate-400 font-medium">
              Terima kasih telah menjadi bagian dari keluarga BengkelPro.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <FaHeart className="text-xs text-red-400" />
              <span>© 2026 BengkelPro {isMember && '• Member Area'}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* BOOKING MODAL */}
      <AnimatePresence>
        {bookingOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900 dark:border dark:border-slate-800"
            >
              <div className="flex items-center justify-between px-6 py-5 text-white" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-indigo-200">Reservasi {isMember ? 'Member' : 'Guest'}</p>
                  <h2 className="mt-1 text-xl font-extrabold">{isMember ? 'Fast Booking' : 'Booking Service'}</h2>
                </div>
                <button type="button" onClick={() => setBookingOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition">
                  <FaTimes className="text-sm" />
                </button>
              </div>

              {bookingSuccess ? (
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                  >
                    <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 text-2xl text-emerald-600 shadow-sm dark:from-emerald-900/30 dark:to-teal-900/30 dark:text-emerald-400">
                      <FaCheck />
                    </span>
                  </motion.div>
                  <h3 className="mt-5 text-2xl font-extrabold text-slate-900 dark:text-white">Booking Berhasil!</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400 font-medium">
                    {isMember ? 'Jadwal Anda telah tercatat. Kami akan mengirimkan pengingat 1 hari sebelum jadwal service.' : 'Tim BengkelPro akan menghubungi Anda untuk mengonfirmasi jadwal.'}
                  </p>
                  <button type="button" onClick={() => setBookingOpen(false)} className="mt-6 w-full rounded-xl py-3.5 font-bold text-white shadow-md transition-all hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
                    {isMember ? 'Tutup' : 'Selesai'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="grid gap-4 p-6 sm:grid-cols-2 dark:bg-slate-900">
                  {isMember ? (
                    <label className="sm:col-span-2">
                      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Kendaraan Anda</span>
                      <select required className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 font-semibold text-slate-800 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        <option value="">Pilih kendaraan terdaftar</option>
                        {memberData.vehicles.map(v => <option key={v.plate}>{v.name} - {v.plate}</option>)}
                      </select>
                    </label>
                  ) : (
                    <>
                      <label className="sm:col-span-2">
                        <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Nama Lengkap</span>
                        <input required placeholder="Nama Anda" className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm font-medium outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                      </label>
                      <label>
                        <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Nomor WhatsApp</span>
                        <input required placeholder="08xxxxxxxxxx" className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm font-medium outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                      </label>
                      <label>
                        <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Kendaraan</span>
                        <select required className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                          <option value="">Pilih kendaraan</option>
                          <option>Mobil</option>
                          <option>Motor</option>
                        </select>
                      </label>
                    </>
                  )}

                  <label className="sm:col-span-2">
                    <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Layanan Service</span>
                    <select value={selectedService} onChange={(event) => setSelectedService(event.target.value)} required className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 font-semibold outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      <option value="">Pilih layanan</option>
                      {services.map((service) => <option key={service.name}>{service.name}</option>)}
                    </select>
                  </label>
                  <label>
                    <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Tanggal</span>
                    <input required type="date" className="h-12 w-full rounded-xl border border-slate-200 px-4 font-medium outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200" />
                  </label>
                  <label>
                    <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Jam</span>
                    <input required type="time" className="h-12 w-full rounded-xl border border-slate-200 px-4 font-medium outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200" />
                  </label>
                  <button type="submit" className="mt-3 h-12 rounded-xl font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-0.5 sm:col-span-2" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
                    Konfirmasi Booking
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROFILE SETTINGS MODAL */}
      <AnimatePresence>
        {profileModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 24, stiffness: 280 }}
              className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl dark:border dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="px-6 py-6 text-white" style={{ background: 'linear-gradient(135deg, #4338ca, #7c3aed)' }}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl backdrop-blur">
                      <FaIdCard />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-indigo-200">Member Settings</p>
                      <h2 className="mt-1 text-2xl font-extrabold">Edit Profil</h2>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setProfileModalOpen(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition hover:bg-white/20"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              <form onSubmit={handleProfileSave} className="grid gap-5 p-6 sm:grid-cols-2">
                {[
                  ['name', 'Nama Lengkap', 'Budi Santoso'],
                  ['email', 'Email', 'nama@email.com'],
                  ['phone', 'Nomor WhatsApp', '08xxxxxxxxxx'],
                  ['city', 'Kota', 'Jakarta'],
                ].map(([name, label, placeholder]) => (
                  <label key={name} className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{label}</span>
                    <input
                      name={name}
                      value={profileForm[name] || ''}
                      onChange={handleProfileChange}
                      placeholder={placeholder}
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 text-sm font-semibold text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </label>
                ))}

                <label className="space-y-2 sm:col-span-2">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Alamat</span>
                  <textarea
                    name="address"
                    value={profileForm.address || ''}
                    onChange={handleProfileChange}
                    rows="3"
                    placeholder="Alamat lengkap"
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </label>

                <div className="rounded-2xl bg-indigo-50 p-4 dark:bg-indigo-900/20 sm:col-span-2">
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white">Preferensi Member</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {['Reminder servis', 'Promo personal', 'Riwayat kendaraan'].map((item) => (
                      <label key={item} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        <input type="checkbox" defaultChecked className="accent-indigo-600" />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setProfileModalOpen(false)}
                    className="h-12 rounded-2xl border border-slate-200 px-6 text-sm font-bold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="h-12 rounded-2xl px-6 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}
                  >
                    Simpan Profil
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GuestHome;
