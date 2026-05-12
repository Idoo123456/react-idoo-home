import React, { useState } from 'react';
import { FaCheck, FaTimes, FaTools } from 'react-icons/fa';

const AddMenusModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    customer: '',
    plate: '',
    vehicle: '',
    service: 'Tune Up',
    date: '2026-05-04',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Booking service ${formData.service} untuk ${formData.plate || formData.customer} berhasil dibuat.`);
    setFormData({ customer: '', plate: '', vehicle: '', service: 'Tune Up', date: '2026-05-04' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#5b4aae]/60 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 bg-[#5b4aae] p-5 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f8a7c8] text-[#30284f]">
              <FaTools />
            </div>
            <div>
              <h2 className="text-xl font-black">Booking Service Baru</h2>
              <p className="text-sm text-slate-300">Input cepat untuk antrian bengkel.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-white/10 p-2 text-white transition hover:bg-white/20"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 p-5 sm:grid-cols-2">
          {[
            { label: 'Nama Customer', name: 'customer', placeholder: 'Contoh: Andi Saputra' },
            { label: 'Nomor Plat', name: 'plate', placeholder: 'B 1234 KUN' },
            { label: 'Kendaraan', name: 'vehicle', placeholder: 'Honda Vario 160' },
          ].map((field) => (
            <label key={field.name} className="space-y-2 text-sm font-bold text-slate-700">
              {field.label}
              <input
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={field.name !== 'vehicle'}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#6f57c7] focus:bg-white"
              />
            </label>
          ))}

          <label className="space-y-2 text-sm font-bold text-slate-700">
            Jenis Service
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#6f57c7] focus:bg-white"
            >
              <option>Tune Up</option>
              <option>Ganti Oli</option>
              <option>Rem & Kaki-kaki</option>
              <option>Kelistrikan</option>
              <option>Body Repair</option>
            </select>
          </label>

          <label className="space-y-2 text-sm font-bold text-slate-700 sm:col-span-2">
            Tanggal Booking
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#6f57c7] focus:bg-white"
            />
          </label>

          <div className="flex gap-3 pt-2 sm:col-span-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-slate-200 px-4 py-3 font-black text-slate-700 transition hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#f45f93] px-4 py-3 font-black text-[#30284f] transition hover:bg-[#ff7dad]"
            >
              <FaCheck />
              Simpan Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMenusModal;

