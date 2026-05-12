import frameworkData from "./framework.json";
import { motion } from "framer-motion"; // Import framer-motion

export default function FrameworkList() {
  // Varians untuk animasi container (mengatur munculnya anak-anaknya)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Jeda 0.1 detik antar kartu saat muncul
      },
    },
  };

  // Varians untuk setiap kartu
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-rose-50 p-8 overflow-hidden">
      {/* Header Section dengan Animasi Fade-in Down */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto mb-16 text-center"
      >
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
          Eksplorasi <span className="text-rose-600">Framework</span> Modern
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          Pilihlah teknologi terbaik untuk membangun antarmuka web yang indah dan responsif.
        </p>
      </motion.div>

      {/* Grid Layout dengan Staggered Animation */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {frameworkData.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.03, // Sedikit membesar saat hover
              transition: { duration: 0.2 } 
            }}
            whileTap={{ scale: 0.98 }} // Efek klik/tekan
            className="group relative bg-white rounded-2xl p-7 shadow-sm border border-slate-100 hover:shadow-2xl hover:border-rose-100 transition-all duration-300 ease-in-out"
          >
            {/* Dekorasi Aksen Atas dengan Animasi Lebar */}
            <motion.div 
              className="absolute top-0 left-0 h-1.5 bg-gradient-to-r from-rose-400 to-fuchsia-500 rounded-t-2xl"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }} // Garis memanjang saat di-hover
            />

            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-5">
                <h2 className="text-2xl font-bold text-slate-800 group-hover:text-rose-600 transition-colors italic">
                  {item.name}
                </h2>
                <span className="text-[11px] uppercase tracking-widest font-bold bg-rose-100 text-rose-700 px-3 py-1 rounded-full">
                  {item.details.releaseYear}
                </span>
              </div>

              <p className="text-slate-600 leading-relaxed mb-6 flex-grow text-sm">
                {item.description}
              </p>

              <div className="border-t border-rose-100 my-4"></div>

              <div className="mb-6">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Developed by</p>
                <p className="text-sm font-semibold text-rose-900">
                  {item.details.developer}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-7">
                {item.tags.map((tag, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    className="bg-rose-50 text-rose-700 text-[11px] font-semibold px-3 py-1.5 rounded-full border border-rose-100 cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              <motion.a
                href={item.details.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ gap: "12px" }} // Memberi jarak pada ikon saat hover
                className="inline-flex items-center justify-center w-full bg-rose-600 text-white py-3.5 rounded-xl font-semibold hover:bg-gradient-to-r hover:from-rose-600 hover:to-fuchsia-600 transition-all shadow-lg shadow-rose-200"
              >
                Kunjungi Website
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer dengan Animasi Denyut Jantung pada Emoji */}
      <div className="max-w-6xl mx-auto mt-20 text-center text-xs text-rose-300">
        © 2026 Framework Showcase • Dibuat Oleh Mido Sepenuh Hati 
        <motion.span 
          animate={{ scale: [1, 1.3, 1] }} 
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="inline-block ml-1"
        >
          💮
        </motion.span>
      </div>
    </div>
  );
}