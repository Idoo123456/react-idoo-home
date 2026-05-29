import React from 'react';
import {
  FaBoxOpen,
  FaBullhorn,
  FaCalendarAlt,
  FaCarSide,
  FaCity,
  FaCommentDots,
  FaEnvelope,
  FaIdBadge,
  FaLaptop,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaSignal,
  FaStar,
  FaTimes,
  FaTools,
  FaUser,
  FaUserTag,
  FaVenusMars,
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
  <section className="rounded-[18px] border border-[var(--border)] bg-[var(--surface-2)] p-4">
    <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">{title}</h4>
    <div className="mt-3 text-sm text-[var(--text-muted)]">{children}</div>
  </section>
);

const InfoLine = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--surface)] text-[var(--primary)] shadow-[0_4px_12px_rgba(15,23,42,0.06)]">
      <Icon className="text-sm" />
    </span>
    <span className="min-w-0">
      <span className="block text-xs text-[var(--text-soft)]">{label}</span>
      <span className="block break-words font-semibold text-[var(--text)]">{value || '-'}</span>
    </span>
  </div>
);

const MiniCard = ({ title, subtitle }) => (
  <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3">
    <div className="font-semibold text-[var(--text)]">{title}</div>
    {subtitle && <div className="mt-1 text-xs text-[var(--text-soft)]">{subtitle}</div>}
  </div>
);

const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const getVehicleCount = (vehicles) => (Array.isArray(vehicles) ? vehicles.length : Number(vehicles || 0));

const ProfileStat = ({ icon: Icon, label, value, tone = 'text-[var(--primary)]', bg = 'bg-[color-mix(in_srgb,var(--primary)_14%,transparent)]' }) => (
  <div className="rounded-[18px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
    <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${bg} ${tone}`}>
      <Icon />
    </div>
    <div className="mt-3 text-xs uppercase tracking-[0.16em] text-[var(--text-soft)]">{label}</div>
    <div className="mt-1 text-lg font-semibold text-[var(--text)]">{value || '-'}</div>
  </div>
);

const DetailBlock = ({ title, children }) => (
  <section className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
    <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">{title}</h4>
    <div className="mt-4 space-y-4 text-sm text-[var(--text-muted)]">{children}</div>
  </section>
);

const CustomerDetailModal = ({ item, onClose }) => {
  const vehicles = Array.isArray(item.vehicles) ? item.vehicles : [];
  const vehicleCount = getVehicleCount(item.vehicles);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/50 p-4 backdrop-blur-sm">
      <div className="max-h-[92dvh] w-full max-w-5xl overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface-2)] shadow-[0_28px_90px_rgba(15,23,42,0.28)]">
        <div className="relative overflow-hidden bg-[linear-gradient(135deg,var(--primary)_0%,var(--secondary)_58%,var(--primary-strong)_100%)] px-6 py-6 text-white">
          <div className="absolute right-6 top-6 h-24 w-24 rounded-full border border-white/15" />
          <div className="absolute bottom-[-36px] right-24 h-32 w-32 rounded-full border border-white/10" />
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex min-w-0 flex-col gap-5 md:flex-row md:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[24px] bg-white text-2xl font-semibold text-[#5353e2] shadow-[0_18px_45px_rgba(15,23,42,0.22)]">
                {getInitials(item.name)}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/72">Profil Customer</p>
                <h3 className="mt-2 truncate text-3xl font-semibold">{item.name}</h3>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                  <span className="rounded-full bg-white/16 px-3 py-1.5">{item.id}</span>
                  <span className="rounded-full bg-white/16 px-3 py-1.5">{item.gender}</span>
                  <span className="rounded-full bg-white/16 px-3 py-1.5">{item.memberStatus}</span>
                  <span className="rounded-full bg-[var(--accent)] px-3 py-1.5 text-[#1e293b]">{item.membershipLevel || item.level}</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/12 text-white transition hover:bg-white/22"
              aria-label="Tutup detail"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        <div className="max-h-[calc(92dvh-180px)] overflow-y-auto p-5">
          <div className="grid gap-4 md:grid-cols-4">
            <ProfileStat icon={FaCalendarAlt} label="Tanggal Daftar" value={item.joinedDate || item.joined} bg="bg-[color-mix(in_srgb,var(--primary)_14%,transparent)]" tone="text-[var(--primary)]" />
            <ProfileStat icon={FaCarSide} label="Kendaraan" value={`${vehicleCount} terdaftar`} tone="text-[var(--warning)]" bg="bg-[color-mix(in_srgb,var(--warning)_16%,transparent)]" />
            <ProfileStat icon={FaSignal} label="Login Terakhir" value={item.lastLogin} tone="text-[var(--success)]" bg="bg-[color-mix(in_srgb,var(--success)_16%,transparent)]" />
            <ProfileStat icon={FaBullhorn} label="Campaign" value={item.campaign} tone="text-[var(--danger)]" bg="bg-[color-mix(in_srgb,var(--danger)_14%,transparent)]" />
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="space-y-4">
              <DetailBlock title="Informasi Kontak">
                <InfoLine icon={FaPhoneAlt} label="Nomor HP" value={item.phone} />
                <InfoLine icon={FaEnvelope} label="Email" value={item.email} />
                <InfoLine icon={FaMapMarkerAlt} label="Alamat" value={item.address} />
                <InfoLine icon={FaCity} label="Kota / Provinsi" value={item.cityProvince} />
              </DetailBlock>

              <DetailBlock title="Kendaraan Pelanggan">
                {vehicles.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {vehicles.map((vehicle, index) => (
                      <div key={`${vehicle.plate}-${index}`} className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div className="font-semibold text-[var(--text)]">{vehicle.make || vehicle.brand} {vehicle.model || ''}</div>
                          <FaCarSide className="text-[var(--primary)]" />
                        </div>
                        <div className="mt-2 text-xs text-[var(--text-soft)]">Plat {vehicle.plate} - Tahun {vehicle.year}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <MiniCard title={`${vehicleCount} kendaraan terdaftar`} subtitle="Detail kendaraan belum diisi." />
                )}
              </DetailBlock>
            </div>

            <div className="space-y-4">
              <DetailBlock title="Membership">
                <InfoLine icon={FaIdBadge} label="Status Member" value={item.memberStatus} />
                <InfoLine icon={FaStar} label="Level Membership" value={item.membershipLevel || item.level} />
                <InfoLine icon={FaCalendarAlt} label="Kunjungan Terakhir" value={item.lastVisit} />
              </DetailBlock>

              <DetailBlock title="Akuisisi & Aktivitas">
                <InfoLine icon={FaUserTag} label="Sumber User" value={item.source} />
                <InfoLine icon={FaBullhorn} label="Campaign Diikuti" value={item.campaign} />
                <InfoLine icon={FaLaptop} label="Device Digunakan" value={item.device} />
                <InfoLine icon={FaMapMarkerAlt} label="Lokasi Login" value={item.loginLocation} />
              </DetailBlock>

              <section className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--primary)_14%,transparent)] text-[var(--primary)]">
                    <FaCommentDots />
                  </span>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">Feedback / Review</h4>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">{item.feedback || '-'}</p>
                  </div>
                </div>
                <div className="mt-4 rounded-2xl bg-[var(--surface-2)] p-4 text-sm text-[var(--text-muted)]">
                  <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-soft)]">Catatan Bengkel</span>
                  <span className="mt-1 block">{item.notes || '-'}</span>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-[var(--border)] bg-[var(--surface)] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

const DetailModal = ({ open, onClose, type, item, related = {} }) => {
  if (!open || !item) return null;

  const meta = modalMeta[type] || modalMeta.customer;
  const HeaderIcon = meta.icon;
  const title = item.name || item.id || item.plate;
  const subtitle = item.id ? `ID: ${item.id}` : item.plate ? `Plat: ${item.plate}` : meta.tag;

  if (type === 'customer') {
    return <CustomerDetailModal item={item} onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/45 p-4 backdrop-blur-sm">
      <div className="max-h-[88dvh] w-full max-w-3xl overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--surface)] shadow-[0_24px_80px_rgba(15,23,42,0.24)]">
        <div className="border-b border-[var(--border)] bg-[linear-gradient(135deg,var(--surface),var(--surface-2))] px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-4">
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${meta.tone} text-white shadow-[0_12px_28px_rgba(83,83,226,0.22)]`}>
                <HeaderIcon className="text-xl" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">{meta.label}</p>
                <h3 className="mt-1 truncate text-2xl font-semibold text-[var(--text)]">{title}</h3>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{subtitle}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
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
                    <InfoLine icon={FaVenusMars} label="Jenis Kelamin" value={item.gender} />
                    <InfoLine icon={FaPhoneAlt} label="Nomor HP" value={item.phone} />
                    <InfoLine icon={FaEnvelope} label="Email" value={item.email} />
                    <InfoLine icon={FaMapMarkerAlt} label="Alamat" value={item.address} />
                    <InfoLine icon={FaCity} label="Kota / Provinsi" value={item.cityProvince} />
                  </div>
                </Section>

                <Section title="Membership">
                  <div className="space-y-3">
                    <InfoLine icon={FaCalendarAlt} label="Tanggal Daftar" value={item.joinedDate || item.joined} />
                    <InfoLine icon={FaIdBadge} label="Status Member" value={item.memberStatus} />
                    <InfoLine icon={FaStar} label="Level Membership" value={item.membershipLevel || item.level} />
                  </div>
                </Section>

                <Section title="Akuisisi">
                  <div className="space-y-3">
                    <InfoLine icon={FaUserTag} label="Sumber User" value={item.source} />
                    <InfoLine icon={FaBullhorn} label="Campaign Diikuti" value={item.campaign} />
                  </div>
                </Section>

                <Section title="Kendaraan">
                  <div className="space-y-2">
                    {Array.isArray(item.vehicles) ? (
                      item.vehicles.map((vehicle, index) => (
                        <MiniCard
                          key={`${vehicle.plate}-${index}`}
                          title={`${vehicle.make || vehicle.brand} ${vehicle.model || ''} - ${vehicle.year}`}
                          subtitle={`Plat: ${vehicle.plate}`}
                        />
                      ))
                    ) : (
                      <MiniCard title={`${item.vehicles || 0} kendaraan terdaftar`} />
                    )}
                  </div>
                </Section>

                <Section title="Feedback / Review">
                  <div className="space-y-3">
                    <InfoLine icon={FaCommentDots} label="Review" value={item.feedback} />
                  </div>
                </Section>

                <Section title="Aktivitas User">
                  <div className="space-y-3">
                    <InfoLine icon={FaSignal} label="Login Terakhir" value={item.lastLogin} />
                    <InfoLine icon={FaLaptop} label="Device Digunakan" value={item.device} />
                    <InfoLine icon={FaMapMarkerAlt} label="Lokasi Login" value={item.loginLocation} />
                  </div>
                </Section>

                <Section title="Catatan Bengkel">
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
                  <div className="mt-3 rounded-2xl bg-[color-mix(in_srgb,var(--warning)_16%,transparent)] px-4 py-3 font-semibold text-[var(--warning)]">
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

        <div className="flex justify-end gap-3 border-t border-[var(--border)] bg-[var(--surface)] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
