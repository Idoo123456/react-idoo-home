import React from 'react';
import { motion } from 'framer-motion';

const GradientButton = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  onClick,
  className = '',
  ...props
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-[#5353e2] to-[#4338ca] hover:shadow-lg hover:shadow-[#5353e2]/40 text-white',
    secondary: 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 hover:shadow-lg text-gray-900 dark:text-white',
    success: 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-lg hover:shadow-emerald-500/40 text-white',
    danger: 'bg-gradient-to-r from-red-500 to-rose-600 hover:shadow-lg hover:shadow-red-500/40 text-white',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`rounded-[14px] font-semibold transition-all duration-300 flex items-center gap-2 ${
        variants[variant]
      } ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="text-lg" />}
      {children}
    </motion.button>
  );
};

export default GradientButton;
