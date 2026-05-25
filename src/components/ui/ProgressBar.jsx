import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ 
  value = 0, 
  max = 100, 
  variant = 'primary',
  size = 'md',
  animated = true,
  label = null,
  showValue = false,
}) => {
  const percentage = (value / max) * 100;

  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-blue-600',
    success: 'bg-gradient-to-r from-emerald-500 to-teal-600',
    warning: 'bg-gradient-to-r from-amber-500 to-orange-600',
    danger: 'bg-gradient-to-r from-red-500 to-rose-600',
  };

  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between">
          {label && <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>}
          {showValue && <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={`w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden ${sizes[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: animated ? 1 : 0 }}
          className={`h-full rounded-full ${variants[variant]} shadow-lg`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
