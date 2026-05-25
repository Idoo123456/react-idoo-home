import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCard = ({
  children,
  className = '',
  gradient = false,
  hover = true,
  delay = 0,
  onClick,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={
        hover
          ? { y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }
          : {}
      }
      onClick={onClick}
      className={`group relative overflow-hidden rounded-[22px] border border-gray-200/50 dark:border-gray-700/50 bg-white dark:bg-gray-900 transition-all duration-300 ${className}`}
      {...props}
    >
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default AnimatedCard;
