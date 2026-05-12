import React, { useState } from 'react';
import { FaPhoneAlt, FaTools, FaUserCog } from 'react-icons/fa';
import mockData from '../data/mockData.json';
import DetailModal from '../components/DetailModal';

const Mekanik = () => {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-[#5353e2]">Tim Bengkel</p>
        <h2 className="text-3xl font-semibold text-[#0f172a]">Mekanik</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {mockData.mekaniks.map((m) => (
          <article key={m.id} className="rounded-[24px] border border-[#d7deea] bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef0ff] text-[#5353e2]">
                <FaUserCog />
              </div>
              <span className={`rounded-full px-3 py-1 text-xs ${m.status === 'Tersedia' ? 'bg-[#e9f8ef] text-[#16a34a]' : 'bg-[#fff7df] text-[#b7791f]'}`}>
                {m.status}
              </span>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-[#0f172a]">{m.name}</h3>
            <p className="text-sm text-[#5b6478]">{m.skillsets.join(' • ')}</p>
            <p className="mt-3 text-sm text-[#778096]">{m.jobsActive} job aktif</p>
            <div className="mt-4 flex gap-3">
              <button type="button" onClick={() => { setSelected(m); setOpen(true); }} className="inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-2 text-sm">Detail</button>
              <button type="button" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0f172a] px-4 py-2 text-sm text-white">
                <FaPhoneAlt /> Hubungi
              </button>
            </div>
          </article>
        ))}
      </div>

      <section className="rounded-[24px] border border-[#d7deea] bg-white p-5">
        <div className="flex items-center gap-3">
          <FaTools className="text-[#5353e2]" />
          <h3 className="text-lg font-semibold text-[#0f172a]">Pembagian pekerjaan hari ini</h3>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {['Mesin: 11 job', 'Kelistrikan: 5 job', 'Kaki-kaki: 7 job'].map((item) => (
            <div key={item} className="rounded-2xl bg-[#f8fafc] px-4 py-3 text-sm text-[#5b6478]">{item}</div>
          ))}
        </div>
      </section>

      {selected && (
        <DetailModal open={open} onClose={() => { setOpen(false); setSelected(null); }} type="mekanik" item={selected} />
      )}
    </div>
  );
};

export default Mekanik;
