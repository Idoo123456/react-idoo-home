import React, { useState, useRef, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const modalRef = useRef(null);

  // All searchable data
  const allData = [
    // Orders
    { id: '1001', name: 'Order #1001', category: 'Orders', date: '2026-04-15', type: 'order' },
    { id: '1002', name: 'Order #1002', category: 'Orders', date: '2026-04-15', type: 'order' },
    { id: '1003', name: 'Order #1003', category: 'Orders', date: '2026-04-15', type: 'order' },
    { id: '1004', name: 'Order #1004 - Fikri', category: 'Orders', date: '2026-04-14', type: 'order' },
    // Customers
    { id: 'c1', name: 'Fikri Muhaffizh', category: 'Customers', email: 'fikri@email.com', type: 'customer' },
    { id: 'c2', name: 'Ahmad Hidayat', category: 'Customers', email: 'ahmad@email.com', type: 'customer' },
    { id: 'c3', name: 'Siti Nurhaliza', category: 'Customers', email: 'siti@email.com', type: 'customer' },
    // Menu Items
    { id: 'm1', name: 'Nasi Goreng Spesial', category: 'Menu', price: 'Rp 45.000', type: 'menu' },
    { id: 'm2', name: 'Soto Ayam', category: 'Menu', price: 'Rp 30.000', type: 'menu' },
    { id: 'm3', name: 'Rendang Daging', category: 'Menu', price: 'Rp 55.000', type: 'menu' },
    { id: 'm4', name: 'Gado-Gado', category: 'Menu', price: 'Rp 25.000', type: 'menu' },
  ];

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setResults([]);
    } else {
      const filtered = allData.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.email && item.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.price && item.price.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.date && item.date.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setResults(filtered);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/30 flex items-start justify-center pt-20 z-50">
      <div ref={modalRef} className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-semibold text-slate-900">Quick Search</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition" type="button">
            <FaTimes className="text-slate-600" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-6 bg-slate-50">
          <input
            type="text"
            placeholder="Search orders, customers, or menu items"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            autoFocus
          />
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto">
          {searchQuery.trim() === "" ? (
            <div className="p-8 text-center text-slate-400">
              <p className="text-lg">Start typing to search...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <p className="text-lg">No results found for "{searchQuery}"</p>
            </div>
          ) : (
            <div className="space-y-3 p-4">
              {results.map((result) => (
                <div
                  key={result.id}
                  onClick={() => {
                    alert(`Opening: ${result.name}`);
                    onClose();
                  }}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-emerald-300 hover:shadow-md cursor-pointer transition"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">{result.name}</p>
                      <p className="text-sm text-slate-500 mt-1">
                        {result.email || result.price || result.date}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 whitespace-nowrap">
                      {result.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {results.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 text-center text-sm text-slate-600">
            Found <span className="font-semibold">{results.length}</span> result{results.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
