import React from 'react';
import { motion } from 'framer-motion'; // Pastikan framer-motion terinstal

// --- 1. Sub-component Text (Dibuat Lebih Elegan) ---
function ResponsiveText() {
  return (
    <div className="p-8 md:p-10 border-b border-rose-100/50">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">✍️</span>
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">1. Responsive Text Typography</h2>
      </div>
      
      {/* Tipografi ditingkatkan dengan leading-relaxed dan warna slate-600 */}
      <p className="text-sm md:text-base lg:text-lg xl:text-xl text-slate-600 leading-relaxed max-w-3xl bg-rose-50/50 p-6 rounded-2xl border border-rose-100">
        Coba lakukan <span className="font-semibold text-rose-600 underline decoration-wavy decoration-rose-300">zoom in</span> atau <span className="font-semibold text-rose-600 underline decoration-wavy decoration-rose-300">zoom out</span> pada browser Anda. Perhatikan bagaimana ukuran teks ini akan menyesuaikan secara halus mengikuti lebar layar, memberikan pengalaman membaca yang optimal di perangkat apa pun.
      </p>
    </div>
  );
}

// --- 2. Sub-component Width & Flex (Dibuat Lebih Modern) ---
function ResponsiveWidth() {
  return (
    <div className="p-8 md:p-10 border-b border-rose-100/50">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">↔️</span>
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">2. Responsive Width & Flexbox</h2>
      </div>

      <p className="text-sm text-slate-500 mb-8 max-w-2xl">
        Gunakan breakpoint <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded text-rose-600">md:</code> untuk mengubah tumpukan vertikal (mobile) menjadi baris horizontal (tablet/desktop) secara otomatis.
      </p>

      {/* Container Flex dengan gap yang pas dan sudut extra rounded */}
      <div className="flex flex-col md:flex-row gap-6">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-rose-400 to-rose-500 w-full md:w-1/2 p-8 rounded-3xl text-white shadow-lg shadow-rose-100 border border-rose-300/50"
        >
          <p className="font-bold text-lg mb-1">Kolom Mawar</p>
          <p className="text-xs opacity-80">Mobile: Full Width | Tablet+: 50% Width</p>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-sky-400 to-sky-500 w-full md:w-1/2 p-8 rounded-3xl text-white shadow-lg shadow-sky-100 border border-sky-300/50"
        >
          <p className="font-bold text-lg mb-1">Kolom Langit</p>
          <p className="text-xs opacity-80">Mobile: Full Width | Tablet+: 50% Width</p>
        </motion.div>
      </div>
    </div>
  );
}

// --- 3. Sub-component Grid Layout (Dibuat Lebih Mewah) ---
function ResponsiveLayout() {
  const boxes = [
    { id: 1, color: "from-emerald-400 to-emerald-600" },
    { id: 2, color: "from-teal-400 to-teal-600" },
    { id: 3, color: "from-cyan-400 to-cyan-600" },
    { id: 4, color: "from-sky-400 to-sky-600" },
  ];

  return (
    <div className="p-8 md:p-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">📱</span>
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">3. Responsive Grid System Layout</h2>
      </div>

      <p className="text-sm text-slate-500 mb-8 max-w-2xl">
        Sistem Grid Tailwind CSS memungkinkan Anda menentukan jumlah kolom yang berbeda untuk setiap ukuran layar. Coba kecilkan layar browser untuk melihat perubahannya.
      </p>
      
      {/* Grid responsif: 1 kolom (HP), 2 (Tablet Kecil), 3 (Tablet Besar), 4 (Desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {boxes.map((box) => (
          <motion.div
            key={box.id}
            layout
            whileHover={{ y: -8, shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            className={`bg-gradient-to-br ${box.color} p-10 rounded-3xl text-white font-extrabold text-center shadow-md shadow-slate-100 border border-white/20 relative overflow-hidden group`}
          >
            {/* Efek kilauan saat hover */}
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-3xl"></div>
            
            <span className="relative z-10 text-lg tracking-wider">BOX {box.id}</span>
            <p className="relative z-10 text-[10px] font-medium opacity-70 mt-1">Grid Item</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// --- COMPONENT PARENT (Tampilan Utama yang Dipercantik) ---
export default function ResponsiveDesign() {
  return (
    // Latar belakang pink pastel yang sangat lembut
    <div className="min-h-screen bg-[#FFFDFD] p-6 md:p-12 font-sans">
      
      {/* Header dengan tipografi Black dan gradasi */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto text-center mb-16"
      >
        <span className="inline-block bg-rose-100 text-rose-600 px-4 py-1 rounded-full text-xs font-bold mb-3 border border-rose-200 shadow-inner">
          Pertemuan 4 - Desain Web
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">
          Mastering <span className="text-rose-600 bg-gradient-to-r from-rose-600 to-fuchsia-600 bg-clip-text text-transparent">Responsive Design</span>
        </h1>
        <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
          Pelajari teknik adaptasi tampilan website untuk berbagai perangkat, mulai dari Mobile, Tablet, hingga Desktop menggunakan Tailwind CSS.
        </p>
      </motion.div>
      
      {/* Container Utama: Putih Bersih, Sudut Extra Rounded, Shadow Lembut */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="max-w-6xl mx-auto bg-white shadow-2xl shadow-rose-100/70 rounded-[40px] border border-rose-100/50 overflow-hidden"
      >
        <ResponsiveText />
        <ResponsiveWidth />
        <ResponsiveLayout />
      </motion.div>

      {/* Footer opsional */}
      <div className="max-w-6xl mx-auto mt-20 text-center text-xs text-rose-300 font-medium tracking-wide">
        © 2026 MIDODEV TUTORIAL SERIES • CRAFTED WITH 💖 AND PINK POWER
      </div>
    </div>
  );
}