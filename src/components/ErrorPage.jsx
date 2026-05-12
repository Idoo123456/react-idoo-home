import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const ErrorPage = ({ code, description, image, backPath = '/dashboard', backLabel = 'Kembali ke Dashboard' }) => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-96px)] px-6 bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.16),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(14,165,233,0.12),_transparent_30%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.3fr_1fr] p-10">
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
              Error {code}
            </span>
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">Oops! Ada masalah.</h1>
            <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
              {description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to={backPath}
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3 text-white shadow-lg transition hover:bg-emerald-600"
              >
                <FaArrowLeft />
                {backLabel}
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-6 py-3 text-slate-700 transition hover:bg-slate-50"
              >
                Dashboard
              </Link>
            </div>
            <p className="text-sm text-slate-400">Kode Error: {code} • IDOO SODAP Error Page</p>
          </div>

          <div className="flex items-center justify-center">
            {image ? (
              <img
                src={image}
                alt={`Error ${code}`}
                className="max-h-96 w-full rounded-[28px] object-cover shadow-xl"
              />
            ) : (
              <div className="flex h-96 w-full items-center justify-center rounded-[28px] border border-dashed border-slate-300 bg-slate-50 text-center text-slate-400">
                Gambar Error Tidak Tersedia
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
