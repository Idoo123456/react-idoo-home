import { useState } from "react";
import { createRoot } from "react-dom/client";
import "./tailwind.css";
import FrameworkList from "./FrameworkList";
import FrameworkListSearchFilter from "./FrameworkListSearchFilter";
// PERBAIKAN: Karena main.jsx ada di folder yang sama, cukup gunakan ./
import ResponsiveDesign from "./ResponsiveDesign"; 
import { motion, AnimatePresence } from "framer-motion";

function App() {
  // State untuk berpindah halaman sesuai materi yang dipelajari
  const [activeTab, setActiveTab] = useState("responsive");

  return (
    <div className="bg-rose-50 min-h-screen font-sans text-slate-900">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌸</span>
            <span className="font-bold tracking-tight text-xl">MIDO<span className="text-rose-600">DEV</span></span>
          </div>

          {/* Menu Tab Navigasi */}
          <div className="flex bg-rose-100/50 p-1 rounded-xl border border-rose-100 gap-1">
            <button
              onClick={() => setActiveTab("responsive")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "responsive" ? "bg-white text-rose-600 shadow-sm" : "text-rose-400 hover:text-rose-600"
              }`}
            >
              Responsive
            </button>
            <button
              onClick={() => setActiveTab("list")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "list" ? "bg-white text-rose-600 shadow-sm" : "text-rose-400 hover:text-rose-600"
              }`}
            >
              Daftar
            </button>
            <button
              onClick={() => setActiveTab("search")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "search" ? "bg-white text-rose-600 shadow-sm" : "text-rose-400 hover:text-rose-600"
              }`}
            >
              Cari
            </button>
          </div>
        </div>
      </nav>

      {/* Area Konten Utama */}
      <main className="container mx-auto py-6">
        <AnimatePresence mode="wait">
          {/* Halaman Materi Responsive & Grid Design */}
          {activeTab === "responsive" && (
            <motion.div
              key="responsive"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ResponsiveDesign />
            </motion.div>
          )}

          {/* Halaman List Biasa */}
          {activeTab === "list" && (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <FrameworkList />
            </motion.div>
          )}

          {/* Halaman Cari dengan Best Practice State */}
          {activeTab === "search" && (
            <motion.div
              key="search"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <FrameworkListSearchFilter />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// Render Aplikasi ke DOM
createRoot(document.getElementById("root")).render(<App />);