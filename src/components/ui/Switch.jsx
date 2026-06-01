import React from 'react';

const Switch = ({
  checked = false,
  onChange,
  label,
  description,
  className = '',
}) => (
  <label className={`flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900 ${className}`}>
    <span className="min-w-0">
      {label && <span className="block text-sm font-semibold text-gray-900 dark:text-white">{label}</span>}
      {description && (
        <span className="mt-1 block text-xs leading-5 text-gray-500 dark:text-gray-400">{description}</span>
      )}
    </span>
    <input
      type="checkbox"
      checked={checked}
      onChange={(event) => onChange?.(event.target.checked)}
      className="peer sr-only"
    />
    <span
      className={`relative h-6 w-11 shrink-0 rounded-full transition peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-500 ${
        checked ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'
      }`}
    >
      <span
        className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow transition ${
          checked ? 'translate-x-5' : ''
        }`}
      />
    </span>
  </label>
);

export default Switch;
