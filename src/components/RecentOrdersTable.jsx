import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';

const RecentOrdersTable = () => {
  const orders = [
    { id: '#1245', customer: 'Fikri Muhaffizh', amount: 'Rp 125.000', status: 'completed', date: '15 Apr 2026' },
    { id: '#1244', customer: 'Ahmad Hidayat', amount: 'Rp 85.000', status: 'pending', date: '15 Apr 2026' },
    { id: '#1243', customer: 'Siti Nurhaliza', amount: 'Rp 210.000', status: 'completed', date: '14 Apr 2026' },
    { id: '#1242', customer: 'Budi Santoso', amount: 'Rp 65.000', status: 'cancelled', date: '14 Apr 2026' },
    { id: '#1241', customer: 'Mido Herdiansyah', amount: 'Rp 150.000', status: 'completed', date: '13 Apr 2026' },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className="text-emerald-500" />;
      case 'pending':
        return <FaClock className="text-amber-500" />;
      case 'cancelled':
        return <FaTimesCircle className="text-rose-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-700';
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      case 'cancelled':
        return 'bg-rose-100 text-rose-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900">Recent Orders</h3>
        <p className="text-sm text-slate-500 mt-1">Last 5 orders from customers</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left px-4 py-3 font-semibold text-slate-900 text-sm">Order ID</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-900 text-sm">Customer</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-900 text-sm">Amount</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-900 text-sm">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-900 text-sm">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                className="border-b border-slate-100 hover:bg-slate-50 transition"
              >
                <td className="px-4 py-4 font-semibold text-slate-900">{order.id}</td>
                <td className="px-4 py-4 text-slate-600">{order.customer}</td>
                <td className="px-4 py-4 font-semibold text-slate-900">{order.amount}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 text-slate-500 text-sm">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View All Button */}
      <div className="mt-6 text-center">
        <Link
          to="/orders"
          className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-2xl shadow-md transition hover:shadow-lg hover:scale-105"
        >
          View All Orders →
        </Link>
      </div>
    </div>
  );
};

export default RecentOrdersTable;
