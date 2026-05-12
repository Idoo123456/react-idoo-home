import React, { useState } from 'react';
import { FaCalendarAlt, FaCheckCircle, FaClock } from 'react-icons/fa';
import mockData from '../data/mockData.json';
import DetailModal from '../components/DetailModal';

const Booking = () => {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const openDetail = (booking) => {
    const customer = mockData.customers.find((c) => c.id === booking.customerId) || null;
    const mekanik = mockData.mekaniks.find((m) => m.id === booking.mechanicId) || null;
    setSelected({ booking, related: { customer, mekanik } });
    setOpen(true);
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-[#5353e2]">Jadwal</p>
        <h2 className="text-3xl font-semibold text-[#0f172a]">Booking Service</h2>
      </div>

      <section className="overflow-hidden rounded-[24px] border border-[#d7deea] bg-white shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
        <div className="flex items-center gap-3 border-b border-[#e5e7eb] px-5 py-4">
          <FaCalendarAlt className="text-[#5353e2]" />
          <h3 className="font-semibold text-[#0f172a]">Booking hari ini</h3>
        </div>
        <div className="divide-y divide-[#eef2f8]">
          {mockData.bookings.map((b) => (
            <button key={b.id} type="button" onClick={() => openDetail(b)} className="grid w-full gap-3 px-5 py-4 text-left hover:bg-[#f8fafc] md:grid-cols-[90px_1fr_1fr_1fr_150px]">
              <span className="font-semibold text-[#0f172a]">{b.time}</span>
              <span className="text-[#0f172a]">{mockData.customers.find((c) => c.id === b.customerId)?.name || b.customerId}</span>
              <span className="text-[#5b6478]">{b.vehicle}</span>
              <span className="text-[#5b6478]">{b.serviceType}</span>
              <span className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs ${b.status === 'Terkonfirmasi' ? 'bg-[#e9f8ef] text-[#16a34a]' : 'bg-[#fff7df] text-[#b7791f]'}`}>
                {b.status === 'Terkonfirmasi' ? <FaCheckCircle /> : <FaClock />}
                {b.status}
              </span>
            </button>
          ))}
        </div>
      </section>

      {selected && (
        <DetailModal
          open={open}
          onClose={() => { setOpen(false); setSelected(null); }}
          type="booking"
          item={selected.booking}
          related={selected.related}
        />
      )}
    </div>
  );
};

export default Booking;
