import React, { useState } from 'react';
import { FaCheckCircle, FaClock, FaTimesCircle, FaEye, FaDownload } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';

const Orders = () => {
  const [filter, setFilter] = useState('all');

  const ordersData = [
    { id: '1001', customer: 'Fikri Muhaffizh', amount: 'Rp.150.000', status: 'delivered', date: '2026-04-15', items: 3 },
    { id: '1002', customer: 'Ahmad Hidayat', amount: 'Rp.285.000', status: 'delivered', date: '2026-04-15', items: 5 },
    { id: '1003', customer: 'Siti Nurhaliza', amount: 'Rp.95.000', status: 'pending', date: '2026-04-15', items: 2 },
    { id: '1004', customer: 'Budi Santoso', amount: 'Rp.420.000', status: 'delivered', date: '2026-04-14', items: 8 },
    { id: '1005', customer: 'Dewi Lestari', amount: 'Rp.180.000', status: 'cancelled', date: '2026-04-14', items: 4 },
    { id: '1006', customer: 'Rudi Hermawan', amount: 'Rp.250.000', status: 'delivered', date: '2026-04-14', items: 6 },
    { id: '1007', customer: 'Nina Wijaya', amount: 'Rp.175.000', status: 'pending', date: '2026-04-13', items: 3 },
    { id: '1008', customer: 'Hendra Saputra', amount: 'Rp.320.000', status: 'delivered', date: '2026-04-13', items: 7 },
    { id: '1009', customer: 'Rina Wijaksono', amount: 'Rp.210.000', status: 'pending', date: '2026-04-13', items: 5 },
    { id: '1010', customer: 'Bambang Irawan', amount: 'Rp.145.000', status: 'delivered', date: '2026-04-12', items: 2 },
    { id: '1011', customer: 'Choirul Anwar', amount: 'Rp.380.000', status: 'delivered', date: '2026-04-12', items: 9 },
    { id: '1012', customer: 'Laila Istiqomah', amount: 'Rp.220.000', status: 'cancelled', date: '2026-04-12', items: 4 },
    { id: '1013', customer: 'Maudy Kusuma', amount: 'Rp.290.000', status: 'pending', date: '2026-04-11', items: 6 },
    { id: '1014', customer: 'Taufik Rahman', amount: 'Rp.165.000', status: 'delivered', date: '2026-04-11', items: 3 },
    { id: '1015', customer: 'Yuki Tanaka', amount: 'Rp.410.000', status: 'delivered', date: '2026-04-11', items: 8 },
    { id: '1016', customer: 'Zhafira Kirana', amount: 'Rp.275.000', status: 'pending', date: '2026-04-10', items: 5 },
    { id: '1017', customer: 'Malik Ibrahim', amount: 'Rp.195.000', status: 'delivered', date: '2026-04-10', items: 4 },
    { id: '1018', customer: 'Sasha Violetta', amount: 'Rp.330.000', status: 'delivered', date: '2026-04-10', items: 7 },
    { id: '1019', customer: 'Andi Wijaya', amount: 'Rp.125.000', status: 'cancelled', date: '2026-04-09', items: 2 },
    { id: '1020', customer: 'Kirana Putri', amount: 'Rp.360.000', status: 'delivered', date: '2026-04-09', items: 8 },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <FaCheckCircle className="text-emerald-600" />;
      case 'pending':
        return <FaClock className="text-amber-600" />;
      case 'cancelled':
        return <FaTimesCircle className="text-rose-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-emerald-100 text-emerald-700';
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      case 'cancelled':
        return 'bg-rose-100 text-rose-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'pending':
        return 'Pending';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const filteredOrders = filter === 'all' ? ordersData : ordersData.filter(order => order.status === filter);

  return (
    <div>
      <PageHeader title="All Orders" subtitle="Home / Orders / All Orders" />

      {/* Filter Section */}
      <div className="mb-8 flex flex-wrap gap-3">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-2 rounded-3xl font-semibold transition hover:scale-105 ${
            filter === 'all'
              ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
              : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          All Orders ({ordersData.length})
        </button>
        <button
          onClick={() => setFilter('delivered')}
          className={`px-6 py-2 rounded-3xl font-semibold transition ${
            filter === 'delivered'
              ? 'bg-emerald-500 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          Delivered ({ordersData.filter(o => o.status === 'delivered').length})
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-6 py-2 rounded-3xl font-semibold transition ${
            filter === 'pending'
              ? 'bg-amber-500 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          Pending ({ordersData.filter(o => o.status === 'pending').length})
        </button>
        <button
          onClick={() => setFilter('cancelled')}
          className={`px-6 py-2 rounded-3xl font-semibold transition ${
            filter === 'cancelled'
              ? 'bg-rose-500 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          Cancelled ({ordersData.filter(o => o.status === 'cancelled').length})
        </button>
      </div>

      {/* Orders Table */}
      <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-8 py-4 text-left text-sm font-bold text-slate-900">Order ID</th>
                <th className="px-8 py-4 text-left text-sm font-bold text-slate-900">Customer</th>
                <th className="px-8 py-4 text-left text-sm font-bold text-slate-900">Amount</th>
                <th className="px-8 py-4 text-left text-sm font-bold text-slate-900">Items</th>
                <th className="px-8 py-4 text-left text-sm font-bold text-slate-900">Status</th>
                <th className="px-8 py-4 text-left text-sm font-bold text-slate-900">Date</th>
                <th className="px-8 py-4 text-center text-sm font-bold text-slate-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="px-8 py-4 text-sm font-bold text-slate-900">{order.id}</td>
                  <td className="px-8 py-4 text-sm text-slate-600">{order.customer}</td>
                  <td className="px-8 py-4 text-sm font-semibold text-slate-900">{order.amount}</td>
                  <td className="px-8 py-4 text-sm text-slate-600">{order.items} items</td>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className={`px-4 py-2 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-sm text-slate-600">{order.date}</td>
                  <td className="px-8 py-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        type="button"
                        className="p-2 hover:bg-slate-200 rounded-full transition text-slate-600 hover:text-slate-900"
                        title="View"
                      >
                        <FaEye />
                      </button>
                      <button
                        type="button"
                        className="p-2 hover:bg-slate-200 rounded-full transition text-slate-600 hover:text-slate-900"
                        title="Download"
                      >
                        <FaDownload />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-8 py-6 border-t border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Showing <span className="font-semibold">{filteredOrders.length}</span> of{' '}
            <span className="font-semibold">{ordersData.length}</span> orders
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
