import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

const Select = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Pilih opsi',
  helperText,
  className = '',
}) => (
  <label className={`block w-full ${className}`}>
    {label && (
      <span className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
        {label}
      </span>
    )}
    <span className="relative block">
      <select
        value={value}
        onChange={onChange}
        className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 pr-10 text-sm font-medium text-gray-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400" />
    </span>
    {helperText && (
      <span className="mt-2 block text-xs text-gray-500 dark:text-gray-400">{helperText}</span>
    )}
  </label>
);

export default Select;
