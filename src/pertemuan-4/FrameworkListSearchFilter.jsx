import { useState, useMemo } from "react";
import frameworkData from "./framework.json";
import { motion, AnimatePresence } from "framer-motion";

export default function FrameworkListSearchFilter() { 
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedTag: "All", 
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const categories = useMemo(() => {
    const allTags = frameworkData.flatMap((item) => item.tags);
    return ["All", ...new Set(allTags)];
  }, []);

  const filteredFrameworks = useMemo(() => {
    const _searchTerm = dataForm.searchTerm.toLowerCase();
    const _selectedTag = dataForm.selectedTag;

    return frameworkData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(_searchTerm) ||
        item.details.developer.toLowerCase().includes(_searchTerm) ||
        item.tags.some((tag) => tag.toLowerCase().includes(_searchTerm));

      const matchesCategory =
        _selectedTag === "All" || item.tags.includes(_selectedTag);

      return matchesSearch && matchesCategory;
    });
  }, [dataForm]);

  return (
    <div className="min-h-[80vh] px-4 pb-20">
      <div className="max-w-4xl mx-auto mb-10 space-y-6">
        {/* Search Bar */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white p-2 rounded-2xl shadow-xl shadow-rose-100 flex items-center border border-rose-50"
        >
          <div className="relative flex-grow">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-rose-400 text-xl">🔍</span>
            <input
              type="text"
              name="searchTerm" 
              placeholder="Cari Framework atau Developer..."
              value={dataForm.searchTerm}
              onChange={handleChange} 
              className="w-full pl-14 pr-6 py-4 rounded-xl outline-none text-slate-700 font-medium"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              name="selectedTag"
              onClick={() => handleChange({ target: { name: "selectedTag", value: cat } })}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                dataForm.selectedTag === cat
                  ? "bg-rose-600 text-white border-rose-600 shadow-md scale-105"
                  : "bg-white text-rose-400 border-rose-100 hover:border-rose-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {dataForm.searchTerm === "" && dataForm.selectedTag === "All" ? (
            <motion.div key="welcome" className="text-center py-20">
              <div className="text-5xl mb-4 animate-pulse">🌸</div>
              <h2 className="text-2xl font-bold text-slate-800">Cari Teknologi & Creator</h2>
              <p className="text-slate-500 mt-2">Gunakan pencarian atau pilih kategori di atas.</p>
            </motion.div>
          ) : filteredFrameworks.length > 0 ? (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {filteredFrameworks.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  className="bg-white rounded-2xl p-5 border border-rose-100 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-lg transition-all group"
                >
                  <div className="flex-grow text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-rose-600 transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-[10px] bg-rose-50 text-rose-600 px-2 py-0.5 rounded-md font-bold border border-rose-100">
                        By {item.details.developer}
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm italic mt-1">{item.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] px-2 py-1 rounded font-bold bg-slate-50 text-slate-500 border border-slate-100">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={item.details.officialWebsite}
                    target="_blank"
                    className="bg-rose-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-rose-700 transition-all active:scale-95"
                  >
                    Visit Web
                  </a>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="none" className="text-center py-20">
              <div className="text-5xl mb-4">🙊</div>
              <p className="text-slate-800 font-bold">Hasil tidak ditemukan.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}