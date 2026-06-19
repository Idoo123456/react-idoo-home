import React from 'react';
import { FaSignOutAlt, FaTimes } from 'react-icons/fa';

const LogoutConfirmModal = ({
  isOpen,
  onCancel,
  onConfirm,
  title = 'Logout dari akun?',
  message = 'Sesi admin akan diakhiri dan Anda akan diarahkan kembali ke halaman login.',
  confirmText = 'Ya, Logout',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-sm overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6 text-[var(--text)] shadow-2xl">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 via-rose-500 to-orange-400" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-red-500/10 blur-3xl" />

        <div className="flex items-start justify-between gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--danger)_14%,var(--surface))] text-xl text-[var(--danger)] shadow-lg shadow-red-500/10">
            <FaSignOutAlt />
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--text-soft)] transition hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
            aria-label="Tutup konfirmasi logout"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mt-5">
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
            {message}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--surface-2)]"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-500/30"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmModal;
