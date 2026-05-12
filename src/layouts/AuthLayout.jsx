import React from 'react';
import { Outlet } from 'react-router-dom';
import { FaTools } from 'react-icons/fa';

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center overflow-hidden bg-[#7db4ee] px-5 py-6 text-[#111827]">
      <div className="grid min-h-[calc(100vh-48px)] w-full max-w-[1210px] overflow-hidden bg-white shadow-[0_30px_90px_rgba(15,23,42,0.14)] lg:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-[#3b35ad] lg:block">
          <div className="absolute -right-24 -top-28 h-56 w-56 rounded-full bg-[#c8c6e8]" />
          <div className="absolute right-[-120px] top-[72px] h-64 w-64 rounded-full bg-[#c8c6e8]" />
          <div className="absolute -left-32 bottom-8 h-64 w-64 rounded-full bg-[#c8c6e8]" />
          <div className="absolute bottom-[-116px] left-20 h-64 w-64 rounded-full bg-[#c8c6e8]" />
          <div className="absolute -left-16 bottom-20 h-44 w-44 rotate-45 rounded-[70%_35%_65%_35%] bg-[#c8c6e8]" />

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-12 text-center text-white">
            <div className="mb-5 flex items-center justify-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl text-[#3b35ad]">
                <FaTools />
              </div>
              <div className="text-left">
                <h1 className="text-5xl font-black leading-[0.9] tracking-tight">BENGKEL</h1>
                <h2 className="text-5xl font-black leading-[0.9] tracking-tight">PRO</h2>
              </div>
            </div>
            <p className="text-2xl font-semibold">Join Today</p>
          </div>
        </section>

        <section className="flex min-h-full items-center justify-center bg-white px-6 py-10 sm:px-10">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default AuthLayout;
