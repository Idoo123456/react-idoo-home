import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const Accordion = ({ items = [], defaultValue, className = '' }) => {
  const [openValue, setOpenValue] = useState(defaultValue ?? items[0]?.value);

  return (
    <div className={`divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900 ${className}`}>
      {items.map((item) => {
        const isOpen = openValue === item.value;

        return (
          <div key={item.value}>
            <button
              type="button"
              onClick={() => setOpenValue(isOpen ? '' : item.value)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-gray-900 transition hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <FaChevronDown className={`shrink-0 text-xs text-gray-400 transition ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
              <div className="px-4 pb-4 text-sm leading-6 text-gray-600 dark:text-gray-400">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
