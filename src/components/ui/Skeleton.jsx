import React from 'react';
import { motion } from 'framer-motion';

const Skeleton = ({
  height = 'h-4',
  width = 'w-full',
  className = '',
  count = 1,
  variant = 'text', // text, circle, rect
}) => {
  if (variant === 'circle') {
    return (
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className={`rounded-full bg-gray-200 dark:bg-gray-700 ${width} ${height || 'w-12 h-12'} ${className}`}
      />
    );
  }

  if (variant === 'rect') {
    return (
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className={`rounded-lg bg-gray-200 dark:bg-gray-700 ${width} ${height || 'h-32'} ${className}`}
      />
    );
  }

  // Default text variant
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className={`rounded-md bg-gray-200 dark:bg-gray-700 ${width} ${height}`}
        />
      ))}
    </div>
  );
};

export default Skeleton;
