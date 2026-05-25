import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  icon: Icon,
}) => {
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`w-full ${sizes[size]} rounded-[24px] bg-white dark:bg-gray-900 shadow-2xl overflow-hidden`}
            >
              {/* Header */}
              <div className="border-b border-gray-100 dark:border-gray-800 px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {Icon && <Icon className="text-2xl text-blue-600 dark:text-blue-400" />}
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-5 max-h-[calc(100vh-300px)] overflow-y-auto">{children}</div>

              {/* Footer */}
              {footer && (
                <div className="border-t border-gray-100 dark:border-gray-800 px-6 py-4 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3">
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
