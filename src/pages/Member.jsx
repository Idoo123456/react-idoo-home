import React, { useMemo, useState } from 'react';
import {
  FaCalendarCheck,
  FaCrown,
  FaEnvelope,
  FaGift,
  FaMedal,
  FaPhoneAlt,
  FaSearch,
  FaStar,
  FaUsers,
} from 'react-icons/fa';
import mockData from '../data/mockData.json';

const getLevel = (points) => {
  if (points >= 2000) return 'Gold';
  if (points >= 700) return 'Silver';
  return 'Bronze';
};

const levelStyles = {
  Gold: 'bg-amber-100 text-amber-700',
  Silver: 'bg-slate-200 text-slate-700',
  Bronze: 'bg-orange-100 text-orange-700',
};

const members = mockData.pelanggan.map((member) => ({
  ...member,
  level: getLevel(member.loyaltyPoints),
}));

const Member = () => {
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('Semua');

  const filteredMembers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return members.filter((member) => {
      const matchesLevel = level === 'Semua' || member.level === level;
      const matchesQuery =
        !normalizedQuery ||
        [member.name, member.email, member.phone, member.id]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesLevel && matchesQuery;
    });
  }, [level, query]);

  const stats = useMemo(() => {
    const totalPoints = members.reduce((total, member) => total + member.loyaltyPoints, 0);
    const totalBookings = members.reduce((total, member) => total + member.totalBookings, 0);

    return [
      { label: 'Total Member', value: members.length, icon: FaUsers, tone: 'bg-indigo-100 text-indigo-600' },
      { label: 'Member Gold', value: members.filter((member) => member.level === 'Gold').length, icon: FaCrown, tone: 'bg-amber-100 text-amber-600' },
      { label: 'Total Booking', value: totalBookings, icon: FaCalendarCheck, tone: 'bg-violet-100 text-violet-600' },
      { label: 'Poin Terkumpul', value: totalPoints.toLocaleString('id-ID'), icon: FaGift, tone: 'bg-fuchsia-100 text-fuchsia-600' },
    ];
  }, []);

  return (
    <div className="space-y-6">
      <section className="panel overflow-hidden rounded-[28px]">
        <div className="bg-[linear-gradient(135deg,#312e81_0%,#5353e2_55%,#7c3aed_100%)] p-6 text-white sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-xl backdrop-blur">
                <FaMedal />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-100">Loyalty Program</p>
              <h2 className="mt-2 text-3xl font-semibold">Data Member BengkelPro</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-indigo-100">
                Pantau aktivitas, level membership, jumlah booking, dan poin loyalitas pelanggan.
              </p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-indigo-100">Member aktif</p>
              <p className="mt-1 text-3xl font-semibold">{members.length}</p>
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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">Daftar Member</p>
            <h3 className="mt-1 text-xl font-semibold text-[var(--text)]">Pelanggan Terdaftar</h3>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari member..."
                className="input-shell h-11 w-full rounded-2xl pl-11 pr-4 text-sm outline-none sm:w-64"
              />
            </label>
            <select
              value={level}
              onChange={(event) => setLevel(event.target.value)}
              className="input-shell h-11 rounded-2xl px-4 text-sm outline-none"
            >
              {['Semua', 'Gold', 'Silver', 'Bronze'].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="bg-[var(--surface-2)] text-xs uppercase tracking-[0.12em] text-[var(--text-soft)]">
              <tr>
                {['Member', 'Kontak', 'Bergabung', 'Level', 'Booking', 'Poin Loyalty'].map((header) => (
                  <th key={header} className="px-5 py-3 font-semibold">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] bg-[var(--surface)]">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="transition hover:bg-[var(--surface-2)]">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--primary)] font-semibold text-white">
                        {member.name.split(' ').map((word) => word[0]).join('').slice(0, 2)}
                      </span>
                      <div>
                        <p className="font-semibold text-[var(--text)]">{member.name}</p>
                        <p className="text-xs text-[var(--text-soft)]">{member.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[var(--text-muted)]">
                    <p className="flex items-center gap-2"><FaPhoneAlt className="text-[var(--primary)]" /> {member.phone}</p>
                    <p className="mt-1 flex items-center gap-2"><FaEnvelope className="text-violet-500" /> {member.email}</p>
                  </td>
                  <td className="px-5 py-4 text-[var(--text-muted)]">{member.joined}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${levelStyles[member.level]}`}>
                      <FaStar /> {member.level}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-semibold text-[var(--text)]">{member.totalBookings} kali</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-xl bg-indigo-50 px-3 py-2 font-semibold text-indigo-700">
                      {member.loyaltyPoints.toLocaleString('id-ID')} poin
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMembers.length === 0 && (
          <div className="px-6 py-12 text-center text-sm text-[var(--text-muted)]">
            Member yang dicari tidak ditemukan.
          </div>
        )}
      </section>
    </div>
  );
};

export default Member;
