import React, { useState } from 'react';
import {
  FaBell,
  FaChartLine,
  FaCheckCircle,
  FaClock,
  FaCarSide,
  FaChevronRight,
  FaTools,
  FaUsers,
  FaWallet,
} from 'react-icons/fa';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt'];

const currentSeries = [30, 42, 36, 55, 48, 64, 39, 58, 45, 67];
const previousSeries = [24, 33, 29, 38, 34, 40, 31, 37, 33, 41];
const chartWidth = 620;
const chartHeight = 190;
const chartStep = chartWidth / (currentSeries.length - 1);
const currentPoints = currentSeries
  .map((value, index) => `${index * chartStep},${chartHeight - value * 2.2}`)
  .join(' ');
const previousPoints = previousSeries
  .map((value, index) => `${index * chartStep},${chartHeight - value * 2.2}`)
  .join(' ');

const metrics = [
  { icon: FaTools, label: 'Service Aktif', value: '36', note: '+8 dari kemarin', tone: 'text-[var(--primary)] bg-[color-mix(in_srgb,var(--primary)_12%,transparent)]' },
  { icon: FaCarSide, label: 'Kendaraan Masuk', value: '128', note: 'Mei 2026', tone: 'text-[var(--danger)] bg-[color-mix(in_srgb,var(--danger)_12%,transparent)]' },
  { icon: FaCheckCircle, label: 'Selesai', value: '92', note: 'Siap diambil', tone: 'text-[var(--success)] bg-[color-mix(in_srgb,var(--success)_12%,transparent)]' },
  { icon: FaWallet, label: 'Pendapatan', value: 'Rp 48,7 jt', note: 'Bulan berjalan', tone: 'text-[var(--secondary)] bg-[color-mix(in_srgb,var(--secondary)_10%,transparent)]' },
];

const activities = [
  { name: 'Rafi Hidayat', detail: 'Avanza B 1209 TQ selesai spooring', time: '5 menit lalu' },
  { name: 'Citra Lestari', detail: 'Beat D 7781 FI menunggu part', time: '18 menit lalu' },
  { name: 'Yoga Pratama', detail: 'Booking tune up terkonfirmasi', time: '40 menit lalu' },
  { name: 'Maya Putri', detail: 'Estimasi kelistrikan sudah dikirim', time: '1 jam lalu' },
];

const alerts = [
  { tone: 'bg-[color-mix(in_srgb,var(--primary)_11%,transparent)]', label: 'New invoice awaiting approval', detail: '2 invoice service perlu verifikasi' },
  { tone: 'bg-[color-mix(in_srgb,var(--warning)_15%,transparent)]', label: 'Low completion rate detected', detail: 'Tiga service tertahan lebih lama dari target' },
  { tone: 'bg-[color-mix(in_srgb,var(--success)_12%,transparent)]', label: 'Monthly revenue target achieved', detail: 'Target omzet bulanan sudah terlampaui' },
];

const Dashboard = () => {
  const [activeMonth, setActiveMonth] = useState('Mei');

  return (
    <div className="space-y-5">
      <section className="grid gap-4 xl:grid-cols-4">
        {metrics.map((metric) => (
          <button
            key={metric.label}
            type="button"
            className="panel flex items-start justify-between rounded-[22px] p-5 text-left transition hover:-translate-y-0.5"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">{metric.label}</p>
              <p className="mt-2 text-2xl font-semibold text-[var(--text)]">{metric.value}</p>
              <p className="mt-1 text-xs text-[var(--text-muted)]">{metric.note}</p>
            </div>
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${metric.tone}`}>
              <metric.icon />
            </div>
          </button>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.45fr_0.9fr]">
        <div className="panel rounded-[24px] p-5">
          <div className="flex flex-col gap-4 border-b border-[var(--border)] pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--primary)]">Home Dashboard</p>
              <h2 className="mt-1 text-2xl font-semibold text-[var(--text)]">Performa bengkel bulan {activeMonth}</h2>
            </div>
            <select
              value={activeMonth}
              onChange={(event) => setActiveMonth(event.target.value)}
              className="input-shell rounded-full px-4 py-2 text-sm outline-none"
            >
              {months.map((month) => (
                <option key={month}>{month}</option>
              ))}
            </select>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1.35fr_0.85fr]">
            <div className="panel-soft rounded-[22px] p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--text)]">Business performance</p>
                  <p className="text-xs text-[var(--text-muted)]">Service masuk vs selesai</p>
                </div>
                <span className="rounded-full bg-[var(--surface)] px-3 py-1 text-xs text-[var(--text-muted)]">
                  Monthly
                </span>
              </div>

              <div className="relative overflow-hidden rounded-[20px] border border-[var(--border)] bg-[linear-gradient(180deg,var(--surface)_0%,var(--surface-2)_100%)] p-3">
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="h-56 w-full">
                  <defs>
                    <linearGradient id="currentTrend" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.38" />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="previousTrend" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--warning)" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="var(--warning)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[1, 2, 3, 4].map((line) => (
                    <line
                      key={line}
                      x1="0"
                      x2={chartWidth}
                      y1={line * 38}
                      y2={line * 38}
                      stroke="var(--border)"
                      strokeDasharray="4 6"
                    />
                  ))}
                  <polyline points={`0,${chartHeight} ${currentPoints} ${chartWidth},${chartHeight}`} fill="url(#currentTrend)" stroke="none" />
                  <polyline
                    points={currentPoints}
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline points={`0,${chartHeight} ${previousPoints} ${chartWidth},${chartHeight}`} fill="url(#previousTrend)" stroke="none" />
                  <polyline
                    points={previousPoints}
                    fill="none"
                    stroke="var(--warning)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="7 7"
                  />
                </svg>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  ['Antrian', '14 unit'],
                  ['Selesai', '92 unit'],
                  ['Pendapatan', 'Rp 48,7 jt'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[18px] border border-[var(--border)] bg-[var(--surface)] p-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">{label}</p>
                    <p className="mt-2 text-lg font-semibold text-[var(--text)]">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="panel rounded-[22px] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[var(--text)]">Recent Activity</p>
                    <p className="text-xs text-[var(--text-muted)]">Update real-time hari ini</p>
                  </div>
                  <FaBell className="text-[var(--primary)]" />
                </div>

                <div className="mt-4 space-y-3">
                  {activities.map((item) => (
                    <button
                      key={`${item.name}-${item.time}`}
                      type="button"
                      className="flex w-full items-start gap-3 rounded-[16px] border border-[var(--border)] bg-[var(--surface-2)] p-3 text-left transition hover:border-[var(--primary)]"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-semibold text-white">
                        {item.name
                          .split(' ')
                          .map((word) => word[0])
                          .join('')
                          .slice(0, 2)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm text-[var(--text)]">{item.name}</p>
                        <p className="text-xs text-[var(--text-muted)]">{item.detail}</p>
                        <p className="mt-1 text-[11px] text-[var(--text-soft)]">{item.time}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="panel rounded-[22px] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[var(--text)]">Platform scale</p>
                    <p className="text-xs text-[var(--text-muted)]">Ringkas, cepat, dan stabil</p>
                  </div>
                  <FaUsers className="text-[var(--primary)]" />
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[18px] bg-[var(--surface-2)] p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">Kendaraan aktif</p>
                    <p className="mt-2 text-2xl font-semibold text-[var(--text)]">128</p>
                  </div>
                  <div className="rounded-[18px] bg-[var(--surface-2)] p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">Customer loyal</p>
                    <p className="mt-2 text-2xl font-semibold text-[var(--text)]">74</p>
                  </div>
                </div>
                <button type="button" className="mt-4 flex w-full items-center justify-between rounded-[18px] bg-[var(--primary)] px-4 py-3 text-sm text-white">
                  <span>Lihat insight detail</span>
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="panel rounded-[24px] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--primary)]">Key metric</p>
            <h3 className="mt-2 text-xl font-semibold text-[var(--text)]">Average completion rate</h3>
            <div className="mt-5 flex items-center gap-5">
              <div className="relative h-32 w-32">
                <div className="absolute inset-0 rounded-full border-[14px] border-[var(--surface-3)]" />
                <div
                  className="absolute inset-0 rounded-full border-[14px] border-[var(--primary)]"
                  style={{ clipPath: 'inset(0 0 0 34%)' }}
                />
                <div
                  className="absolute inset-3 rounded-full border-[14px] border-[var(--warning)]"
                  style={{ clipPath: 'inset(22% 0 0 0)' }}
                />
              </div>
              <div>
                <p className="text-4xl font-semibold text-[var(--text)]">68.4%</p>
                <p className="mt-2 text-sm text-[var(--text-muted)]">+5.2% from target</p>
                <div className="mt-4 space-y-2 text-sm text-[var(--text-muted)]">
                  <div className="flex items-center justify-between gap-3">
                    <span>Active learners</span>
                    <span className="text-[var(--text)]">1,923</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>At-risk learners</span>
                    <span className="text-[var(--text)]">308</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="panel rounded-[24px] p-5">
            <p className="text-sm font-medium text-[var(--text)]">Important Alerts</p>
            <div className="mt-4 space-y-3">
              {alerts.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={`w-full rounded-[18px] border border-[var(--border)] p-3 text-left ${item.tone}`}
                >
                  <p className="text-sm text-[var(--text)]">{item.label}</p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">{item.detail}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="panel rounded-[24px] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--text)]">Filter Top Performance</p>
              <p className="text-xs text-[var(--text-muted)]">Layanan paling laku minggu ini</p>
            </div>
            <FaChartLine className="text-[var(--primary)]" />
          </div>

          <div className="mt-4 space-y-4">
            {[
              ['Ganti Oli', 92],
              ['Tune Up', 78],
              ['Rem', 54],
              ['Spooring', 43],
            ].map(([name, percent]) => (
              <div key={name}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-[var(--text)]">{name}</span>
                  <span className="text-[var(--text-muted)]">{percent}%</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--surface-3)]">
                  <div className="h-full rounded-full bg-[var(--primary)]" style={{ width: `${percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel rounded-[24px] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--text)]">Business performance</p>
              <p className="text-xs text-[var(--text-muted)]">Revenue, queue, dan service completion</p>
            </div>
            <FaClock className="text-[var(--primary)]" />
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              ['Waktu tunggu', '18 mnt'],
              ['Service selesai', '92%'],
              ['Repeat order', '41%'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[18px] bg-[var(--surface-2)] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">{label}</p>
                <p className="mt-2 text-lg font-semibold text-[var(--text)]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
