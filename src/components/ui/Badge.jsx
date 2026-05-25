import React from 'react';

const Badge = ({ children, variant = 'primary', size = 'md', icon: Icon, className = '' }) => {
  const variants = {
    primary: 'border border-[#bfdbfe] bg-[#dbeafe] text-[#1d4ed8]',
    success: 'border border-[#bbf7d0] bg-[#dcfce7] text-[#15803d]',
    warning: 'border border-[#fde68a] bg-[#fef3c7] text-[#b45309]',
    danger: 'border border-[#fecaca] bg-[#fee2e2] text-[#b91c1c]',
    secondary: 'border border-[#cbd5e1] bg-[#f1f5f9] text-[#334155]',
  };

  const sizes = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span className={`rounded-full font-semibold inline-flex items-center gap-2 ${variants[variant]} ${sizes[size]} ${className}`}>
      {Icon && <Icon className="text-sm" />}
      {children}
    </span>
  );
};

export default Badge;
