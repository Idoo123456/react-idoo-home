import React from 'react';
import { motion } from 'framer-motion';

const InputField = ({
  label,
  placeholder,
  type = 'text',
  icon: Icon,
  value,
  onChange,
  error,
  success,
  disabled = false,
  size = 'md',
  className = '',
  required = false,
  ...props
}) => {
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-5 py-3 text-lg',
  };

  const borderColor = error
    ? 'border-red-500 focus:border-red-500'
    : success
      ? 'border-emerald-500 focus:border-emerald-500'
      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400';

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none text-lg" />
        )}

        <motion.input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full rounded-[12px] border-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 ${
            sizes[size]
          } ${Icon ? 'pl-11' : ''} ${borderColor} focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
          {...props}
        />

        {success && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500 text-lg"
          >
            ✓
          </motion.div>
        )}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-500 font-medium"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default InputField;
