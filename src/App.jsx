import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes, Outlet } from 'react-router-dom';
import './assets/tailwind.css';

import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Service = lazy(() => import('./pages/Service'));
const Mekanik = lazy(() => import('./pages/Mekanik'));
const Booking = lazy(() => import('./pages/Booking'));
const Kendaraan = lazy(() => import('./pages/Kendaraan'));
const Customers = lazy(() => import('./pages/Customers'));
const Member = lazy(() => import('./pages/Member'));
const Guest = lazy(() => import('./pages/Guest'));
const Sparepart = lazy(() => import('./pages/Sparepart'));
const Invoice = lazy(() => import('./pages/Invoice'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Settings = lazy(() => import('./pages/Settings'));
const Login = lazy(() => import('./pages/Login'));
const GuestHome = lazy(() => import('./pages/GuestHome'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ComponentLibrary = lazy(() => import('./pages/ComponentLibrary'));

const PageLoader = () => (
  <div className="flex min-h-dvh items-center justify-center bg-[linear-gradient(180deg,var(--bg)_0%,var(--bg-alt)_100%)] px-6">
    <div className="panel rounded-[20px] px-6 py-4 text-sm text-[var(--text-muted)]">
      Memuat halaman bengkel...
    </div>
  </div>
);

const isAdminLoggedIn = () => {
  if (typeof window === 'undefined') return false;

  return localStorage.getItem('bengkelpro_user_mode') === 'admin';
};

const isMemberLoggedIn = () => {
  if (typeof window === 'undefined') return false;

  return localStorage.getItem('bengkelpro_user_mode') === 'member';
};

const HomeRedirect = () => {
  if (isAdminLoggedIn()) return <Navigate to="/dashboard" replace />;
  if (isMemberLoggedIn()) return <Navigate to="/guest/home" replace />;
  return <Navigate to="/guest/home" replace />;
};

const AdminRoute = () => (
  isAdminLoggedIn() ? <MainLayout /> : <Navigate to="/guest/home" replace />
);



class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'Terjadi error runtime.' };
  }

  componentDidCatch(error) {
    console.error('App render error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen w-screen items-center justify-center bg-[#f4f6fb] px-6">
          <div className="max-w-lg rounded-[24px] border border-[#d7deea] bg-white p-6 text-center shadow-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[#5353e2]">BengkelPro</p>
            <h1 className="mt-2 text-2xl font-semibold text-[#0f172a]">Tampilan gagal dimuat</h1>
            <p className="mt-2 text-sm text-[#5b6478]">{this.state.message}</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <BrowserRouter>
      <AppErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
            </Route>

            <Route path="/guest/home" element={<GuestHome />} />

            <Route path="/" element={<HomeRedirect />} />

            <Route element={<AdminRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/service" element={<Service />} />
              <Route path="/mekanik" element={<Mekanik />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/kendaraan" element={<Kendaraan />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/member" element={<Member />} />
              <Route path="/guest" element={<Guest />} />
              <Route path="/sparepart" element={<Sparepart />} />
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/components" element={<ComponentLibrary />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AppErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
