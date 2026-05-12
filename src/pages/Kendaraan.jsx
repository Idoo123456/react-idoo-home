import React, { useMemo, useState } from 'react';
import { FaCarSide, FaEye, FaMotorcycle, FaPlus, FaWrench } from 'react-icons/fa';
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
        <form onSubmit={handleSubmit} className="panel grid gap-4 rounded-[24px] p-5 md:grid-cols-3">
          {[
            ['plate', 'Nomor Plat'],
            ['owner', 'Pemilik'],
            ['brand', 'Merk / Model'],
            ['year', 'Tahun'],
            ['lastService', 'Service Terakhir'],
            ['km', 'Kilometer'],
          ].map(([name, label]) => (
            <label key={name} className="space-y-2 text-sm text-[var(--text)]">
              <span>{label}</span>
              <input
                name={name}
                type={['year', 'km'].includes(name) ? 'number' : 'text'}
                value={form[name]}
                onChange={handleChange}
                required
                className="input-shell w-full rounded-2xl px-4 py-3 outline-none"
              />
            </label>
          ))}
          <label className="space-y-2 text-sm text-[var(--text)]">
            <span>Tipe</span>
            <select name="type" value={form.type} onChange={handleChange} className="input-shell w-full rounded-2xl px-4 py-3 outline-none">
              <option>Mobil</option>
              <option>Motor</option>
            </select>
          </label>
          <div className="flex items-end gap-3 md:col-span-2">
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary rounded-2xl px-5 py-3 text-sm">
              Batal
            </button>
            <button type="submit" className="btn-primary rounded-2xl px-5 py-3 text-sm">
              Simpan Kendaraan
            </button>
          </div>
        </form>
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
