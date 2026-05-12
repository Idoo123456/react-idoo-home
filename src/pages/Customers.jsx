import React, { useMemo, useState } from 'react';
import { FaEnvelope, FaEye, FaPhoneAlt, FaPlus, FaStar, FaTimes } from 'react-icons/fa';
import mockData from '../data/mockData.json';
import DetailModal from '../components/DetailModal';

const levelStyle = {
  Bronze: 'bg-[color-mix(in_srgb,var(--warning)_16%,transparent)] text-[var(--warning)]',
  Silver: 'bg-[color-mix(in_srgb,var(--text-soft)_14%,transparent)] text-[var(--text-muted)]',
  Gold: 'bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-[var(--primary)]',
};

const Customers = () => {
  const [customers, setCustomers] = useState(mockData.customers);
  const [filter, setFilter] = useState('Semua');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', level: 'Bronze', vehicles: 1, lastVisit: '2026-05-04' });
  const [selected, setSelected] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const filteredCustomers = useMemo(
    () => (filter === 'Semua' ? customers : customers.filter((customer) => customer.level === filter)),
    [filter, customers]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCustomers([{ ...form, id: `CST-${String(customers.length + 1).padStart(3, '0')}`, vehicles: Number(form.vehicles) }, ...customers]);
    setForm({ name: '', phone: '', email: '', level: 'Bronze', vehicles: 1, lastVisit: '2026-05-04' });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]">Customer</p>
          <h2 className="text-3xl font-semibold text-[var(--text)]">Pelanggan Bengkel</h2>
        </div>
        <button
          type="button"
          onClick={() => setShowForm((prev) => !prev)}
          className="btn-primary inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm"
        >
          <FaPlus />
          Tambah Customer
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="panel grid gap-4 rounded-[24px] p-5 md:grid-cols-3">
          {[
            ['name', 'Nama'],
            ['phone', 'Telepon'],
            ['email', 'Email'],
            ['vehicles', 'Jumlah Kendaraan'],
            ['lastVisit', 'Kunjungan Terakhir'],
          ].map(([name, label]) => (
            <label key={name} className="space-y-2 text-sm text-[var(--text)]">
              <span>{label}</span>
              <input
                name={name}
                type={name === 'email' ? 'email' : name === 'vehicles' ? 'number' : name === 'lastVisit' ? 'date' : 'text'}
                value={form[name]}
                onChange={handleChange}
                required
                className="input-shell w-full rounded-2xl px-4 py-3 outline-none"
              />
            </label>
          ))}
          <label className="space-y-2 text-sm text-[var(--text)]">
            <span>Level</span>
            <select name="level" value={form.level} onChange={handleChange} className="input-shell w-full rounded-2xl px-4 py-3 outline-none">
              <option>Bronze</option>
              <option>Silver</option>
              <option>Gold</option>
            </select>
          </label>
          <div className="flex gap-3 md:col-span-3">
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm">
              <FaTimes /> Batal
            </button>
            <button type="submit" className="btn-primary rounded-2xl px-5 py-3 text-sm">
              Simpan Customer
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-wrap gap-2">
        {['Semua', 'Bronze', 'Silver', 'Gold'].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`rounded-full px-4 py-2 text-sm ${filter === item ? 'chip-active' : 'chip'}`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {filteredCustomers.map((customer) => (
          <article key={customer.id} className="panel rounded-[24px] p-5 transition hover:-translate-y-0.5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)] text-lg font-semibold text-white">
                  {customer.name
                    .split(' ')
                    .map((word) => word[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--primary)]">{customer.id}</p>
                  <h3 className="text-xl font-semibold text-[var(--text)]">{customer.name}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{Array.isArray(customer.vehicles) ? customer.vehicles.length : customer.vehicles} kendaraan terdaftar</p>
                </div>
              </div>
              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs ${levelStyle[customer.level]}`}>
                <FaStar />
                {customer.level}
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={() => alert(`Telepon ${customer.phone}`)} className="flex items-center gap-3 rounded-2xl bg-[var(--surface-2)] p-3 text-left text-sm text-[var(--text-muted)] hover:border-[var(--primary)]">
                <FaPhoneAlt className="text-[var(--primary)]" />
                {customer.phone}
              </button>
              <button type="button" onClick={() => alert(`Email ke ${customer.email}`)} className="flex items-center gap-3 rounded-2xl bg-[var(--surface-2)] p-3 text-left text-sm text-[var(--text-muted)] hover:border-[var(--primary)]">
                <FaEnvelope className="text-[var(--danger)]" />
                {customer.email}
              </button>
            </div>

            <button
              type="button"
              onClick={() => { setSelected(customer); setShowDetail(true); }}
              className="btn-secondary mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm"
            >
              <FaEye />
              Lihat Detail Customer
            </button>
          </article>
        ))}
      </div>
      {selected && (
        <DetailModal
          open={showDetail}
          onClose={() => { setShowDetail(false); setSelected(null); }}
          type="customer"
          item={selected}
        />
      )}
    </div>
  );
};

export default Customers;
