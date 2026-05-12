import React, { useState } from 'react';
import { FaBell, FaSave, FaShieldAlt, FaToggleOff, FaToggleOn, FaUserCog } from 'react-icons/fa';

const defaultProfile = {
  name: 'Admin Bengkel',
  email: 'admin@bengkelpro.test',
  branch: 'Cabang Jakarta',
};

const getSavedProfile = () => {
  try {
    const savedProfile = localStorage.getItem('bengkelpro_admin_profile');
    return savedProfile ? { ...defaultProfile, ...JSON.parse(savedProfile) } : defaultProfile;
  } catch {
    return defaultProfile;
  }
};

const Settings = () => {
  const [profile, setProfile] = useState(getSavedProfile);
  const [settings, setSettings] = useState({ booking: true, notification: true, invoice: false, backup: true });
  const [saveMessage, setSaveMessage] = useState('');

  const handleProfile = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const toggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    localStorage.setItem('bengkelpro_admin_profile', JSON.stringify(profile));
    window.dispatchEvent(new CustomEvent('bengkelpro-profile-updated', { detail: profile }));
    setSaveMessage('Profil admin berhasil disimpan.');
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]">Pengaturan</p>
        <h2 className="text-3xl font-semibold text-[var(--text)]">Profil dan Sistem Bengkel</h2>
      </div>

      <section className="panel rounded-[24px] p-5">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-2xl bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] p-3 text-[var(--primary)]">
            <FaUserCog />
          </div>
          <h3 className="text-xl font-semibold text-[var(--text)]">Profil Admin</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ['name', 'Nama Admin'],
            ['email', 'Email'],
            ['branch', 'Cabang'],
          ].map(([name, label]) => (
            <label key={name} className="space-y-2 text-sm text-[var(--text)]">
              <span>{label}</span>
              <input name={name} value={profile[name]} onChange={handleProfile} className="input-shell w-full rounded-2xl px-4 py-3 outline-none" />
            </label>
          ))}
        </div>
      </section>

      {saveMessage && (
        <div className="rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] px-4 py-3 text-sm text-[var(--text)]">
          {saveMessage}
        </div>
      )}

      <section className="panel rounded-[24px] p-5">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-2xl bg-[color-mix(in_srgb,var(--text-soft)_14%,transparent)] p-3 text-[var(--primary)]">
            <FaBell />
          </div>
          <h3 className="text-xl font-semibold text-[var(--text)]">Preferensi Sistem</h3>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ['booking', 'Booking online aktif'],
            ['notification', 'Notifikasi service'],
            ['invoice', 'Invoice otomatis'],
            ['backup', 'Backup data harian'],
          ].map(([key, label]) => (
            <button key={key} type="button" onClick={() => toggle(key)} className="flex items-center justify-between rounded-[20px] border border-[var(--border)] bg-[var(--surface-2)] p-4 text-left">
              <span className="text-sm text-[var(--text)]">{label}</span>
              {settings[key] ? <FaToggleOn className="text-3xl text-[var(--primary)]" /> : <FaToggleOff className="text-3xl text-[var(--text-soft)]" />}
            </button>
          ))}
        </div>
      </section>

      <section className="panel rounded-[24px] p-5">
        <div className="mb-4 flex items-center gap-3">
          <FaShieldAlt className="text-[var(--danger)]" />
          <h3 className="text-xl font-semibold text-[var(--text)]">Keamanan</h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {['Ubah Password', 'Kelola Role', 'Log Aktivitas'].map((item) => (
            <button key={item} type="button" onClick={() => alert(`${item} dibuka.`)} className="btn-secondary rounded-2xl px-4 py-3 text-sm">
              {item}
            </button>
          ))}
        </div>
      </section>

      <button type="button" onClick={handleSave} className="btn-primary flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm">
        <FaSave />
        Simpan Pengaturan
      </button>
    </div>
  );
};

export default Settings;
