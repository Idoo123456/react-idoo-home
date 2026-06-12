import React, { useMemo, useState } from 'react';
import { FaCarSide, FaEye, FaMotorcycle, FaPlus, FaWrench, FaTimes } from 'react-icons/fa';
import DetailModal from '../components/DetailModal';

const initialVehicles = [
  { plate: 'B 1209 TQ', owner: 'Rafi Hidayat', brand: 'Toyota Avanza', type: 'Mobil', year: 2021, lastService: 'Tune Up', km: 42100, notes: 'Periksa kebocoran oli minor' },
  { plate: 'D 7781 FI', owner: 'Citra Lestari', brand: 'Honda Beat', type: 'Motor', year: 2023, lastService: 'Ganti Oli', km: 9800, notes: 'Rantai perlu pelumasan' },
  { plate: 'AD 4201 NN', owner: 'Yoga Pratama', brand: 'Yamaha NMAX', type: 'Motor', year: 2020, lastService: 'Rem', km: 35800, notes: 'Kampas rem harus diganti segera' },
];

const Kendaraan = () => {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [filter, setFilter] = useState('Semua');
  const [form, setForm] = useState({ plate: '', owner: '', brand: '', type: 'Mobil', year: 2026, lastService: 'Belum ada', km: 0 });
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const filteredVehicles = useMemo(
    () => (filter === 'Semua' ? vehicles : vehicles.filter((vehicle) => vehicle.type === filter)),
    [filter, vehicles]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setVehicles([{ ...form, year: Number(form.year), km: Number(form.km) }, ...vehicles]);
    setForm({ plate: '', owner: '', brand: '', type: 'Mobil', year: 2026, lastService: 'Belum ada', km: 0 });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]">Data Kendaraan</p>
          <h2 className="text-3xl font-semibold text-[var(--text)]">Mobil dan Motor Customer</h2>
        </div>
        <button
          type="button"
          onClick={() => setShowForm((prev) => !prev)}
          className="btn-primary inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm"
        >
          <FaPlus />
          Tambah Kendaraan
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="relative w-full max-w-2xl animate-in fade-in zoom-in duration-300">
            {/* Card dengan gradient background */}
            <div className="rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 p-8 shadow-2xl dark:from-slate-900 dark:to-slate-800">
              
              {/* Header */}
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--primary)]">Tambah Data</p>
                  <h3 className="mt-2 text-3xl font-bold bg-gradient-to-r from-[var(--primary)] to-blue-600 bg-clip-text text-transparent">
                    Kendaraan Baru
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-full bg-white p-3 shadow-lg transition hover:bg-slate-100 hover:shadow-xl dark:bg-slate-700 dark:hover:bg-slate-600"
                >
                  <FaTimes className="text-lg text-slate-600 dark:text-slate-300" />
                </button>
              </div>

              {/* Form Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  ['plate', 'Nomor Plat', 'Contoh: B 1209 TQ'],
                  ['owner', 'Nama Pemilik', 'Nama pemilik kendaraan'],
                  ['brand', 'Merk / Model', 'Contoh: Toyota Avanza'],
                  ['lastService', 'Service Terakhir', 'Contoh: Tune Up'],
                  ['year', 'Tahun', 'Tahun pembuatan'],
                  ['km', 'Kilometer', 'Km saat ini'],
                ].map(([name, label, placeholder]) => (
                  <label key={name} className="group">
                    <span className="block text-sm font-semibold text-slate-700 transition group-focus-within:text-[var(--primary)] dark:text-slate-300">
                      {label}
                    </span>
                    <input
                      name={name}
                      type={['year', 'km'].includes(name) ? 'number' : 'text'}
                      placeholder={placeholder}
                      value={form[name]}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 transition placeholder:text-slate-400 focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                    />
                  </label>
                ))}
                
                <label className="group">
                  <span className="block text-sm font-semibold text-slate-700 transition group-focus-within:text-[var(--primary)] dark:text-slate-300">
                    Tipe Kendaraan
                  </span>
                  <select 
                    name="type" 
                    value={form.type} 
                    onChange={handleChange} 
                    className="mt-2 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 transition focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                  >
                    <option>Mobil</option>
                    <option>Motor</option>
                  </select>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex gap-3 pt-6 border-t border-slate-200 dark:border-slate-700">
                <button 
                  type="button" 
                  onClick={() => setShowForm(false)} 
                  className="flex-1 rounded-xl border-2 border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 hover:shadow-md dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="flex-1 rounded-xl bg-gradient-to-r from-[var(--primary)] to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:shadow-xl hover:-translate-y-0.5"
                >
                  <FaPlus className="mb-0.5 inline mr-2" />
                  Simpan Kendaraan
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ['Semua', FaWrench],
          ['Mobil', FaCarSide],
          ['Motor', FaMotorcycle],
        ].map(([item, Icon]) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`rounded-[22px] border p-5 text-left transition ${
              filter === item ? 'chip-active border-[var(--primary)]' : 'panel hover:border-[var(--primary)]'
            }`}
          >
            <Icon className="mb-3 text-2xl text-[var(--primary)]" />
            <p className="text-xl font-semibold">{item}</p>
            <p className="text-sm text-[inherit] opacity-70">
              {item === 'Semua' ? vehicles.length : vehicles.filter((vehicle) => vehicle.type === item).length} kendaraan
            </p>
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredVehicles.map((vehicle) => (
          <article key={vehicle.plate} className="panel rounded-[24px] p-5 transition hover:-translate-y-0.5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--primary)]">{vehicle.plate}</p>
                <h3 className="mt-1 text-xl font-semibold text-[var(--text)]">{vehicle.brand}</h3>
                <p className="text-sm text-[var(--text-muted)]">{vehicle.owner}</p>
              </div>
              <div className="rounded-2xl bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] p-3 text-[var(--primary)]">
                {vehicle.type === 'Mobil' ? <FaCarSide /> : <FaMotorcycle />}
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl bg-[var(--surface-2)] p-3">
                <p className="text-xs text-[var(--text-soft)]">Tahun</p>
                <p className="font-medium text-[var(--text)]">{vehicle.year}</p>
              </div>
              <div className="rounded-2xl bg-[var(--surface-2)] p-3">
                <p className="text-xs text-[var(--text-soft)]">KM</p>
                <p className="font-medium text-[var(--text)]">{vehicle.km.toLocaleString('id-ID')}</p>
              </div>
              <div className="rounded-2xl bg-[var(--surface-2)] p-3">
                <p className="text-xs text-[var(--text-soft)]">Tipe</p>
                <p className="font-medium text-[var(--text)]">{vehicle.type}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => { setSelected(vehicle); setOpen(true); }}
              className="btn-primary mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm"
            >
              <FaEye />
              Lihat Riwayat Service
            </button>
          </article>
        ))}
      </div>
      {selected && (
        <DetailModal open={open} onClose={() => { setOpen(false); setSelected(null); }} type="vehicle" item={selected} />
      )}
    </div>
  );
};

export default Kendaraan;
