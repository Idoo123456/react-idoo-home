import React, { useMemo, useState } from 'react';
import {
  FaChartBar,
  FaChartLine,
  FaDownload,
  FaFilter,
  FaStar,
  FaTools,
  FaWallet,
} from 'react-icons/fa';

const trend = [38, 52, 44, 68, 61, 82, 73, 96, 74, 88, 92, 104];
const revenue = [18, 24, 20, 31, 29, 38, 35, 45, 34, 42, 44, 49];
const dailyJobs = [42, 58, 51, 69, 74, 88, 64, 79, 92, 67, 84, 96, 73, 81, 90, 76];
const heat = [55, 68, 82, 90, 76, 58, 44, 63, 79, 94, 88, 70, 60, 48, 36];
const services = [
  ['Ganti Oli', 92, 'Rp 14,2 jt', '248 job', '#5353e2'],
  ['Tune Up', 78, 'Rp 18,8 jt', '116 job', '#16a34a'],
  ['Rem & Kaki-kaki', 64, 'Rp 9,6 jt', '83 job', '#f59e0b'],
  ['Kelistrikan', 51, 'Rp 7,4 jt', '58 job', '#ef4444'],
  ['Spooring', 43, 'Rp 4,9 jt', '44 job', '#64748b'],
];

const buildPoints = (values, width, height, padding = 18) => {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const step = (width - padding * 2) / (values.length - 1);

  return values
    .map((value, index) => {
      const ratio = (value - min) / Math.max(1, max - min);
      const x = padding + step * index;
      const y = height - padding - ratio * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(' ');
};

const Analytics = () => {
  const [range, setRange] = useState('Mingguan');
  const maxDaily = Math.max(...dailyJobs);
  const trendPoints = useMemo(() => buildPoints(trend, 720, 250), []);
  const revenuePoints = useMemo(() => buildPoints(revenue, 720, 250), []);
  const areaPath = `18,232 ${trendPoints} 702,232`;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#5353e2]">Laporan Bengkel</p>
          <h2 className="text-2xl font-semibold text-[#0f172a]">Grafik Performa Modern</h2>
        </div>
        <div className="flex gap-2">
          <select
            value={range}
            onChange={(event) => setRange(event.target.value)}
            className="rounded-2xl border border-[#d7deea] bg-white px-4 py-2 text-sm outline-none"
          >
            <option>Harian</option>
            <option>Mingguan</option>
            <option>Bulanan</option>
          </select>
          <button
            type="button"
            onClick={() => alert(`Laporan ${range} diunduh.`)}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#5353e2] px-4 py-2 text-sm text-white"
          >
            <FaDownload /> Export
          </button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {[
          [FaWallet, 'Omzet', 'Rp 48,7 jt', '+18%'],
          [FaTools, 'Service', '214 job', '+26 job'],
          [FaStar, 'Rating', '4.8/5', '+0.2'],
          [FaChartLine, 'Profit', 'Rp 19,4 jt', '+11%'],
        ].map(([Icon, label, value, note]) => (
          <button
            key={label}
            type="button"
            className="rounded-[20px] border border-[#d7deea] bg-white p-4 text-left shadow-[0_2px_8px_rgba(15,23,42,0.05)]"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#eef0ff] text-[#5353e2]">
                <Icon />
              </div>
              <span className="rounded-full bg-[#e9f8ef] px-2 py-1 text-[11px] text-[#16a34a]">{note}</span>
            </div>
            <p className="mt-3 text-xs text-[#778096]">{label}</p>
            <p className="mt-1 text-xl font-semibold text-[#0f172a]">{value}</p>
          </button>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.9fr]">
        <section className="rounded-[24px] border border-[#d7deea] bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[#0f172a]">Tren Service & Omzet</h3>
              <p className="text-xs text-[#778096]">Area service dibanding garis omzet.</p>
            </div>
            <button
              type="button"
              onClick={() => alert('Filter laporan dibuka.')}
              className="inline-flex items-center gap-2 rounded-2xl border border-[#d7deea] px-3 py-2 text-xs text-[#5b6478]"
            >
              <FaFilter /> Filter
            </button>
          </div>

          <div className="overflow-hidden rounded-[20px] border border-[#e5e7eb] bg-[#f8fafc]">
            <div className="overflow-x-auto">
              <svg viewBox="0 0 720 250" className="h-[260px] min-w-[760px]">
                <defs>
                  <linearGradient id="serviceArea" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#5353e2" stopOpacity="0.34" />
                    <stop offset="100%" stopColor="#5353e2" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                {[1, 2, 3, 4].map((line) => (
                  <line
                    key={line}
                    x1="18"
                    x2="702"
                    y1={line * 48}
                    y2={line * 48}
                    stroke="#d7deea"
                    strokeDasharray="5 7"
                  />
                ))}
                <polyline points={areaPath} fill="url(#serviceArea)" stroke="none" />
                <polyline
                  points={trendPoints}
                  fill="none"
                  stroke="#5353e2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="5"
                />
                <polyline
                  points={revenuePoints}
                  fill="none"
                  stroke="#f59e0b"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  strokeDasharray="8 8"
                />
                {trend.map((_, index) => (
                  <text key={index} x={18 + index * 62} y="238" fill="#778096" fontSize="11">
                    P{index + 1}
                  </text>
                ))}
              </svg>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-[#eef0ff] px-3 py-1 text-[#5353e2]">Service masuk</span>
            <span className="rounded-full bg-[#fff7df] px-3 py-1 text-[#b7791f]">Omzet</span>
            <span className="rounded-full bg-[#eef2f8] px-3 py-1 text-[#5b6478]">Bisa digeser horizontal</span>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
          <div className="rounded-[24px] border border-[#d7deea] bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#0f172a]">Komposisi Status</h3>
              <FaChartBar className="text-[#5353e2]" />
            </div>
            <div className="mt-4 flex items-center gap-5">
              <div className="relative h-32 w-32 shrink-0 rounded-full bg-[conic-gradient(#5353e2_0_56%,#16a34a_56%_78%,#f59e0b_78%_91%,#ef4444_91%_100%)]">
                <div className="absolute inset-5 rounded-full bg-white" />
                <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-[#0f172a]">214</div>
              </div>
              <div className="space-y-2 text-sm">
                {[
                  ['Proses', '56%', '#5353e2'],
                  ['Selesai', '22%', '#16a34a'],
                  ['Menunggu', '13%', '#f59e0b'],
                  ['Batal', '9%', '#ef4444'],
                ].map(([label, value, color]) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
                    <span className="min-w-20 text-[#5b6478]">{label}</span>
                    <span className="font-medium text-[#0f172a]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-[#d7deea] bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
            <h3 className="text-lg font-semibold text-[#0f172a]">Jam Ramai</h3>
            <div className="mt-4 grid grid-cols-5 gap-2">
              {heat.map((value, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => alert(`Jam ${8 + index}:00 - traffic ${value}%`)}
                  className="aspect-square rounded-2xl text-[11px] font-medium text-white"
                  style={{
                    backgroundColor: `rgba(83, 83, 226, ${0.28 + value / 140})`,
                  }}
                >
                  {8 + index}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="rounded-[24px] border border-[#d7deea] bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[#0f172a]">Grafik Harian Geser</h3>
            <p className="text-xs text-[#778096]">Bar chart padat, scroll horizontal untuk periode panjang.</p>
          </div>
        </div>
        <div className="overflow-x-auto pb-2">
          <div className="flex h-52 min-w-[940px] items-end gap-3 rounded-[20px] border border-[#e5e7eb] bg-[#f8fafc] px-4 py-4">
            {dailyJobs.map((value, index) => (
              <button
                key={index}
                type="button"
                onClick={() => alert(`Hari ${index + 1}: ${value} service`)}
                className="flex w-12 shrink-0 flex-col items-center justify-end"
                style={{ backgroundColor: 'transparent', border: 0, padding: 0 }}
              >
                <span className="mb-1 text-[10px] text-[#5353e2]">{value}</span>
                <span
                  className="w-full rounded-t-2xl bg-gradient-to-t from-[#5353e2] to-[#8b8bff]"
                  style={{ height: `${(value / maxDaily) * 145}px`, minHeight: 28 }}
                />
                <span className="mt-2 text-[10px] text-[#778096]">H{index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
        <section className="rounded-[24px] border border-[#d7deea] bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
          <h3 className="text-lg font-semibold text-[#0f172a]">Ranking Layanan</h3>
          <div className="mt-4 space-y-3">
            {services.map(([name, percent, serviceRevenue, jobs, color]) => (
              <button
                key={name}
                type="button"
                onClick={() => alert(`${name}: ${jobs}`)}
                className="block w-full rounded-2xl border border-[#e5e7eb] p-3 text-left hover:bg-[#f8fafc]"
              >
                <div className="flex justify-between gap-3 text-sm">
                  <span className="font-medium text-[#0f172a]">{name}</span>
                  <span className="text-[#778096]">{percent}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-[#eef2f8]">
                  <div className="h-full rounded-full" style={{ width: `${percent}%`, backgroundColor: color }} />
                </div>
                <div className="mt-2 flex justify-between text-xs text-[#778096]">
                  <span>{serviceRevenue}</span>
                  <span>{jobs}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-[24px] border border-[#d7deea] bg-white shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
          <div className="border-b border-[#e5e7eb] px-4 py-3">
            <h3 className="text-lg font-semibold text-[#0f172a]">Detail Laporan Service</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead className="bg-[#f8fafc] text-[#5b6478]">
                <tr>
                  {['Layanan', 'Job', 'Omzet', 'Biaya', 'Profit', 'Growth'].map((head) => (
                    <th key={head} className="px-4 py-3 text-left font-medium">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {services.map(([name, percent, serviceRevenue, jobs], index) => (
                  <tr key={name} className="border-t border-[#eef2f8]">
                    <td className="px-4 py-3 font-medium text-[#0f172a]">{name}</td>
                    <td className="px-4 py-3 text-[#5b6478]">{jobs}</td>
                    <td className="px-4 py-3 text-[#0f172a]">{serviceRevenue}</td>
                    <td className="px-4 py-3 text-[#5b6478]">Rp {(index + 3) * 1.4} jt</td>
                    <td className="px-4 py-3 text-[#0f172a]">Rp {(index + 2) * 1.9} jt</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-[#e9f8ef] px-2 py-1 text-xs text-[#16a34a]">
                        +{Math.max(6, percent - 42)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Analytics;
