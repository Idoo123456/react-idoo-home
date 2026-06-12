import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebookF, FaGoogle, FaTwitter, FaCheck, FaTimes, FaEye, FaEyeSlash, FaLock, FaEnvelope, FaShieldAlt, FaHeartbeat, FaTachometerAlt } from 'react-icons/fa';
import { supabase } from "../components/supabaseClient";

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

const Login = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('signin');
  const [form, setForm] = useState(defaultSignIn);
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '' });
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

        localStorage.setItem('bengkelpro_user', JSON.stringify(data));
        localStorage.setItem('bengkelpro_user_mode', 'admin');
        setSuccessMessage(`Selamat datang, ${data.name}! 🎉`);
        setSuccessType('login');
        setShowSuccessModal(true);

        setTimeout(() => {
          navigate('/dashboard');
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
            },
          ]);

        if (error) throw error;

        setSuccessMessage('Pendaftaran berhasil! Silakan login dengan akun Anda.');
        setSuccessType('signup');
        setShowSuccessModal(true);
        setSignupForm({ name: '', email: '', password: '' });

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
    <div className="grid h-dvh w-full overflow-hidden bg-white md:grid-cols-[minmax(0,1.1fr)_minmax(430px,0.9fr)]">
      {/* Error Modal - Full Screen */}
      {errorMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="animate-in fade-in zoom-in duration-300">
            <div className="rounded-3xl bg-gradient-to-br from-white to-slate-50 p-8 shadow-2xl text-center max-w-sm">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-gradient-to-br from-red-400 to-red-600 p-5 text-white shadow-lg shadow-red-500/50">
                  <FaTimes className="text-5xl" />
                </div>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-3">Oops! 😞</h3>
              <p className="text-slate-600 mb-2 text-lg font-medium">{errorMessage}</p>
              <p className="mb-6 text-sm text-slate-500">{getErrorHint(errorMessage)}</p>
              <button
                onClick={() => setErrorMessage('')}
                className="w-full rounded-xl bg-gradient-to-r from-red-500 to-pink-500 py-3 text-base font-bold text-white shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/50 transition"
              >
                ✓ Coba Lagi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="animate-in fade-in zoom-in duration-300">
            <div className="rounded-3xl bg-gradient-to-br from-white to-slate-50 p-8 shadow-2xl text-center max-w-sm">
              {successType === 'login' ? (
                <>
                  <div className="mb-6 flex justify-center">
                    <div className="animate-bounce rounded-full bg-gradient-to-br from-violet-400 to-indigo-600 p-5 text-white shadow-lg shadow-indigo-500/40">
                      <FaCheck className="text-5xl" />
                    </div>
                  </div>
                  <h3 className="mb-3 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-3xl font-bold text-transparent">Login Berhasil! 🎉</h3>
                  <p className="text-slate-600 mb-2 text-lg font-medium">{successMessage}</p>
                  <p className="text-sm text-slate-500">Mengalihkan ke dashboard dalam 2 detik...</p>
                </>
              ) : (
                <>
                  <div className="mb-6 flex justify-center">
                    <div className="rounded-full bg-gradient-to-br from-violet-400 to-indigo-600 p-5 text-white shadow-lg shadow-indigo-500/40">
                      <FaCheck className="text-5xl" />
                    </div>
                  </div>
                  <h3 className="mb-3 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-3xl font-bold text-transparent">Akun Terdaftar! ✨</h3>
                  <p className="text-slate-600 mb-2 text-lg font-medium">{successMessage}</p>
                  <p className="text-sm text-slate-500">Kembali ke halaman login dalam 3 detik...</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Left Side - Branding & Background */}
      <div className="relative hidden min-h-0 overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 px-8 py-7 md:flex md:flex-col md:justify-between lg:px-14 lg:py-10 xl:px-20 xl:py-12">
        {/* Decorative Elements */}
        <div className="absolute right-0 top-0 -mr-48 -mt-48 h-96 w-96 rounded-full bg-violet-400/15 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-48 -ml-48 h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl"></div>

        {/* Header with Logo */}
        <div className="relative z-10">
          <div className="mb-8 flex items-center gap-3 xl:mb-12">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-indigo-700 shadow-lg shadow-indigo-950/30">
              <span className="text-xl font-bold">🔧</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">BENGKEL PRO</h1>
              <p className="text-xs uppercase tracking-wider text-violet-200">Platform Manajemen Bengkel</p>
            </div>
          </div>

          {/* Main Headline */}
          <div>
            <h2 className="mb-4 text-4xl font-bold leading-[1.08] tracking-tight lg:text-5xl xl:mb-6 xl:text-6xl">
              <span className="text-white">Tingkatkan Kualitas</span>
              <br />
              <span className="bg-gradient-to-r from-violet-300 via-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">Layanan Bengkel</span>
              <br />
              <span className="text-white">Anda.</span>
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-slate-300 lg:text-base xl:text-lg">
              Sistem manajemen terpadu yang didesain khusus untuk bengkel profesional. Kelola kendaraan, mekanik, dan layanan dengan mudah.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="relative z-10 grid w-full max-w-2xl gap-2.5 xl:gap-3">
          {[
            { icon: FaShieldAlt, title: 'Keamanan Terjamin', desc: 'Data terlindungi dengan enkripsi tingkat enterprise' },
            { icon: FaHeartbeat, title: 'Manajemen Terpadu', desc: 'Kelola semua aspek bengkel dari satu dashboard' },
            { icon: FaTachometerAlt, title: 'Performa Maksimal', desc: 'Sistem responsif dengan uptime 99.9%' }
          ].map((feature, idx) => (
            <div key={idx} className="rounded-2xl border border-violet-300/20 bg-white/[0.07] p-3 backdrop-blur-sm transition hover:border-violet-200/30 hover:bg-white/[0.11] xl:p-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex-shrink-0 text-lg text-violet-300">
                  <feature.icon />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{feature.title}</h3>
                  <p className="text-sm text-gray-300">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="min-h-0 overflow-y-auto bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
        <div className="mx-auto flex min-h-full w-full max-w-[540px] flex-col justify-center px-6 py-8 sm:px-10 md:px-8 lg:px-12 xl:px-16">
          <div className="w-full space-y-5 xl:space-y-6">
          {/* Greeting */}
          <div className="text-center md:text-left">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700 md:mb-6 md:justify-start">
              <span className="text-2xl">🔧</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
              Selamat {isSignIn ? 'Datang' : 'Bergabung'}
            </h2>
            <p className="text-gray-600 text-lg">
              {isSignIn ? 'Masuk ke platform CRM bengkel Anda' : 'Buat akun untuk mulai mengelola bengkel'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            {!isSignIn && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide mb-2">
                  Nama Lengkap
                </label>
                <input
                  name="name"
                  placeholder="Masukkan nama lengkap Anda"
                  value={signupForm.name}
                  onChange={handleSignUpChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm transition placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide mb-2">
                Email Pengguna
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  name="email"
                  type="email"
                  placeholder="contoh@email.com"
                  value={isSignIn ? form.email : signupForm.email}
                  onChange={isSignIn ? handleSignInChange : handleSignUpChange}
                  className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-3 text-sm transition placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  Password
                </label>
                {isSignIn && (
                  <button type="button" className="text-xs font-semibold text-indigo-600 transition hover:text-indigo-800">
                    Lupa Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={isSignIn ? form.password : signupForm.password}
                  onChange={isSignIn ? handleSignInChange : handleSignUpChange}
                  className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-12 py-3 text-sm transition placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition text-sm"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Password Strength */}
              {!isSignIn && signupForm.password && (
                <div className="mt-3 space-y-2 p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <div className="flex gap-1.5">
                    {[0, 1, 2, 3, 4].map((index) => (
                      <div
                        key={index}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: index <= passwordStrength ? getPasswordStrengthColor(passwordStrength) : '#e5e7eb',
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-600">
                      Kekuatan: <span style={{ color: getPasswordStrengthColor(passwordStrength) }}>
                        {getPasswordStrengthLabel(passwordStrength)}
                      </span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Remember Me */}
            <label className="flex items-center gap-2 text-sm cursor-pointer group">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 accent-indigo-600" />
              <span className="text-gray-700">Ingat saya</span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-base font-bold text-white shadow-lg shadow-indigo-600/25 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-600/40 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? '⏳ Memproses...' : isSignIn ? 'Masuk ke Dashboard' : '✨ Buat Akun'}
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="text-xs font-semibold uppercase text-gray-500">atau</span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-3 gap-3">
            {[
              ['Facebook', FaFacebookF, '#3b5bdb'],
              ['Google', FaGoogle, '#dc2626'],
              ['Twitter', FaTwitter, '#0ea5e9'],
            ].map(([label, Icon, color]) => (
              <button
                key={label}
                type="button"
                onClick={() => handleSocial(label)}
                className="group relative rounded-lg py-2.5 px-2 transition border border-gray-200 bg-white hover:bg-gray-50"
              >
                <Icon className="mx-auto text-lg transition group-hover:scale-110" style={{ color }} />
              </button>
            ))}
          </div>

          {/* Switch Mode / Demo */}
          <div className="space-y-3 border-t border-gray-200 pt-4">
            <p className="text-center text-sm text-gray-600">
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
              className="w-full rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 py-2.5 text-center text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5"
            >
              Masuk sebagai Guest
            </button>

            <button
              type="button"
              onClick={() => {
                localStorage.setItem('bengkelpro_user_mode', 'admin');
                navigate('/dashboard');
              }}
              className="w-full rounded-lg border border-indigo-200 bg-indigo-50 py-2.5 text-center text-sm font-bold text-indigo-700 transition hover:bg-indigo-100"
            >
              → Gunakan Akun Demo Admin
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
