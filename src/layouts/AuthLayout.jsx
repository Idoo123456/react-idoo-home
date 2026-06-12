import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="h-dvh w-full overflow-hidden bg-white text-slate-900">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
