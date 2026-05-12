import React from 'react';

const BlankPage = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#f4f6fb] px-6">
      <div className="rounded-[24px] border border-[#d7deea] bg-white px-6 py-5 text-center shadow-lg">
        <p className="text-sm uppercase tracking-[0.24em] text-[#5353e2]">BengkelPro</p>
        <h1 className="mt-2 text-2xl font-semibold text-[#0f172a]">Halaman kosong</h1>
        <p className="mt-2 text-sm text-[#5b6478]">Jika route ini dipakai, tetap ada tampilan yang jelas.</p>
      </div>
    </div>
  );
};

export default BlankPage;
