import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Badge from './Badge';

const DataTable = ({ 
  columns, 
  data, 
  pageSize = 10,
  striped = true,
  hover = true,
  compact = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / pageSize);
  const startIdx = (currentPage - 1) * pageSize;
  const paginatedData = data.slice(startIdx, startIdx + pageSize);

  return (
    <div className="w-full rounded-[22px] border border-gray-200/50 dark:border-gray-700/50 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-300 ${
                    col.className || ''
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, idx) => (
              <motion.tr
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className={`border-b border-gray-100 dark:border-gray-800 transition-colors ${
                  striped && idx % 2 === 1 ? 'bg-gray-50/50 dark:bg-gray-800/30' : ''
                } ${hover ? 'hover:bg-blue-50 dark:hover:bg-gray-800' : ''}`}
              >
                {columns.map((col) => (
                  <td key={col.key} className={`px-6 py-4 ${compact ? 'py-3' : ''}`}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 px-6 py-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Halaman {currentPage} dari {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Sebelumnya
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg bg-blue-500 text-white disabled:opacity-50 hover:bg-blue-600 transition"
            >
              Berikutnya
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
