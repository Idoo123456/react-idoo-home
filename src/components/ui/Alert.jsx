import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const Alert = ({
  variant = 'info',
  title,
  message,
  icon: Icon,
  closeable = true,
  onClose,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const variants = {
    info: 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
    success: 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200',
    warning: 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200',
    danger: 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
  };

  const iconColors = {
    info: 'text-blue-600 dark:text-blue-400',
    success: 'text-emerald-600 dark:text-emerald-400',
    warning: 'text-amber-600 dark:text-amber-400',
    danger: 'text-red-600 dark:text-red-400',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`rounded-[16px] p-4 flex gap-3 ${variants[variant]} ${className}`}
        >
          {Icon && <Icon className={`text-xl shrink-0 mt-0.5 ${iconColors[variant]}`} />}
          <div className="flex-1">
            {title && <p className="font-semibold text-sm">{title}</p>}
            {message && <p className="text-sm mt-1 opacity-90">{message}</p>}
          </div>
          {closeable && (
            <button
              onClick={handleClose}
              className="shrink-0 mt-0.5 opacity-70 hover:opacity-100 transition"
            >
              <FaTimes className="text-sm" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
