import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaExclamationTriangle, FaTimes } from 'react-icons/fa';

const iconMap = {
  success: FaCheckCircle,
  error: FaExclamationCircle,
  info: FaInfoCircle,
  warning: FaExclamationTriangle,
};

const colorMap = {
  success: 'from-emerald-500 to-teal-400 text-emerald-800 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800/50 dark:text-emerald-300',
  error: 'from-red-500 to-rose-400 text-red-800 bg-red-50 border-red-200 dark:bg-red-950/40 dark:border-red-800/50 dark:text-red-300',
  info: 'from-blue-500 to-indigo-400 text-blue-800 bg-blue-50 border-blue-200 dark:bg-blue-950/40 dark:border-blue-800/50 dark:text-blue-300',
  warning: 'from-amber-500 to-orange-400 text-amber-800 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:border-amber-800/50 dark:text-amber-300',
};

const iconColorMap = {
  success: 'text-emerald-500 dark:text-emerald-400',
  error: 'text-red-500 dark:text-red-400',
  info: 'text-blue-500 dark:text-blue-400',
  warning: 'text-amber-500 dark:text-amber-400',
};

const ProfessionalAlert = ({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  type = 'info', 
  autoClose = true, 
  autoCloseTime = 5000 
}) => {
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseTime);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseTime, onClose]);

  const Icon = iconMap[type] || iconMap.info;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed left-0 right-0 top-6 z-50 mx-auto w-full max-w-md px-4 sm:px-0"
        >
          <div className={`relative overflow-hidden rounded-2xl border ${colorMap[type]} p-4 shadow-2xl backdrop-blur-xl`}>
            {/* Top gradient highlight */}
            <div className={`absolute left-0 right-0 top-0 h-1 bg-gradient-to-r ${colorMap[type].split(' ')[0]} ${colorMap[type].split(' ')[1]}`} />
            
            <div className="flex items-start gap-4">
              <div className={`mt-0.5 shrink-0 text-2xl ${iconColorMap[type]}`}>
                <Icon />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold tracking-tight">{title}</h3>
                <p className="mt-1 text-sm opacity-90 leading-relaxed">{message}</p>
              </div>
              <button
                onClick={onClose}
                className="shrink-0 rounded-lg p-1.5 opacity-50 transition hover:bg-black/5 hover:opacity-100 dark:hover:bg-white/10"
                aria-label="Tutup"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfessionalAlert;
