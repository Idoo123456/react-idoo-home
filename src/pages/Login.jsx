import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebookF, FaGoogle, FaTwitter, FaCheck, FaTimes, FaEye, FaEyeSlash, FaLock, FaEnvelope, FaShieldAlt, FaHeartbeat, FaTachometerAlt, FaWrench, FaStar, FaArrowRight, FaUser } from 'react-icons/fa';
import { supabase } from "../components/supabaseClient";
import { motion, AnimatePresence } from 'framer-motion';
import { syncProfileFromUser } from '../utils/profile';

const defaultSignIn = { email: '', password: '' };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Fungsi untuk menghitung kekuatan password
const calculatePasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z\d]/.test(password)) strength++;
  return strength;
};

const getPasswordStrengthLabel = (strength) => {
  const labels = ['Sangat Lemah', 'Lemah', 'Cukup', 'Kuat', 'Sangat Kuat'];
  return labels[strength] || 'Sangat Lemah';
};

const getPasswordStrengthColor = (strength) => {
  const colors = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e'];
  return colors[strength] || '#ef4444';
};

const getErrorHint = (message) => {
  if (message.includes('belum diisi')) {
    return 'Lengkapi data yang diperlukan untuk melanjutkan';
  }

  if (message.includes('Format email')) {
    return 'Gunakan format email seperti nama@email.com';
  }

  if (message.includes('masukkan salah')) {
    return 'Periksa kembali email dan password Anda';
  }

  return 'Silakan periksa data Anda dan coba kembali';
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } },
  exit: { opacity: 0, scale: 0.85, y: 20, transition: { duration: 0.2 } },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const features = [
  { icon: FaShieldAlt, title: 'Keamanan Enterprise', desc: 'Data terlindungi dengan enkripsi tingkat lanjut dan sistem backup otomatis', color: '#818cf8' },
  { icon: FaHeartbeat, title: 'Dashboard Terpadu', desc: 'Kelola semua aspek bengkel dari satu panel kontrol yang intuitif', color: '#a78bfa' },
  { icon: FaTachometerAlt, title: 'Performa Optimal', desc: 'Sistem responsif dengan monitoring real-time dan uptime 99.9%', color: '#c084fc' }
];

const Login = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('signin');
  const [form, setForm] = useState(defaultSignIn);
  const [loginRole, setLoginRole] = useState('member');
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', role: 'member' });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successType, setSuccessType] = useState(''); // 'signup' atau 'login'
  const [showPassword, setShowPassword] = useState(false);

  const isSignIn = mode === 'signin';
  const passwordStrength = useMemo(() => calculatePasswordStrength(signupForm.password), [signupForm.password]);

  const handleSignInChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const handleSignUpChange = (event) => {
    const { name, value } = event.target;
    setSignupForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      if (isSignIn) {
        if (!form.email && !form.password) {
          throw new Error('Email dan password belum diisi');
        }

        if (!form.email) {
          throw new Error('Email belum diisi');
        }

        if (!form.password) {
          throw new Error('Password belum diisi');
        }

        if (!emailPattern.test(form.email)) {
          throw new Error('Format email belum valid');
        }

        // Sign In - Query tabel user
        const { data, error } = await supabase
          .from('user')
          .select('*')
          .eq('email', form.email)
          .eq('password', form.password)
          .single();

        if (error || !data) {
          throw new Error('Email atau password yang Anda masukkan salah');
        }

        const accountRole = data.role === 'admin' || data.role === 'member' ? data.role : loginRole;

        localStorage.setItem('bengkelpro_user', JSON.stringify({ ...data, role: accountRole }));
        localStorage.setItem('bengkelpro_user_mode', accountRole);
        syncProfileFromUser(data, accountRole);
        setSuccessMessage(`Selamat datang, ${data.name}! 🎉`);
        setSuccessType('login');
        setShowSuccessModal(true);

        setTimeout(() => {
          navigate(accountRole === 'admin' ? '/dashboard' : '/guest/home');
        }, 2000);
      } else {
        // Sign Up - Insert ke tabel user
        if (!signupForm.name || !signupForm.email || !signupForm.password) {
          throw new Error('Semua field harus diisi');
        }

        // Cek apakah email sudah terdaftar
        const { data: existingUser } = await supabase
          .from('user')
          .select('id')
          .eq('email', signupForm.email)
          .single();

        if (existingUser) {
          throw new Error('Email sudah terdaftar');
        }

        // Insert user baru
        const { error } = await supabase
          .from('user')
          .insert([
            {
              name: signupForm.name,
              email: signupForm.email,
              password: signupForm.password,
              role: signupForm.role,
            },
          ]);

        if (error) throw error;

        setSuccessMessage('Pendaftaran berhasil! Silakan login dengan akun Anda.');
        setSuccessType('signup');
        setShowSuccessModal(true);
        setSignupForm({ name: '', email: '', password: '', role: 'member' });

        setTimeout(() => {
          setShowSuccessModal(false);
          setMode('signin');
        }, 3000);
      }
    } catch (error) {
      const message = error.message || 'Terjadi kesalahan. Silakan coba lagi.';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocial = (provider) => {
    alert(`${provider} login hanya tampilan demo.`);
  };

  const handleGuestLogin = () => {
    localStorage.setItem('bengkelpro_user_mode', 'guest');
    navigate('/guest/home');
  };

  return (
    <div className="grid h-dvh w-full overflow-hidden bg-white md:grid-cols-[minmax(0,1.15fr)_minmax(420px,0.85fr)]">

      {/* Error Modal */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            key="error-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          >
            <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit">
              <div className="rounded-3xl bg-white p-8 shadow-2xl text-center max-w-sm border border-slate-100">
                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-red-400/20 blur-xl"></div>
                    <div className="relative rounded-full bg-gradient-to-br from-red-500 to-rose-600 p-5 text-white shadow-lg shadow-red-500/30">
                      <FaTimes className="text-4xl" />
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Oops!</h3>
                <p className="text-slate-600 mb-1.5 text-base font-medium">{errorMessage}</p>
                <p className="mb-7 text-sm text-slate-400">{getErrorHint(errorMessage)}</p>
                <button
                  onClick={() => setErrorMessage('')}
                  className="w-full rounded-2xl bg-gradient-to-r from-red-500 to-rose-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-500/30 active:translate-y-0"
                >
                  Coba Lagi
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            key="success-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          >
            <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit">
              <div className="rounded-3xl bg-white p-8 shadow-2xl text-center max-w-sm border border-slate-100">
                {successType === 'login' ? (
                  <>
                    <div className="mb-6 flex justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-indigo-400/20 blur-xl animate-pulse"></div>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
                          className="relative rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 p-5 text-white shadow-lg shadow-indigo-500/30"
                        >
                          <FaCheck className="text-4xl" />
                        </motion.div>
                      </div>
                    </div>
                    <h3 className="mb-2 text-2xl font-extrabold text-slate-900">Login Berhasil!</h3>
                    <p className="text-slate-600 mb-1.5 text-base font-medium">{successMessage}</p>
                    <p className="text-sm text-slate-400">Mengalihkan ke halaman utama...</p>
                    <div className="mt-5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2, ease: 'linear' }}
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-6 flex justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-xl animate-pulse"></div>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
                          className="relative rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 p-5 text-white shadow-lg shadow-emerald-500/30"
                        >
                          <FaCheck className="text-4xl" />
                        </motion.div>
                      </div>
                    </div>
                    <h3 className="mb-2 text-2xl font-extrabold text-slate-900">Akun Terdaftar! ✨</h3>
                    <p className="text-slate-600 mb-1.5 text-base font-medium">{successMessage}</p>
                    <p className="text-sm text-slate-400">Kembali ke halaman login...</p>
                    <div className="mt-5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 3, ease: 'linear' }}
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                      />
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left Side - Branding */}
      <div className="relative hidden min-h-0 overflow-hidden md:flex md:flex-col md:justify-between"
        style={{
          background: 'linear-gradient(135deg, #0f0a2e 0%, #1e1659 30%, #2d1b6e 50%, #4c1d95 75%, #6d28d9 100%)',
        }}
      >
        {/* Animated decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[100px] animate-float"></div>
          <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[100px] animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute left-1/2 top-1/3 h-72 w-72 rounded-full bg-fuchsia-500/8 blur-[80px] animate-float" style={{ animationDelay: '4s' }}></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}></div>
        </div>

        {/* Header with Logo */}
        <div className="relative z-10 px-8 py-7 lg:px-14 lg:py-10 xl:px-20 xl:py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 flex items-center gap-3.5 xl:mb-14"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md text-white shadow-lg border border-white/10">
              <FaWrench className="text-lg" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-white">BENGKEL PRO</h1>
              <p className="text-[10px] uppercase tracking-[0.25em] text-violet-300/80 font-semibold">Platform Manajemen Bengkel</p>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <h2 className="mb-5 text-4xl font-extrabold leading-[1.08] tracking-tight lg:text-5xl xl:mb-7 xl:text-[3.5rem]">
              <span className="text-white">Tingkatkan Kualitas</span>
              <br />
              <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">Layanan Bengkel</span>
              <br />
              <span className="text-white">Anda.</span>
            </h2>
            <p className="max-w-lg text-sm leading-relaxed text-slate-300/90 lg:text-base xl:text-lg">
              Sistem manajemen terpadu yang didesain khusus untuk bengkel profesional. Kelola kendaraan, mekanik, dan layanan dengan mudah.
            </p>
          </motion.div>
        </div>

        {/* Features */}
        <div className="relative z-10 px-8 pb-7 lg:px-14 lg:pb-10 xl:px-20 xl:pb-12">
          <div className="grid w-full max-w-2xl gap-3 xl:gap-3.5">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + idx * 0.12 }}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.08]"
              >
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm" style={{ color: feature.color }}>
                    <feature.icon className="text-lg" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-white">{feature.title}</h3>
                    <p className="mt-0.5 text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 flex flex-wrap items-center gap-5"
          >
            <div className="flex items-center gap-1.5 text-amber-300/80">
              {[1,2,3,4,5].map(i => <FaStar key={i} className="text-xs" />)}
              <span className="ml-1.5 text-xs font-semibold text-white/60">4.9 Rating</span>
            </div>
            <div className="h-4 w-px bg-white/15"></div>
            <span className="text-xs font-semibold text-white/60">2,500+ Pelanggan Aktif</span>
            <div className="h-4 w-px bg-white/15"></div>
            <span className="text-xs font-semibold text-white/60">99.9% Uptime</span>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="min-h-0 overflow-y-auto bg-gradient-to-b from-white via-white to-slate-50/80">
        <div className="mx-auto flex min-h-full w-full max-w-[520px] flex-col justify-center px-6 py-8 sm:px-10 md:px-8 lg:px-12 xl:px-14">
          <div className="w-full space-y-5 xl:space-y-6">

          {/* Mobile logo */}
          <div className="flex items-center gap-3 md:hidden mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/25">
              <FaWrench className="text-sm" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-slate-900">BengkelPro</span>
          </div>

          {/* Greeting */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-1.5 tracking-tight">
              {isSignIn ? 'Selamat Datang' : 'Buat Akun'}
            </h2>
            <p className="text-slate-500 text-[15px]">
              {isSignIn ? 'Masuk ke platform manajemen bengkel Anda' : 'Daftar untuk mulai mengelola bengkel'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            {!isSignIn && (
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-sm" />
                  <input
                    name="name"
                    placeholder="Masukkan nama lengkap Anda"
                    value={signupForm.name}
                    onChange={handleSignUpChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 py-3.5 text-sm font-medium text-slate-800 transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Email Pengguna
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-sm" />
                <input
                  name="email"
                  type="email"
                  placeholder="contoh@email.com"
                  value={isSignIn ? form.email : signupForm.email}
                  onChange={isSignIn ? handleSignInChange : handleSignUpChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 py-3.5 text-sm font-medium text-slate-800 transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Password
                </label>
                {isSignIn && (
                  <button type="button" className="text-xs font-semibold text-indigo-600 transition hover:text-indigo-800">
                    Lupa Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-sm" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={isSignIn ? form.password : signupForm.password}
                  onChange={isSignIn ? handleSignInChange : handleSignUpChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-12 py-3.5 text-sm font-medium text-slate-800 transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition text-sm"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Password Strength */}
              {!isSignIn && signupForm.password && (
                <div className="mt-3 space-y-2 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex gap-1.5">
                    {[0, 1, 2, 3, 4].map((index) => (
                      <div
                        key={index}
                        className="h-1.5 flex-1 rounded-full transition-all duration-500"
                        style={{
                          backgroundColor: index <= passwordStrength ? getPasswordStrengthColor(passwordStrength) : '#e2e8f0',
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-500">
                      Kekuatan: <span className="font-bold" style={{ color: getPasswordStrengthColor(passwordStrength) }}>
                        {getPasswordStrengthLabel(passwordStrength)}
                      </span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Role Selection */}
            {(
              <div className="flex items-center gap-3 py-1">
                {['member', 'admin'].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => {
                      if (isSignIn) {
                        setLoginRole(role);
                      } else {
                        setSignupForm((prev) => ({ ...prev, role }));
                      }
                    }}
                    className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all border ${
                      (isSignIn ? loginRole : signupForm.role) === role
                        ? 'border-indigo-200 bg-indigo-50 text-indigo-700 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700'
                    }`}
                  >
                    {role === 'member' ? '👤 Member' : '🛡️ Admin'}
                  </button>
                ))}
              </div>
            )}

            {/* Remember Me */}
            <label className="flex items-center gap-2.5 text-sm cursor-pointer group">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 accent-indigo-600" />
              <span className="text-slate-600 font-medium">Ingat saya di perangkat ini</span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full overflow-hidden rounded-xl py-4 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-600/35 disabled:cursor-not-allowed disabled:opacity-70 active:translate-y-0"
              style={{
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #6d28d9 100%)',
              }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  Memproses...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {isSignIn ? 'Masuk' : 'Buat Akun Sekarang'}
                  <FaArrowRight className="text-xs" />
                </span>
              )}
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">atau</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-3 gap-3">
            {[
              ['Facebook', FaFacebookF, '#1877f2', 'hover:bg-blue-50'],
              ['Google', FaGoogle, '#ea4335', 'hover:bg-red-50'],
              ['Twitter', FaTwitter, '#1da1f2', 'hover:bg-sky-50'],
            ].map(([label, Icon, color, hoverBg]) => (
              <button
                key={label}
                type="button"
                onClick={() => handleSocial(label)}
                className={`group relative rounded-xl py-3 px-2 transition-all border border-slate-200 bg-white ${hoverBg} hover:border-slate-300 hover:-translate-y-0.5 hover:shadow-md`}
              >
                <Icon className="mx-auto text-lg transition-transform group-hover:scale-110" style={{ color }} />
              </button>
            ))}
          </div>

          {/* Switch Mode / Demo */}
          <div className="space-y-2.5 border-t border-slate-100 pt-5">
            <p className="text-center text-sm text-slate-500">
              {isSignIn ? 'Belum punya akun?' : 'Sudah punya akun?'}{' '}
              <button
                type="button"
                onClick={() => {
                  setErrorMessage('');
                  setMode(isSignIn ? 'signup' : 'signin');
                }}
                className="font-bold text-indigo-600 transition hover:text-indigo-800"
              >
                {isSignIn ? 'Daftar sekarang' : 'Masuk sekarang'}
              </button>
            </p>

            <button
              type="button"
              onClick={handleGuestLogin}
              className="w-full rounded-xl py-3 text-center text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
              }}
            >
              Masuk sebagai Guest
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.setItem('bengkelpro_user_mode', 'member');
                  setSuccessType('login');
                  setSuccessMessage('Login Demo Member berhasil! Mengalihkan...');
                  setShowSuccessModal(true);
                  setTimeout(() => {
                    setShowSuccessModal(false);
                    navigate('/guest/home');
                  }, 1500);
                }}
                className="rounded-xl border border-violet-200 bg-violet-50/70 py-2.5 text-center text-xs font-bold text-violet-700 transition-all hover:bg-violet-100 hover:-translate-y-0.5"
              >
                Demo Member
              </button>

              <button
                type="button"
                onClick={() => {
                  localStorage.setItem('bengkelpro_user_mode', 'admin');
                  setSuccessType('login');
                  setSuccessMessage('Login Demo Admin berhasil! Mengalihkan...');
                  setShowSuccessModal(true);
                  setTimeout(() => {
                    setShowSuccessModal(false);
                    navigate('/dashboard');
                  }, 1500);
                }}
                className="rounded-xl border border-indigo-200 bg-indigo-50/70 py-2.5 text-center text-xs font-bold text-indigo-700 transition-all hover:bg-indigo-100 hover:-translate-y-0.5"
              >
                Demo Admin
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
