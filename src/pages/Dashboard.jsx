import React, { useState } from 'react';
import {
  FaBell,
  FaChartLine,
  FaCheckCircle,
  FaClock,
  FaCarSide,
  FaTools,
  FaWallet,
} from 'react-icons/fa';

import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import { motion } from 'framer-motion';

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
  {
    icon: FaTools,
    label: 'Service Aktif',
    value: '36',
    note: '+8 dari kemarin',
    gradient: 'linear-gradient(135deg, #5353e2 0%, #7c83ff 100%)',
    tone: 'bg-[#5353e2]',
  },
  {
    icon: FaCarSide,
    label: 'Kendaraan Masuk',
    value: '128',
    note: 'Mei 2026',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #22c55e 100%)',
    tone: 'bg-[#0ea5e9]',
  },
  {
    icon: FaCheckCircle,
    label: 'Selesai',
    value: '92',
    note: 'Siap diambil',
    gradient: 'linear-gradient(135deg, #16a34a 0%, #86efac 100%)',
    tone: 'bg-[#16a34a]',
  },
  {
    icon: FaWallet,
    label: 'Pendapatan',
    value: 'Rp 48,7 jt',
    note: 'Bulan berjalan',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #facc15 100%)',
    tone: 'bg-[#f59e0b]',
  },
];

const activities = [
  {
    name: 'Rafi Hidayat',
    detail: 'Avanza B 1209 TQ selesai spooring',
    time: '5 menit lalu',
    badge: 'Selesai',
  },
  {
    name: 'Citra Lestari',
    detail: 'Beat D 7781 FI menunggu part',
    time: '18 menit lalu',
    badge: 'Pending',
  },
  {
    name: 'Yoga Pratama',
    detail: 'Booking tune up terkonfirmasi',
    time: '40 menit lalu',
    badge: 'Confirmed',
  },
  {
    name: 'Maya Putri',
    detail: 'Estimasi kelistrikan sudah dikirim',
    time: '1 jam lalu',
    badge: 'Info',
  },
];

const alerts = [
  {
    tone: 'primary',
    label: 'New invoice awaiting approval',
    detail: '2 invoice service perlu verifikasi',
  },
  {
    tone: 'warning',
    label: 'Low completion rate detected',
    detail: 'Tiga service tertahan lebih lama dari target',
  },
  {
    tone: 'success',
    label: 'Monthly revenue target achieved',
    detail: 'Target omzet bulanan sudah terlampaui',
  },
];

const activityBadgeVariant = {
  Selesai: 'success',
  Pending: 'warning',
  Confirmed: 'primary',
  Info: 'secondary',
};

const Dashboard = () => {
  const [activeMonth, setActiveMonth] = useState('Mei');

  return (
    <div className="space-y-6">
      {/* Stats Cards Grid */}
      <section className="grid gap-5 xl:grid-cols-4">
        {metrics.map((metric, index) => (
          <StatCard
            key={metric.label}
            icon={metric.icon}
            label={metric.label}
            value={metric.value}
            note={metric.note}
            gradient={metric.gradient}
            tone={metric.tone}
            delay={index * 0.1}
          />
        ))}
      </section>

      {/* Main Charts and Activity */}
      <section className="grid gap-5 xl:grid-cols-[1.45fr_0.9fr]">
        {/* Performance Chart */}
        <Card
          title="Performa Bengkel"
          subtitle={`Analisis service bulan ${activeMonth}`}
          icon={FaChartLine}
          action={
            <select
              value={activeMonth}
              onChange={(event) => setActiveMonth(event.target.value)}
              className="rounded-full border border-[#dbe3ef] bg-[#f8fafc] px-4 py-2 text-sm text-[#0f172a] outline-none transition hover:border-[#5353e2]"
            >
              {months.map((month) => (
                <option key={month}>{month}</option>
              ))}
            </select>
          }
        >
          <div className="space-y-4">
            <div className="rounded-[18px] border border-[#dbe3ef] bg-[#f8fafc] p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#0f172a]">
                    Business Performance
                  </p>
                  <p className="text-xs text-[#5b6478]">Service masuk vs selesai</p>
                </div>
                <Badge variant="secondary" size="sm">
                  Monthly
                </Badge>
              </div>

              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="h-56 w-full">
                <defs>
                  <linearGradient id="currentTrend" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#667eea" stopOpacity="0.38" />
                    <stop offset="100%" stopColor="#667eea" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="previousTrend" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[1, 2, 3, 4].map((line) => (
                  <line
                    key={line}
                    x1="0"
                    x2={chartWidth}
                    y1={line * 38}
                    y2={line * 38}
                    stroke="#dbe3ef"
                    strokeDasharray="4 6"
                  />
                ))}
                <polyline
                  points={`0,${chartHeight} ${currentPoints} ${chartWidth},${chartHeight}`}
                  fill="url(#currentTrend)"
                  stroke="none"
                />
                <polyline
                  points={currentPoints}
                  fill="none"
                  stroke="#667eea"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points={`0,${chartHeight} ${previousPoints} ${chartWidth},${chartHeight}`}
                  fill="url(#previousTrend)"
                  stroke="none"
                />
                <polyline
                  points={previousPoints}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="7 7"
                />
              </svg>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: 'Antrian', value: '14 unit', icon: FaClock, progress: 38 },
                { label: 'Selesai', value: '92 unit', icon: FaCheckCircle, progress: 85 },
                { label: 'Pending', value: '22 unit', icon: FaBell, progress: 55 },
              ].map((stat) => (
                <div key={stat.label} className="rounded-[16px] border border-[#eef2f8] bg-[#f8fafc] p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-[#5b6478]">
                      {stat.label}
                    </p>
                    <stat.icon className="text-[#5353e2]" />
                  </div>
                  <p className="text-sm font-bold text-[#0f172a]">{stat.value}</p>
                  <ProgressBar
                    value={stat.progress}
                    max={100}
                    variant="primary"
                    size="sm"
                    className="mt-2"
                  />
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Activity Sidebar */}
        <Card title="Aktivitas Terbaru" icon={FaBell}>
          <div className="space-y-3">
            {activities.map((activity, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer rounded-[16px] border border-[#dbe3ef] bg-[#f8fafc] p-3 transition-all hover:border-[#c7d2e4] hover:bg-white hover:shadow-[0_8px_20px_rgba(15,23,42,0.06)]"
              >
                <div className="flex items-start justify-between mb-1">
                  <p className="text-sm font-semibold text-[#0f172a] transition group-hover:text-[#5353e2]">
                    {activity.name}
                  </p>
                  <Badge variant={activityBadgeVariant[activity.badge] || 'primary'} size="sm">
                    {activity.badge}
                  </Badge>
                </div>
                <p className="mb-2 text-xs text-[#5b6478]">{activity.detail}</p>
                <p className="text-xs text-[#778096]">{activity.time}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </section>

      {/* Alerts Section */}
      <section className="grid gap-4">
        <h3 className="text-lg font-semibold text-[#0f172a]">Notifikasi Penting</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {alerts.map((alert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`rounded-[16px] border-l-4 p-4 ${
                alert.tone === 'primary'
                  ? 'border-l-[#5353e2] bg-[#eef0ff]'
                  : alert.tone === 'warning'
                    ? 'border-l-[#f59e0b] bg-[#fff7df]'
                    : 'border-l-[#16a34a] bg-[#e9f8ef]'
              }`}
            >
              <p className="mb-1 text-sm font-semibold text-[#0f172a]">
                {alert.label}
              </p>
              <p className="text-xs text-[#5b6478]">{alert.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
