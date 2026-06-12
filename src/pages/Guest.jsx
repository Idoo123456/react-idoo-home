import React, { useMemo, useState } from 'react';
import {
  FaBullhorn,
  FaCheck,
  FaClock,
  FaEnvelope,
  FaPhoneAlt,
  FaSearch,
  FaUserCheck,
  FaUserClock,
  FaUserPlus,
  FaUsers,
} from 'react-icons/fa';

const initialGuests = [
  { id: 'GST-001', name: 'Alif Ramadhan', phone: '+62 812 4512 3001', email: 'alif@email.com', source: 'Instagram', interest: 'Tune Up', visit: '12 Juni 2026', status: 'Baru' },
  { id: 'GST-002', name: 'Nadia Aulia', phone: '+62 812 4512 3002', email: 'nadia@email.com', source: 'Google Ads', interest: 'Ganti Oli', visit: '12 Juni 2026', status: 'Follow Up' },
  { id: 'GST-003', name: 'Kevin Wijaya', phone: '+62 812 4512 3003', email: 'kevin@email.com', source: 'Walk-in', interest: 'Perbaikan AC', visit: '11 Juni 2026', status: 'Baru' },
  { id: 'GST-004', name: 'Putri Maharani', phone: '+62 812 4512 3004', email: 'putri@email.com', source: 'Referral', interest: 'Service Berkala', visit: '10 Juni 2026', status: 'Follow Up' },
  { id: 'GST-005', name: 'Rizky Akbar', phone: '+62 812 4512 3005', email: 'rizky@email.com', source: 'TikTok', interest: 'Kaki-kaki', visit: '9 Juni 2026', status: 'Baru' },
  { id: 'GST-006', name: 'Dinda Permata', phone: '+62 812 4512 3006', email: 'dinda@email.com', source: 'Instagram', interest: 'Ganti Ban', visit: '8 Juni 2026', status: 'Menjadi Member' },
];

const statusStyles = {
  Baru: 'bg-indigo-100 text-indigo-700',
  'Follow Up': 'bg-amber-100 text-amber-700',
  'Menjadi Member': 'bg-emerald-100 text-emerald-700',
};

const Guest = () => {
  const [guests, setGuests] = useState(initialGuests);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('Semua');

  const filteredGuests = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return guests.filter((guest) => {
      const matchesStatus = status === 'Semua' || guest.status === status;
      const matchesQuery =
        !normalizedQuery ||
        [guest.name, guest.email, guest.phone, guest.source, guest.interest]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [guests, query, status]);

  const convertGuest = (guestId) => {
    setGuests((current) =>
      current.map((guest) =>
        guest.id === guestId ? { ...guest, status: 'Menjadi Member' } : guest
      )
    );
  };

  const stats = [
    { label: 'Total Guest', value: guests.length, icon: FaUsers, tone: 'bg-indigo-100 text-indigo-600' },
    { label: 'Guest Baru', value: guests.filter((guest) => guest.status === 'Baru').length, icon: FaUserClock, tone: 'bg-violet-100 text-violet-600' },
    { label: 'Perlu Follow Up', value: guests.filter((guest) => guest.status === 'Follow Up').length, icon: FaClock, tone: 'bg-amber-100 text-amber-600' },
    { label: 'Terkonversi', value: guests.filter((guest) => guest.status === 'Menjadi Member').length, icon: FaUserCheck, tone: 'bg-emerald-100 text-emerald-600' },
  ];

  return (
    <div className="space-y-6">
      <section className="panel overflow-hidden rounded-[28px]">
        <div className="bg-[linear-gradient(135deg,#4338ca_0%,#6d5dfc_52%,#9333ea_100%)] p-6 text-white sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-xl backdrop-blur">
                <FaUserPlus />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-100">Guest Management</p>
              <h2 className="mt-2 text-3xl font-semibold">Calon Pelanggan Bengkel</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-violet-100">
                Kelola pengunjung, sumber promosi, minat layanan, dan proses konversi menjadi member.
              </p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-violet-100">Conversion rate</p>
              <p className="mt-1 text-3xl font-semibold">
                {Math.round((guests.filter((guest) => guest.status === 'Menjadi Member').length / guests.length) * 100)}%
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article key={stat.label} className="panel rounded-[22px] p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-soft)]">{stat.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-[var(--text)]">{stat.value}</p>
                </div>
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.tone}`}>
                  <Icon />
                </span>
              </div>
            </article>
          );
        })}
      </section>

      <section className="panel overflow-hidden rounded-[24px]">
        <div className="flex flex-col gap-4 border-b border-[var(--border)] p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">Database Guest</p>
            <h3 className="mt-1 text-xl font-semibold text-[var(--text)]">Pengunjung dan Prospek</h3>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari guest..."
                className="input-shell h-11 w-full rounded-2xl pl-11 pr-4 text-sm outline-none sm:w-64"
              />
            </label>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="input-shell h-11 rounded-2xl px-4 text-sm outline-none"
            >
              {['Semua', 'Baru', 'Follow Up', 'Menjadi Member'].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1080px] text-left text-sm">
            <thead className="bg-[var(--surface-2)] text-xs uppercase tracking-[0.12em] text-[var(--text-soft)]">
              <tr>
                {['Guest', 'Kontak', 'Sumber', 'Minat Layanan', 'Kunjungan', 'Status', 'Aksi'].map((header) => (
                  <th key={header} className="px-5 py-3 font-semibold">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] bg-[var(--surface)]">
              {filteredGuests.map((guest) => (
                <tr key={guest.id} className="transition hover:bg-[var(--surface-2)]">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 font-semibold text-violet-700">
                        {guest.name.split(' ').map((word) => word[0]).join('').slice(0, 2)}
                      </span>
                      <div>
                        <p className="font-semibold text-[var(--text)]">{guest.name}</p>
                        <p className="text-xs text-[var(--text-soft)]">{guest.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[var(--text-muted)]">
                    <p className="flex items-center gap-2"><FaPhoneAlt className="text-[var(--primary)]" /> {guest.phone}</p>
                    <p className="mt-1 flex items-center gap-2"><FaEnvelope className="text-violet-500" /> {guest.email}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-2 rounded-xl bg-[var(--surface-2)] px-3 py-2 text-[var(--text-muted)]">
                      <FaBullhorn className="text-[var(--primary)]" /> {guest.source}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-medium text-[var(--text)]">{guest.interest}</td>
                  <td className="px-5 py-4 text-[var(--text-muted)]">{guest.visit}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[guest.status]}`}>
                      {guest.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {guest.status === 'Menjadi Member' ? (
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600">
                        <FaCheck /> Selesai
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => convertGuest(guest.id)}
                        className="btn-primary inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm"
                      >
                        <FaUserPlus /> Jadikan Member
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredGuests.length === 0 && (
          <div className="px-6 py-12 text-center text-sm text-[var(--text-muted)]">
            Guest yang dicari tidak ditemukan.
          </div>
        )}
      </section>
    </div>
  );
};

export default Guest;
