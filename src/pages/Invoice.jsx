import React from 'react';
import { FaDownload, FaFileInvoiceDollar } from 'react-icons/fa';

const invoices = [
  ['INV-2401', 'Rafi Hidayat', 'Tune Up Mesin', 'Rp 850.000', 'Lunas'],
  ['INV-2402', 'Citra Lestari', 'Ganti Oli', 'Rp 145.000', 'Lunas'],
  ['INV-2403', 'Yoga Pratama', 'Rem', 'Rp 320.000', 'Pending'],
  ['INV-2404', 'Maya Putri', 'Kelistrikan', 'Rp 475.000', 'Pending'],
];

const Invoice = () => {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-[#5353e2]">Keuangan</p>
        <h2 className="text-3xl font-semibold text-[#0f172a]">Invoice</h2>
      </div>

      <section className="overflow-hidden rounded-[24px] border border-[#d7deea] bg-white shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
        <div className="flex items-center gap-3 border-b border-[#e5e7eb] px-5 py-4">
          <FaFileInvoiceDollar className="text-[#5353e2]" />
          <h3 className="font-semibold text-[#0f172a]">Daftar invoice service</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="bg-[#f8fafc] text-[#5b6478]">
              <tr>
                {['Invoice', 'Customer', 'Service', 'Total', 'Status', 'Aksi'].map((head) => (
                  <th key={head} className="px-5 py-3 text-left font-medium">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.map(([id, customer, service, total, status]) => (
                <tr key={id} className="border-t border-[#eef2f8]">
                  <td className="px-5 py-4 font-semibold text-[#0f172a]">{id}</td>
                  <td className="px-5 py-4 text-[#0f172a]">{customer}</td>
                  <td className="px-5 py-4 text-[#5b6478]">{service}</td>
                  <td className="px-5 py-4 text-[#0f172a]">{total}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs ${status === 'Lunas' ? 'bg-[#e9f8ef] text-[#16a34a]' : 'bg-[#fff7df] text-[#b7791f]'}`}>{status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-[#d7deea] px-3 py-2 text-xs text-[#5b6478]">
                      <FaDownload /> Unduh
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Invoice;
