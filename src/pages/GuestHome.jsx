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
} from 'react-icons/fa';

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
  { name: 'Rafi Hidayat', vehicle: 'Toyota Avanza', text: 'Booking mudah, estimasi jelas, dan kendaraan selesai tepat waktu.', rating: 5 },
  { name: 'Citra Lestari', vehicle: 'Honda Beat', text: 'Pelayanannya ramah dan saya selalu mendapat update proses servis.', rating: 5 },
  { name: 'Maya Putri', vehicle: 'Daihatsu Sigra', text: 'Bengkel modern dengan mekanik yang komunikatif dan profesional.', rating: 5 },
];

const formatPrice = (price) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);

const GuestHome = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Semua');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedService, setSelectedService] = useState('');

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
  };

  return (
    <div className="h-dvh overflow-y-auto bg-[#f7f7ff] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-indigo-100 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#home" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25">
              <FaWrench />
            </span>
            <span>
              <span className="block text-lg font-black tracking-tight">BengkelPro</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-600">Auto Care Center</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 lg:flex">
            <a href="#home" className="transition hover:text-indigo-600">Beranda</a>
            <a href="#services" className="transition hover:text-indigo-600">Layanan</a>
            <a href="#products" className="transition hover:text-indigo-600">Produk</a>
            <a href="#reviews" className="transition hover:text-indigo-600">Ulasan</a>
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="inline-flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-700"
            >
              <FaUserShield /> Login Admin
            </button>
            <button
              type="button"
              onClick={() => openBooking()}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700"
            >
              Booking <FaArrowRight />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((current) => !current)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-100 bg-white text-indigo-700 sm:hidden"
            aria-label="Buka menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-indigo-100 bg-white px-5 py-4 sm:hidden">
            <div className="grid gap-2 text-sm font-semibold text-slate-700">
              {[
                ['Beranda', '#home'],
                ['Layanan', '#services'],
                ['Produk', '#products'],
                ['Ulasan', '#reviews'],
              ].map(([label, href]) => (
                <a key={href} href={href} onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-4 py-3 hover:bg-indigo-50">
                  {label}
                </a>
              ))}
              <button type="button" onClick={() => navigate('/login')} className="rounded-xl px-4 py-3 text-left text-indigo-700 hover:bg-indigo-50">
                Login Admin
              </button>
            </div>
          </div>
        )}
      </header>

      <main>
        <section id="home" className="relative overflow-hidden bg-[linear-gradient(135deg,#17153b_0%,#312e81_48%,#6d28d9_100%)]">
          <div className="absolute -right-36 -top-36 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl" />
          <div className="absolute -bottom-44 left-1/3 h-96 w-96 rounded-full bg-indigo-300/15 blur-3xl" />
          <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="text-white">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-100 backdrop-blur">
                <FaStar className="text-amber-300" /> Bengkel terpercaya untuk kendaraan Anda
              </div>
              <h1 className="max-w-3xl text-5xl font-black leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">
                Rawat kendaraan dengan cara yang lebih
                <span className="block bg-gradient-to-r from-violet-300 via-white to-indigo-200 bg-clip-text text-transparent">modern.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-indigo-100 sm:text-lg">
                Temukan layanan, cek harga, pilih jadwal, dan pantau kebutuhan kendaraan dalam satu pengalaman bengkel yang praktis.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => openBooking()}
                  className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-white px-7 font-bold text-indigo-700 shadow-xl shadow-indigo-950/25 transition hover:-translate-y-0.5"
                >
                  <FaCalendarAlt /> Booking Sekarang
                </button>
                <a href="#services" className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-7 font-bold text-white backdrop-blur transition hover:bg-white/15">
                  Lihat Katalog <FaArrowRight />
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-6 text-sm text-indigo-100">
                <span className="flex items-center gap-2"><FaCheck className="text-violet-300" /> Harga transparan</span>
                <span className="flex items-center gap-2"><FaCheck className="text-violet-300" /> Mekanik berpengalaman</span>
                <span className="flex items-center gap-2"><FaCheck className="text-violet-300" /> Garansi layanan</span>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[32px] border border-white/15 bg-white/10 p-5 shadow-2xl shadow-indigo-950/40 backdrop-blur-xl sm:p-7">
                <div className="rounded-[26px] bg-white p-6 text-slate-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Quick Service</p>
                      <h2 className="mt-1 text-2xl font-bold">Cek kebutuhan kendaraan</h2>
                    </div>
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                      <FaTools />
                    </span>
                  </div>
                  <div className="mt-6 grid gap-3">
                    {services.slice(0, 3).map((service) => {
                      const Icon = service.icon;
                      return (
                        <button
                          key={service.name}
                          type="button"
                          onClick={() => openBooking(service.name)}
                          className="group flex items-center gap-4 rounded-2xl border border-slate-200 p-4 text-left transition hover:border-indigo-300 hover:bg-indigo-50"
                        >
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                            <Icon />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-bold">{service.name}</span>
                            <span className="block text-xs text-slate-500">Mulai {formatPrice(service.price)}</span>
                          </span>
                          <FaArrowRight className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-600" />
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-100 pt-5 text-center">
                    <div><p className="text-xl font-black text-indigo-700">4.9</p><p className="text-[11px] text-slate-500">Rating</p></div>
                    <div><p className="text-xl font-black text-indigo-700">2.5K+</p><p className="text-[11px] text-slate-500">Pelanggan</p></div>
                    <div><p className="text-xl font-black text-indigo-700">8+</p><p className="text-[11px] text-slate-500">Mekanik</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-indigo-600">Katalog Layanan</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Solusi lengkap untuk kendaraan Anda</h2>
              <p className="mt-3 max-w-2xl text-slate-500">Pilih layanan sesuai kebutuhan dengan harga awal dan estimasi waktu yang jelas.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Cari layanan..."
                  className="h-12 w-full rounded-2xl border border-indigo-100 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 sm:w-60"
                />
              </label>
              <label className="relative">
                <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="h-12 w-full appearance-none rounded-2xl border border-indigo-100 bg-white pl-11 pr-9 text-sm outline-none focus:border-indigo-500 sm:w-44"
                >
                  {['Semua', 'Mobil', 'Motor', 'Perawatan', 'Elektrikal'].map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredServices.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.name} className="group rounded-[26px] border border-indigo-100 bg-white p-6 shadow-[0_14px_50px_rgba(79,70,229,0.07)] transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_20px_60px_rgba(79,70,229,0.14)]">
                  <div className="flex items-start justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 text-xl text-indigo-700">
                      <Icon />
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">{service.category}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-black">{service.name}</h3>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">{service.description}</p>
                  <div className="mt-5 flex items-center gap-4 text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-2"><FaClock className="text-indigo-500" /> {service.duration}</span>
                    <span className="flex items-center gap-2"><FaShieldAlt className="text-indigo-500" /> Bergaransi</span>
                  </div>
                  <div className="mt-6 flex items-end justify-between border-t border-slate-100 pt-5">
                    <div>
                      <p className="text-xs text-slate-400">Mulai dari</p>
                      <p className="text-lg font-black text-indigo-700">{formatPrice(service.price)}</p>
                    </div>
                    <button type="button" onClick={() => openBooking(service.name)} className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white transition group-hover:bg-violet-600">
                      <FaArrowRight />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="products" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-indigo-600">Produk Pilihan</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Sparepart berkualitas dan terjamin</h2>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <article key={product.name} className="overflow-hidden rounded-[24px] border border-indigo-100 bg-[#fafaff]">
                  <div className={`flex h-44 items-center justify-center bg-gradient-to-br ${product.accent}`}>
                    <FaTools className="text-6xl text-white/90 drop-shadow-lg" />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-500">{product.category}</p>
                    <h3 className="mt-2 font-black">{product.name}</h3>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="font-black text-indigo-700">{formatPrice(product.price)}</p>
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-700">Stok {product.stock}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="reviews" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-indigo-600">Cerita Pelanggan</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Dipercaya untuk menjaga perjalanan tetap nyaman.</h2>
              <p className="mt-4 leading-7 text-slate-500">Kami membangun pengalaman bengkel yang transparan, ramah, dan mudah dipahami setiap pelanggan.</p>
              <div className="mt-7 inline-flex items-center gap-4 rounded-2xl bg-indigo-600 px-5 py-4 text-white">
                <span className="text-3xl font-black">4.9</span>
                <span>
                  <span className="flex gap-1 text-amber-300">{[1, 2, 3, 4, 5].map((item) => <FaStar key={item} />)}</span>
                  <span className="mt-1 block text-xs text-indigo-100">Dari 1.250+ ulasan</span>
                </span>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <article key={testimonial.name} className="rounded-[24px] border border-indigo-100 bg-white p-5 shadow-[0_14px_45px_rgba(79,70,229,0.08)]">
                  <div className="flex gap-1 text-sm text-amber-400">
                    {Array.from({ length: testimonial.rating }, (_, index) => <FaStar key={index} />)}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">"{testimonial.text}"</p>
                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-xs text-slate-400">{testimonial.vehicle}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
          <div className="overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#312e81,#6d28d9)] px-6 py-12 text-white sm:px-12 lg:flex lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-violet-200">Siap merawat kendaraan?</p>
              <h2 className="mt-3 text-3xl font-black">Booking hari ini, berkendara lebih tenang besok.</h2>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-indigo-100">
                <span className="flex items-center gap-2"><FaMapMarkerAlt /> Cabang Jakarta</span>
                <span className="flex items-center gap-2"><FaPhoneAlt /> +62 812-3456-7890</span>
              </div>
            </div>
            <button type="button" onClick={() => openBooking()} className="mt-7 inline-flex h-14 items-center gap-3 rounded-2xl bg-white px-7 font-bold text-indigo-700 shadow-xl lg:mt-0">
              Pilih Jadwal <FaArrowRight />
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-indigo-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-slate-500 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 font-bold text-slate-800"><FaWrench className="text-indigo-600" /> BengkelPro</div>
          <p>Perawatan modern untuk mobil dan motor Anda.</p>
          <p>© 2026 BengkelPro</p>
        </div>
      </footer>

      {bookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-[28px] bg-white shadow-2xl">
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-5 text-white">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-indigo-100">Reservasi Guest</p>
                <h2 className="mt-1 text-xl font-black">Booking Service</h2>
              </div>
              <button type="button" onClick={() => setBookingOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20">
                <FaTimes />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="p-8 text-center">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-2xl text-indigo-600">
                  <FaCheck />
                </span>
                <h3 className="mt-5 text-2xl font-black">Booking berhasil dikirim</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">Tim BengkelPro akan menghubungi Anda untuk mengonfirmasi jadwal.</p>
                <button type="button" onClick={() => setBookingOpen(false)} className="mt-6 w-full rounded-xl bg-indigo-600 py-3 font-bold text-white">
                  Selesai
                </button>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="grid gap-4 p-6 sm:grid-cols-2">
                <label className="sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-600">Nama Lengkap</span>
                  <input required placeholder="Nama Anda" className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" />
                </label>
                <label>
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-600">Nomor WhatsApp</span>
                  <input required placeholder="08xxxxxxxxxx" className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" />
                </label>
                <label>
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-600">Kendaraan</span>
                  <select required className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 outline-none focus:border-indigo-500">
                    <option value="">Pilih kendaraan</option>
                    <option>Mobil</option>
                    <option>Motor</option>
                  </select>
                </label>
                <label className="sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-600">Layanan</span>
                  <select value={selectedService} onChange={(event) => setSelectedService(event.target.value)} required className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 outline-none focus:border-indigo-500">
                    <option value="">Pilih layanan</option>
                    {services.map((service) => <option key={service.name}>{service.name}</option>)}
                  </select>
                </label>
                <label>
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-600">Tanggal</span>
                  <input required type="date" className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-indigo-500" />
                </label>
                <label>
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-600">Jam</span>
                  <input required type="time" className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-indigo-500" />
                </label>
                <button type="submit" className="mt-2 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 font-bold text-white shadow-lg shadow-indigo-500/20 sm:col-span-2">
                  Kirim Booking
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestHome;
