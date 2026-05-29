import React, { useMemo, useState } from 'react';
import {
  FaBullhorn,
  FaCalendarAlt,
  FaCarSide,
  FaCity,
  FaCommentDots,
  FaEnvelope,
  FaEye,
  FaLaptop,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaPlus,
  FaSignal,
  FaStar,
  FaTimes,
  FaUserTag,
  FaUsers,
  FaVenusMars,
} from 'react-icons/fa';
import mockData from '../data/mockData.json';
import DetailModal from '../components/DetailModal';

const levelStyle = {
  Bronze: 'bg-[color-mix(in_srgb,var(--warning)_16%,transparent)] text-[var(--warning)]',
  Silver: 'bg-[color-mix(in_srgb,var(--text-soft)_14%,transparent)] text-[var(--text-muted)]',
  Gold: 'bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-[var(--primary)]',
};

const sourceOptions = ['Instagram', 'TikTok', 'Referral', 'Google Ads', 'Walk-in'];
const campaignOptions = ['Promo Tune Up Mei', 'Gratis Cek Rem', 'Diskon Oli 20%', 'Member Get Member', 'Tidak ada'];
const statusOptions = ['Aktif', 'Prospek', 'Nonaktif'];

const statusStyle = {
  Aktif: 'bg-[color-mix(in_srgb,var(--success)_14%,transparent)] text-[var(--success)]',
  Prospek: 'bg-[color-mix(in_srgb,var(--warning)_16%,transparent)] text-[var(--warning)]',
  Nonaktif: 'bg-[color-mix(in_srgb,var(--danger)_14%,transparent)] text-[var(--danger)]',
};

const customerExtras = [
  {
    gender: 'Laki-laki',
    cityProvince: 'Jakarta, DKI Jakarta',
    joinedDate: '2021-02-15',
    memberStatus: 'Aktif',
    feedback: 'Pelayanan cepat, reminder servis sangat membantu.',
    source: 'Instagram',
    campaign: 'Promo Tune Up Mei',
    lastLogin: '2026-05-28 20:14',
    device: 'Android - Samsung A54',
    loginLocation: 'Jakarta Selatan',
  },
  {
    gender: 'Perempuan',
    cityProvince: 'Bandung, Jawa Barat',
    joinedDate: '2022-06-01',
    memberStatus: 'Aktif',
    feedback: 'Admin responsif dan estimasi biaya jelas.',
    source: 'TikTok',
    campaign: 'Gratis Cek Rem',
    lastLogin: '2026-05-27 18:42',
    device: 'iPhone 13',
    loginLocation: 'Bandung',
  },
  {
    gender: 'Laki-laki',
    cityProvince: 'Surabaya, Jawa Timur',
    joinedDate: '2020-11-20',
    memberStatus: 'Prospek',
    feedback: 'Ingin pilihan jadwal service lebih banyak.',
    source: 'Referral',
    campaign: 'Member Get Member',
    lastLogin: '2026-05-26 09:11',
    device: 'Windows - Chrome',
    loginLocation: 'Surabaya',
  },
  {
    gender: 'Perempuan',
    cityProvince: 'Jakarta Selatan, DKI Jakarta',
    joinedDate: '2019-08-05',
    memberStatus: 'Aktif',
    feedback: 'Cocok untuk service kendaraan keluarga.',
    source: 'Google Ads',
    campaign: 'Diskon Oli 20%',
    lastLogin: '2026-05-28 07:35',
    device: 'Android - Oppo Reno',
    loginLocation: 'Jakarta Selatan',
  },
];

const enrichCustomer = (customer, index) => {
  const extra = customerExtras[index % customerExtras.length];
  return {
    ...extra,
    ...customer,
    cityProvince: customer.cityProvince || extra.cityProvince,
    joinedDate: customer.joinedDate || customer.joined || extra.joinedDate,
    memberStatus: customer.memberStatus || extra.memberStatus,
    membershipLevel: customer.membershipLevel || customer.level,
    feedback: customer.feedback || extra.feedback,
    source: customer.source || extra.source,
    campaign: customer.campaign || extra.campaign,
    lastLogin: customer.lastLogin || extra.lastLogin,
    device: customer.device || extra.device,
    loginLocation: customer.loginLocation || extra.loginLocation,
  };
};

const initialForm = {
  name: '',
  gender: 'Laki-laki',
  phone: '',
  email: '',
  address: '',
  cityProvince: '',
  joinedDate: '2026-05-29',
  memberStatus: 'Aktif',
  level: 'Bronze',
  vehicles: 1,
  lastVisit: '2026-05-04',
  feedback: '',
  source: 'Instagram',
  campaign: 'Promo Tune Up Mei',
  lastLogin: '2026-05-29 08:00',
  device: '',
  loginLocation: '',
};

const Customers = () => {
  const [customers, setCustomers] = useState(() => mockData.customers.map(enrichCustomer));
  const [filter, setFilter] = useState('Semua');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [selected, setSelected] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const filteredCustomers = useMemo(
    () => (filter === 'Semua' ? customers : customers.filter((customer) => customer.level === filter)),
    [filter, customers]
  );

  const customerStats = useMemo(() => {
    const activeCount = customers.filter((customer) => customer.memberStatus === 'Aktif').length;
    const vehicleCount = customers.reduce(
      (total, customer) => total + (Array.isArray(customer.vehicles) ? customer.vehicles.length : Number(customer.vehicles || 0)),
      0
    );
    return [
      { label: 'Total Customer', value: customers.length, icon: FaUsers, tone: 'bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-[var(--primary)]' },
      { label: 'Member Aktif', value: activeCount, icon: FaSignal, tone: 'bg-[color-mix(in_srgb,var(--success)_14%,transparent)] text-[var(--success)]' },
      { label: 'Kendaraan', value: vehicleCount, icon: FaCarSide, tone: 'bg-[color-mix(in_srgb,var(--warning)_15%,transparent)] text-[var(--warning)]' },
      { label: 'Campaign', value: new Set(customers.map((customer) => customer.campaign)).size, icon: FaBullhorn, tone: 'bg-[color-mix(in_srgb,var(--danger)_12%,transparent)] text-[var(--danger)]' },
    ];
  }, [customers]);

  const openCustomerDetail = (customer) => {
    setSelected(customer);
    setShowDetail(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCustomers([
      {
        ...form,
        id: `CST-${String(customers.length + 1).padStart(3, '0')}`,
        vehicles: Number(form.vehicles),
        membershipLevel: form.level,
      },
      ...customers,
    ]);
    setForm(initialForm);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="panel overflow-hidden rounded-[28px]">
        <div className="bg-[linear-gradient(135deg,color-mix(in_srgb,var(--primary)_16%,var(--surface)),var(--surface)_48%,color-mix(in_srgb,var(--accent)_14%,var(--surface)))] p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]">Customer</p>
              <h2 className="mt-2 text-3xl font-semibold text-[var(--text)]">Pelanggan Bengkel</h2>
              <p className="mt-2 max-w-2xl text-sm text-[var(--text-muted)]">
                Kelola profil pelanggan, membership, sumber akuisisi, dan aktivitas login dalam satu tampilan.
              </p>
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
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {customerStats.map((stat) => {
          const StatIcon = stat.icon;
          return (
            <article key={stat.label} className="panel rounded-[22px] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-soft)]">{stat.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-[var(--text)]">{stat.value}</p>
                </div>
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.tone}`}>
                  <StatIcon />
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="panel grid gap-4 rounded-[24px] p-5 md:grid-cols-3">
          {[
            ['name', 'Nama'],
            ['phone', 'Nomor HP'],
            ['email', 'Email'],
            ['address', 'Alamat'],
            ['cityProvince', 'Kota / Provinsi'],
            ['vehicles', 'Jumlah Kendaraan'],
            ['lastVisit', 'Kunjungan Terakhir'],
            ['joinedDate', 'Tanggal Daftar'],
            ['feedback', 'Feedback / Review'],
            ['device', 'Device Digunakan'],
            ['loginLocation', 'Lokasi Login'],
            ['lastLogin', 'Login Terakhir'],
          ].map(([name, label]) => (
            <label key={name} className="space-y-2 text-sm text-[var(--text)]">
              <span>{label}</span>
              <input
                name={name}
                type={name === 'email' ? 'email' : name === 'vehicles' ? 'number' : name === 'lastVisit' || name === 'joinedDate' ? 'date' : 'text'}
                value={form[name]}
                onChange={handleChange}
                required
                className="input-shell w-full rounded-2xl px-4 py-3 outline-none"
              />
            </label>
          ))}
          <label className="space-y-2 text-sm text-[var(--text)]">
            <span>Jenis Kelamin</span>
            <select name="gender" value={form.gender} onChange={handleChange} className="input-shell w-full rounded-2xl px-4 py-3 outline-none">
              <option>Laki-laki</option>
              <option>Perempuan</option>
            </select>
          </label>
          <label className="space-y-2 text-sm text-[var(--text)]">
            <span>Status Member</span>
            <select name="memberStatus" value={form.memberStatus} onChange={handleChange} className="input-shell w-full rounded-2xl px-4 py-3 outline-none">
              {statusOptions.map((status) => <option key={status}>{status}</option>)}
            </select>
          </label>
          <label className="space-y-2 text-sm text-[var(--text)]">
            <span>Level Membership</span>
            <select name="level" value={form.level} onChange={handleChange} className="input-shell w-full rounded-2xl px-4 py-3 outline-none">
              <option>Bronze</option>
              <option>Silver</option>
              <option>Gold</option>
            </select>
          </label>
          <label className="space-y-2 text-sm text-[var(--text)]">
            <span>Sumber User</span>
            <select name="source" value={form.source} onChange={handleChange} className="input-shell w-full rounded-2xl px-4 py-3 outline-none">
              {sourceOptions.map((source) => <option key={source}>{source}</option>)}
            </select>
          </label>
          <label className="space-y-2 text-sm text-[var(--text)]">
            <span>Campaign Diikuti</span>
            <select name="campaign" value={form.campaign} onChange={handleChange} className="input-shell w-full rounded-2xl px-4 py-3 outline-none">
              {campaignOptions.map((campaign) => <option key={campaign}>{campaign}</option>)}
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

      <section className="panel overflow-hidden rounded-[24px]">
        <div className="flex flex-col gap-4 border-b border-[var(--border)] px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--primary)]">Data Member</p>
            <h3 className="mt-1 text-xl font-semibold text-[var(--text)]">Tabel Informasi Customer</h3>
            <p className="mt-1 text-sm text-[var(--text-muted)]">Tekan nama customer untuk membuka profil lengkap.</p>
          </div>
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
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[1280px] w-full text-left text-sm">
            <thead className="bg-[var(--surface-2)] text-xs uppercase tracking-[0.12em] text-[var(--text-soft)]">
              <tr>
                {[
                  'Customer',
                  'Kontak',
                  'Lokasi',
                  'Membership',
                  'Feedback',
                  'Akuisisi',
                  'Aktivitas',
                  'Aksi',
                ].map((header) => (
                  <th key={header} className="px-4 py-3 font-semibold">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] bg-[var(--surface)]">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="align-top transition hover:bg-[color-mix(in_srgb,var(--primary)_5%,var(--surface))]">
                  <td className="px-4 py-4">
                    <button
                      type="button"
                      onClick={() => openCustomerDetail(customer)}
                      className="group flex items-center gap-3 text-left"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary)] text-sm font-semibold text-white shadow-[0_10px_24px_color-mix(in_srgb,var(--primary)_24%,transparent)]">
                        {customer.name.split(' ').map((word) => word[0]).join('').slice(0, 2)}
                      </span>
                      <span>
                        <span className="block font-semibold text-[var(--text)] transition group-hover:text-[var(--primary)]">{customer.name}</span>
                        <span className="mt-1 flex items-center gap-2 text-xs text-[var(--text-soft)]">
                          <FaVenusMars className="text-[var(--primary)]" />
                          {customer.gender} - {customer.id}
                        </span>
                      </span>
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2"><FaPhoneAlt className="text-[var(--primary)]" /> {customer.phone}</div>
                      <div className="flex items-center gap-2"><FaEnvelope className="text-[var(--danger)]" /> {customer.email}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="max-w-[230px] space-y-1">
                      <div className="flex items-start gap-2">
                        <FaMapMarkerAlt className="mt-1 shrink-0 text-[var(--danger)]" />
                        <span>{customer.address}</span>
                      </div>
                      <div className="flex items-start gap-2 text-[var(--text-muted)]">
                        <FaCity className="mt-1 shrink-0 text-[var(--primary)]" />
                        <span>{customer.cityProvince}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-2">
                      <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${levelStyle[customer.level]}`}>
                        <FaStar />
                        {customer.membershipLevel || customer.level}
                      </span>
                      <span className={`ml-0 block w-fit rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[customer.memberStatus] || statusStyle.Aktif}`}>
                        {customer.memberStatus}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-[var(--text-soft)]">
                        <FaCalendarAlt className="text-[var(--primary)]" />
                        Daftar {customer.joinedDate}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="max-w-[240px] rounded-2xl bg-[var(--surface-2)] p-3 text-[var(--text-muted)]">
                      <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
                        <FaCommentDots />
                        Review
                      </div>
                      {customer.feedback}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2"><FaUserTag className="text-[var(--primary)]" /> {customer.source}</div>
                      <div className="flex items-center gap-2 text-[var(--text-muted)]"><FaBullhorn className="text-[var(--warning)]" /> {customer.campaign}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-1 text-[var(--text-muted)]">
                      <div className="flex items-center gap-2"><FaSignal className="text-[var(--success)]" /> {customer.lastLogin}</div>
                      <div className="flex items-center gap-2"><FaLaptop className="text-[var(--primary)]" /> {customer.device}</div>
                      <div className="flex items-center gap-2"><FaMapMarkerAlt className="text-[var(--danger)]" /> {customer.loginLocation}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      type="button"
                      onClick={() => openCustomerDetail(customer)}
                      className="btn-secondary inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm"
                    >
                      <FaEye />
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

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
              onClick={() => openCustomerDetail(customer)}
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
