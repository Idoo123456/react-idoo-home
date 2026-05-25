import React from 'react';
import {
  FaBoxOpen,
  FaCalendarAlt,
  FaCarSide,
  FaEnvelope,
  FaIdBadge,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaStar,
  FaTimes,
  FaTools,
  FaUser,
  FaWrench,
} from 'react-icons/fa';

const modalMeta = {
  customer: { label: 'Detail Pelanggan', icon: FaUser, tone: 'bg-[#5353e2]', tag: 'Customer' },
  booking: { label: 'Detail Booking', icon: FaCalendarAlt, tone: 'bg-[#0ea5e9]', tag: 'Booking' },
  sparepart: { label: 'Detail Sparepart', icon: FaBoxOpen, tone: 'bg-[#f59e0b]', tag: 'Inventory' },
  mekanik: { label: 'Detail Mekanik', icon: FaWrench, tone: 'bg-[#5353e2]', tag: 'Tim Bengkel' },
  vehicle: { label: 'Detail Kendaraan', icon: FaCarSide, tone: 'bg-[#16a34a]', tag: 'Kendaraan' },
};

const Section = ({ title, children }) => (
  <section className="rounded-[18px] border border-[#dbe3ef] bg-[#f8fafc] p-4">
    <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5353e2]">{title}</h4>
    <div className="mt-3 text-sm text-[#5b6478]">{children}</div>
  </section>
);

const InfoLine = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-[#5353e2] shadow-[0_4px_12px_rgba(15,23,42,0.06)]">
      <Icon className="text-sm" />
    </span>
    <span className="min-w-0">
      <span className="block text-xs text-[#778096]">{label}</span>
      <span className="block break-words font-semibold text-[#0f172a]">{value || '-'}</span>
    </span>
  </div>
);

const MiniCard = ({ title, subtitle }) => (
  <div className="rounded-2xl border border-[#eef2f8] bg-white p-3">
    <div className="font-semibold text-[#0f172a]">{title}</div>
    {subtitle && <div className="mt-1 text-xs text-[#778096]">{subtitle}</div>}
  </div>
);

const DetailModal = ({ open, onClose, type, item, related = {} }) => {
  if (!open || !item) return null;

  const meta = modalMeta[type] || modalMeta.customer;
  const HeaderIcon = meta.icon;
  const title = item.name || item.id || item.plate;
  const subtitle = item.id ? `ID: ${item.id}` : item.plate ? `Plat: ${item.plate}` : meta.tag;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/45 p-4 backdrop-blur-sm">
      <div className="max-h-[88dvh] w-full max-w-3xl overflow-hidden rounded-[24px] border border-white/70 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.24)]">
        <div className="border-b border-[#eef2f8] bg-gradient-to-br from-white to-[#f8fafc] px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-4">
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${meta.tone} text-white shadow-[0_12px_28px_rgba(83,83,226,0.22)]`}>
                <HeaderIcon className="text-xl" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5353e2]">{meta.label}</p>
                <h3 className="mt-1 truncate text-2xl font-semibold text-[#0f172a]">{title}</h3>
                <p className="mt-1 text-sm text-[#5b6478]">{subtitle}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#dbe3ef] bg-white text-[#5b6478] transition hover:border-[#5353e2] hover:text-[#5353e2]"
              aria-label="Tutup detail"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        <div className="max-h-[calc(88dvh-156px)] overflow-y-auto px-6 py-5">
          <div className="grid gap-4 md:grid-cols-2">
            {type === 'customer' && (
              <>
                <Section title="Kontak">
                  <div className="space-y-3">
                    <InfoLine icon={FaPhoneAlt} label="Telepon" value={item.phone} />
                    <InfoLine icon={FaEnvelope} label="Email" value={item.email} />
                    {item.address && <InfoLine icon={FaMapMarkerAlt} label="Alamat" value={item.address} />}
                  </div>
                </Section>

                <Section title="Kendaraan">
                  <div className="space-y-2">
                    {item.vehicles?.map((vehicle, index) => (
                      <MiniCard
                        key={`${vehicle.plate}-${index}`}
                        title={`${vehicle.make || vehicle.brand} ${vehicle.model || ''} - ${vehicle.year}`}
                        subtitle={`Plat: ${vehicle.plate}`}
                      />
                    ))}
                  </div>
                </Section>

                <Section title="Catatan">
                  <p>{item.notes || '-'}</p>
                </Section>
              </>
            )}

            {type === 'booking' && (
              <>
                <Section title="Jadwal & Status">
                  <div className="space-y-3">
                    <InfoLine icon={FaCalendarAlt} label="Jadwal" value={`${item.date} - ${item.time}`} />
                    <InfoLine icon={FaIdBadge} label="Status" value={item.status} />
                    <InfoLine icon={FaTools} label="Estimasi Durasi" value={`${item.estimatedDurationMins} menit`} />
                  </div>
                </Section>

                <Section title="Pelanggan & Kendaraan">
                  <div className="space-y-3">
                    <InfoLine icon={FaUser} label="Pelanggan" value={related.customer?.name || item.customerId} />
                    <InfoLine icon={FaCarSide} label="Kendaraan" value={item.vehicle} />
                  </div>
                </Section>

                <Section title="Mekanik">
                  <div className="space-y-3">
                    <InfoLine icon={FaTools} label="Nama Mekanik" value={related.mekanik?.name || item.mechanicId} />
                    <p>{related.mekanik?.skillsets?.join(', ') || '-'}</p>
                  </div>
                </Section>

                <Section title="Catatan">
                  <p>{item.notes || '-'}</p>
                </Section>
              </>
            )}

            {type === 'sparepart' && (
              <>
                <Section title="Informasi Produk">
                  <div className="space-y-3">
                    <InfoLine icon={FaIdBadge} label="SKU" value={item.sku || item.id} />
                    <InfoLine icon={FaBoxOpen} label="Stok" value={item.stock} />
                    <InfoLine icon={FaMapMarkerAlt} label="Lokasi" value={item.location} />
                  </div>
                </Section>

                <Section title="Supplier & Harga">
                  <InfoLine icon={FaBoxOpen} label="Supplier" value={item.supplier} />
                  <div className="mt-3 rounded-2xl bg-[#fff7df] px-4 py-3 font-semibold text-[#b45309]">
                    Rp {item.price?.toLocaleString('id-ID') || '-'}
                  </div>
                  <p className="mt-3">{item.description || item.notes || '-'}</p>
                </Section>
              </>
            )}

            {type === 'mekanik' && (
              <>
                <Section title="Kontak">
                  <div className="space-y-3">
                    <InfoLine icon={FaPhoneAlt} label="Telepon" value={item.phone} />
                    <InfoLine icon={FaEnvelope} label="Email" value={item.email} />
                  </div>
                </Section>

                <Section title="Keahlian & Beban Kerja">
                  <div className="space-y-3">
                    <InfoLine icon={FaTools} label="Keahlian" value={item.skillsets?.join(', ') || item.skills?.join(', ')} />
                    <InfoLine icon={FaIdBadge} label="Pekerjaan Aktif" value={item.jobsActive || item.currentJobs} />
                    <InfoLine icon={FaStar} label="Rating" value={item.rating} />
                  </div>
                </Section>

                <Section title="Bio">
                  <p>{item.bio || item.notes || '-'}</p>
                </Section>
              </>
            )}

            {type === 'vehicle' && (
              <>
                <Section title="Informasi Kendaraan">
                  <div className="space-y-3">
                    <InfoLine icon={FaCarSide} label="Model" value={`${item.brand} - ${item.type}`} />
                    <InfoLine icon={FaIdBadge} label="Plat" value={item.plate} />
                    <InfoLine
                      icon={FaTools}
                      label="Tahun / KM"
                      value={`${item.year} / ${item.km?.toLocaleString ? item.km.toLocaleString('id-ID') : item.km} km`}
                    />
                  </div>
                </Section>

                <Section title="Riwayat & Catatan">
                  <InfoLine icon={FaTools} label="Service Terakhir" value={item.lastService} />
                  <p className="mt-3">{item.notes || '-'}</p>
                </Section>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-[#eef2f8] bg-white px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-[#dbe3ef] bg-white px-6 py-3 text-sm font-semibold text-[#0f172a] transition hover:border-[#5353e2] hover:text-[#5353e2]"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
