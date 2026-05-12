import React, { useState } from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa';

const AddMenusModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'main',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Menu "${formData.name}" berhasil ditambahkan!`);
    setFormData({ name: '', price: '', category: 'main', description: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[28px] shadow-2xl w-full max-w-md max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-slate-200 bg-white rounded-t-[28px]">
          <h2 className="text-2xl font-bold text-slate-900">Add New Menu</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition"
          >
            <FaTimes className="text-slate-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Menu Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Menu Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Nasi Goreng Spesial"
              required
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Price (Rp) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g., 25000"
              required
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="main">Main Course</option>
              <option value="side">Side Dish</option>
              <option value="drink">Drink</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Optional description..."
              rows="3"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl border-2 border-slate-300 px-4 py-3 font-semibold text-slate-900 transition hover:bg-slate-100 hover:border-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3 font-semibold text-white transition hover:shadow-lg flex items-center justify-center gap-2"
            >
              <FaCheck /> Add Menu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMenusModal;
