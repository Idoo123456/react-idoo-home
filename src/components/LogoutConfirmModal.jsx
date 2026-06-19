import React from 'react';
import { FaSignOutAlt, FaTimes } from 'react-icons/fa';

const LogoutConfirmModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-6 text-[var(--text)] shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--danger)_12%,var(--surface))] text-[var(--danger)]">
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
          <h2 className="text-xl font-semibold tracking-tight">Logout dari akun?</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
            Sesi admin akan diakhiri dan Anda akan diarahkan kembali ke halaman login.
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
            className="rounded-2xl bg-[var(--danger)] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Ya, Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmModal;
