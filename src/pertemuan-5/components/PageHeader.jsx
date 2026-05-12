import React from 'react';

const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-10 pb-6 border-b border-slate-200">
      <div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">{title}</h1>
      </div>
      <div className="mt-4 text-sm text-slate-500 font-medium">{subtitle || 'Home / Home Detail / Home Very Detail'}</div>
    </div>
  );
};

export default PageHeader;
