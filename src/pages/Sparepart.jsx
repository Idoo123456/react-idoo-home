import React, { useState } from 'react';
import { FaBoxOpen, FaPlus, FaSearch } from 'react-icons/fa';
import mockData from '../data/mockData.json';
import DetailModal from '../components/DetailModal';

const Sparepart = () => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const parts = mockData.spareparts.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.sku.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[#5353e2]">Gudang</p>
          <h2 className="text-3xl font-semibold text-[#0f172a]">Sparepart</h2>
        </div>
        <button type="button" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0f172a] px-4 py-3 text-sm text-white">
          <FaPlus /> Tambah Sparepart
        </button>
      </div>

      <div className="rounded-[24px] border border-[#d7deea] bg-white p-4">
        <div className="relative mb-4">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8f9ab0]" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded-2xl border border-[#d7deea] bg-[#f8fafc] py-3 pl-11 pr-4 text-sm outline-none" placeholder="Cari sparepart..." />
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {parts.map((p) => (
            <article key={p.id} className="rounded-2xl border border-[#e5e7eb] p-4">
              <FaBoxOpen className="text-[#5353e2]" />
              <h3 className="mt-3 font-semibold text-[#0f172a]">{p.name}</h3>
              <p className="text-sm text-[#5b6478]">Rp {p.price.toLocaleString()}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-[#778096]">{p.stock} stok</span>
                <span className={`rounded-full px-3 py-1 text-xs ${p.status === 'Aman' ? 'bg-[#e9f8ef] text-[#16a34a]' : 'bg-[#fff7df] text-[#b7791f]'}`}>{p.status}</span>
              </div>
              <button type="button" onClick={() => { setSelected(p); setOpen(true); }} className="mt-3 text-sm text-[var(--primary)]">Lihat detail</button>
            </article>
          ))}
        </div>
      </div>

      {selected && (
        <DetailModal open={open} onClose={() => { setOpen(false); setSelected(null); }} type="sparepart" item={selected} />
      )}
    </div>
  );
};

export default Sparepart;
