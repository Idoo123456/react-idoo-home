import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Tooltip = ({
  children,
  content,
  position = 'top',
  variant = 'dark',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: '-top-12 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  };

  const variants = {
    dark: 'bg-gray-900 text-white dark:bg-gray-700',
    light: 'bg-white text-gray-900 border border-gray-200 dark:text-white dark:bg-gray-800 dark:border-gray-700',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`absolute z-50 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap ${
              positionClasses[position]
            } ${variants[variant]} pointer-events-none`}
          >
            {content}
            <div className={`absolute w-2 h-2 bg-${variant === 'dark' ? 'gray-900' : 'white'} dark:bg-gray-700 transform rotate-45`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
