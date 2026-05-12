import React from 'react';
import { FaTimes, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaTools, FaBoxOpen } from 'react-icons/fa';

const Section = ({ title, children }) => (
  <div className="mb-4">
    <h4 className="text-sm font-semibold text-[var(--text)]">{title}</h4>
    <div className="mt-2 text-sm text-[var(--text-muted)]">{children}</div>
  </div>
);

const DetailModal = ({ open, onClose, type, item, related = {} }) => {
  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-[var(--primary)] uppercase tracking-wider">Detail</p>
            <h3 className="text-2xl font-semibold text-[var(--text)]">{item.name || item.id || item.plate}</h3>
            <p className="mt-1 text-sm text-[var(--text-muted)]">{item.id && `ID: ${item.id}`}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-[var(--text-muted)] hover:bg-[var(--surface-2)]">
            <FaTimes />
          </button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {type === 'customer' && (
            <>
              <Section title="Kontak">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2"><FaPhoneAlt /> {item.phone}</div>
                  <div className="flex items-center gap-2"><FaEnvelope /> {item.email}</div>
                  {item.address && <div className="flex items-center gap-2"><FaMapMarkerAlt /> {item.address}</div>}
                </div>
              </Section>

              <Section title="Kendaraan">
                {item.vehicles && item.vehicles.map((v, i) => (
                  <div key={i} className="mb-2 rounded-lg bg-[var(--surface-2)] p-3">
                    <div className="font-medium">{v.make || v.brand} {v.model || ''} • {v.year}</div>
                    <div className="text-xs text-[var(--text-muted)]">Plat: {v.plate}</div>
                  </div>
                ))}
              </Section>

              <Section title="Catatan">
                <div>{item.notes}</div>
              </Section>
            </>
          )}

          {type === 'booking' && (
            <>
              <Section title="Jadwal & Status">
                <div className="font-medium">{item.date} • {item.time}</div>
                <div className="mt-1 text-sm">Status: <span className="font-semibold">{item.status}</span></div>
                <div className="mt-1 text-sm">Estimasi Durasi: <span className="font-semibold">{item.estimatedDurationMins} menit</span></div>
              </Section>

              <Section title="Pelanggan & Kendaraan">
                <div className="font-medium">{related.customer?.name || item.customerId}</div>
                <div className="text-sm text-[var(--text-muted)]">{item.vehicle}</div>
              </Section>

              <Section title="Mekanik">
                <div className="flex items-center gap-2"><FaTools /> {related.mekanik?.name || item.mechanicId}</div>
                <div className="text-sm text-[var(--text-muted)]">{related.mekanik?.skillsets?.join(', ')}</div>
              </Section>

              <Section title="Catatan">
                <div>{item.notes}</div>
              </Section>
            </>
          )}

          {type === 'sparepart' && (
            <>
              <Section title="Informasi Produk">
                <div className="font-medium">SKU: {item.sku || item.id}</div>
                <div className="mt-1">Stok: <span className="font-semibold">{item.stock}</span></div>
                <div className="mt-1">Harga: <span className="font-semibold">Rp {item.price?.toLocaleString()}</span></div>
                <div className="mt-1 text-sm text-[var(--text-muted)]">Lokasi: {item.location}</div>
              </Section>

              <Section title="Supplier & Deskripsi">
                <div className="flex items-center gap-2"><FaBoxOpen /> {item.supplier}</div>
                <div className="mt-2 text-sm text-[var(--text-muted)]">{item.description || item.notes}</div>
              </Section>
            </>
          )}

          {type === 'mekanik' && (
            <>
              <Section title="Kontak">
                <div className="flex items-center gap-2"><FaPhoneAlt /> {item.phone}</div>
                <div className="flex items-center gap-2"><FaEnvelope /> {item.email}</div>
              </Section>

              <Section title="Keahlian & Beban Kerja">
                <div className="font-medium">{item.skillsets?.join(', ') || item.skills?.join(', ')}</div>
                <div className="mt-1 text-sm text-[var(--text-muted)]">Pekerjaan aktif: {item.jobsActive || item.currentJobs}</div>
                <div className="mt-1 text-sm text-[var(--text-muted)]">Rating: {item.rating}</div>
              </Section>

              <Section title="Bio">
                <div className="text-sm text-[var(--text-muted)]">{item.bio || item.notes}</div>
              </Section>
            </>
          )}

          {type === 'vehicle' && (
            <>
              <Section title="Informasi Kendaraan">
                <div className="font-medium">{item.brand} • {item.type}</div>
                <div className="mt-1">Plat: <span className="font-semibold">{item.plate}</span></div>
                <div className="mt-1">Tahun: <span className="font-semibold">{item.year}</span></div>
                <div className="mt-1">KM: <span className="font-semibold">{item.km?.toLocaleString ? item.km.toLocaleString() : item.km}</span></div>
              </Section>

              <Section title="Riwayat & Catatan">
                <div className="text-sm text-[var(--text-muted)]">Service terakhir: {item.lastService}</div>
                <div className="mt-2 text-sm">{item.notes}</div>
              </Section>
            </>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="btn-secondary rounded-2xl px-5 py-3">Tutup</button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
