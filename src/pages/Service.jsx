import React, { useMemo, useState } from 'react';
import { FaCheckCircle, FaClock, FaEye, FaPlus, FaPrint, FaTimes } from 'react-icons/fa';

const initialServices = [
  { id: 'SRV-2401', customer: 'Rafi Hidayat', plate: 'B 1209 TQ', vehicle: 'Toyota Avanza', type: 'Tune Up', status: 'Proses', mechanic: 'Dimas', cost: 850000 },
  { id: 'SRV-2402', customer: 'Citra Lestari', plate: 'D 7781 FI', vehicle: 'Honda Beat', type: 'Ganti Oli', status: 'Selesai', mechanic: 'Aji', cost: 145000 },
  { id: 'SRV-2403', customer: 'Yoga Pratama', plate: 'AD 4201 NN', vehicle: 'Yamaha NMAX', type: 'Rem', status: 'Menunggu', mechanic: 'Bagas', cost: 320000 },
  { id: 'SRV-2404', customer: 'Maya Putri', plate: 'F 9812 CA', vehicle: 'Daihatsu Sigra', type: 'Kelistrikan', status: 'Proses', mechanic: 'Reno', cost: 475000 },
  { id: 'SRV-2405', customer: 'Andi Saputra', plate: 'B 6642 KJ', vehicle: 'Honda Brio', type: 'Spooring', status: 'Selesai', mechanic: 'Dimas', cost: 275000 },
];

const statusStyle = {
  Menunggu: 'bg-[color-mix(in_srgb,var(--warning)_18%,transparent)] text-[var(--warning)]',
  Proses: 'bg-[color-mix(in_srgb,var(--primary)_14%,transparent)] text-[var(--primary)]',
  Selesai: 'bg-[color-mix(in_srgb,var(--success)_16%,transparent)] text-[var(--success)]',
};

const Service = () => {
  const [services, setServices] = useState(initialServices);
  const [filter, setFilter] = useState('Semua');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    customer: '',
    plate: '',
    vehicle: '',
    type: 'Tune Up',
    status: 'Menunggu',
    mechanic: 'Dimas',
    cost: 0,
  });

  const filteredServices = useMemo(
    () => (filter === 'Semua' ? services : services.filter((service) => service.status === filter)),
    [filter, services]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextService = {
      ...form,
      id: `SRV-${2401 + services.length}`,
      cost: Number(form.cost),
    };
    setServices([nextService, ...services]);
    setForm({ customer: '', plate: '', vehicle: '', type: 'Tune Up', status: 'Menunggu', mechanic: 'Dimas', cost: 0 });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]">Data Service</p>
          <h2 className="text-3xl font-semibold text-[var(--text)]">Antrian dan Riwayat Service</h2>
        </div>
        <button
          type="button"
          onClick={() => setShowForm((prev) => !prev)}
          className="btn-primary inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium transition hover:opacity-95"
        >
          <FaPlus />
          Tambah Service
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="panel grid gap-4 rounded-[24px] p-5 md:grid-cols-3">
          {[
            ['customer', 'Customer', 'Nama customer'],
            ['plate', 'Nomor Plat', 'B 1234 ABC'],
            ['vehicle', 'Kendaraan', 'Toyota Avanza'],
            ['cost', 'Estimasi Biaya', '250000'],
          ].map(([name, label, placeholder]) => (
            <label key={name} className="space-y-2 text-sm text-[var(--text)]">
              <span>{label}</span>
              <input
                name={name}
                type={name === 'cost' ? 'number' : 'text'}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                required
                className="input-shell w-full rounded-2xl px-4 py-3 outline-none"
              />
            </label>
          ))}

          {[
            ['type', 'Jenis Service', ['Tune Up', 'Ganti Oli', 'Rem', 'Kelistrikan', 'Spooring']],
            ['status', 'Status', ['Menunggu', 'Proses', 'Selesai']],
            ['mechanic', 'Mekanik', ['Dimas', 'Aji', 'Bagas', 'Reno']],
          ].map(([name, label, options]) => (
            <label key={name} className="space-y-2 text-sm text-[var(--text)]">
              <span>{label}</span>
              <select
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="input-shell w-full rounded-2xl px-4 py-3 outline-none"
              >
                {options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          ))}

          <div className="flex gap-3 md:col-span-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="btn-secondary inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm"
            >
              <FaTimes /> Batal
            </button>
            <button type="submit" className="btn-primary rounded-2xl px-5 py-3 text-sm">
              Simpan Service
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-wrap gap-2">
        {['Semua', 'Menunggu', 'Proses', 'Selesai'].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              filter === item ? 'chip-active' : 'chip'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="panel overflow-hidden rounded-[24px]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-[var(--surface-2)] text-[var(--text)]">
              <tr>
                {['ID', 'Customer', 'Kendaraan', 'Service', 'Status', 'Mekanik', 'Biaya', 'Aksi'].map((head) => (
                  <th key={head} className="px-5 py-4 text-left text-sm font-medium">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service) => (
                <tr key={service.id} className="border-t border-[var(--border)] hover:bg-[var(--surface-2)]">
                  <td className="px-5 py-4 font-medium text-[var(--text)]">{service.id}</td>
                  <td className="px-5 py-4">
                    <p className="font-medium text-[var(--text)]">{service.customer}</p>
                    <p className="text-sm text-[var(--text-muted)]">{service.plate}</p>
                  </td>
                  <td className="px-5 py-4 text-[var(--text-muted)]">{service.vehicle}</td>
                  <td className="px-5 py-4 text-[var(--text-muted)]">{service.type}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs ${statusStyle[service.status]}`}>
                      {service.status === 'Selesai' ? <FaCheckCircle /> : <FaClock />}
                      {service.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[var(--text-muted)]">{service.mechanic}</td>
                  <td className="px-5 py-4 font-medium text-[var(--text)]">Rp {service.cost.toLocaleString('id-ID')}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => alert(`Detail ${service.id}`)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--primary)] hover:border-[var(--primary)]"
                      >
                        <FaEye />
                      </button>
                      <button
                        type="button"
                        onClick={() => alert(`Invoice ${service.id} dicetak.`)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--danger)] hover:border-[var(--danger)]"
                      >
                        <FaPrint />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Service;
