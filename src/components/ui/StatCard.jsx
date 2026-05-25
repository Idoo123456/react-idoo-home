import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, label, value, note, tone, gradient, delay = 0 }) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -4 }}
      type="button"
      className="group relative overflow-hidden rounded-[20px] border border-[#dbe3ef] bg-white p-6 text-left shadow-[0_10px_28px_rgba(15,23,42,0.06)] transition-all duration-300 hover:border-[#c7d2e4] hover:shadow-[0_16px_36px_rgba(15,23,42,0.09)]"
    >
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={gradient ? { backgroundImage: gradient } : undefined}
      />

      <div className="relative z-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#778096]">
          {label}
        </p>
        <p className="mt-3 text-3xl font-bold text-[#0f172a]">
          {value}
        </p>
        <p className="mt-2 text-sm text-[#5b6478]">{note}</p>
      </div>

      <div className={`absolute right-5 top-5 flex h-14 w-14 items-center justify-center rounded-2xl ${tone} text-white shadow-[0_10px_24px_rgba(15,23,42,0.12)] transition-transform duration-300 group-hover:scale-105`}>
        <Icon className="text-xl" />
      </div>
    </motion.button>
  );
};

export default StatCard;
