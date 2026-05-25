import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  title,
  subtitle,
  action,
  icon: Icon,
  footer,
  className = '',
  hover = true,
  gradient = false,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={hover ? { y: -4 } : {}}
      className={`relative overflow-hidden rounded-[20px] border border-[#dbe3ef] bg-white shadow-[0_10px_28px_rgba(15,23,42,0.06)] transition-all duration-300 ${
        hover ? 'hover:shadow-[0_16px_36px_rgba(15,23,42,0.09)]' : ''
      } ${className}`}
    >
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50" />
      )}

      <div className="relative z-10">
        {(title || subtitle || action || Icon) && (
          <div className="flex items-start justify-between border-b border-[#eef2f8] px-6 py-5">
            <div className="flex-1">
              {Icon && <Icon className="mb-2 text-2xl text-[#5353e2]" />}
              {title && <h3 className="text-lg font-semibold text-[#0f172a]">{title}</h3>}
              {subtitle && <p className="mt-1 text-sm text-[#5b6478]">{subtitle}</p>}
            </div>
            {action && <div>{action}</div>}
          </div>
        )}

        <div className="px-6 py-5">{children}</div>

        {footer && (
          <div className="border-t border-[#eef2f8] bg-[#f8fafc] px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Card;
