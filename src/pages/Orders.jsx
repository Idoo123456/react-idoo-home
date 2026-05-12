import React, { useMemo, useState } from 'react';
import { FaCheckCircle, FaClock, FaTimesCircle, FaEye, FaDownload, FaPlus, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';

const customerNames = [
  'Aurel Putri', 'Arya Saputra', 'Bima Pratama', 'Citra Lestari', 'Danya Wicaksono',
  'Fajar Hadi', 'Gita Ramadhani', 'Hendra Suryawan', 'Intan Maharani', 'Jaya Nugraha',
  'Kharisma Putra', 'Laila Safitri', 'Murni Hapsari', 'Nanda Kurniawan', 'Onny Pratiwi',
  'Putri Ayu', 'Qori Nur', 'Rafi Hidayat', 'Sari Anggraini', 'Taufik Rizki',
  'Umi Farida', 'Vina Maulani', 'Wira Salim', 'Xena Oktaviani', 'Yudha Santoso',
  'Zahra Ramadhani', 'Aldi Ramadhan', 'Bella Savitri', 'Cakra Wijaya', 'Dian Prameswari',
  'Elang Nugroho', 'Fani Kusuma', 'Gita Rahmawati', 'Hadi Pratama', 'Indah Puspitasari',
  'Joko Santoso', 'Kiki Alamsyah', 'Lina Ariyani', 'Maya Putri', 'Nina Sari',
  'Oki Prasetya', 'Putu Aditya', 'Qila Safira', 'Rina Dewi', 'Satria Wicaksana',
  'Tri Handoko', 'Uli Setiawan', 'Vira Novita', 'Wawan Rahmat', 'Yuni Kartika',
];

const statuses = ['Pending', 'Completed', 'Cancelled'];
const orderTotals = [
  175000, 240000, 310000, 182000, 199000, 256000, 289000, 147000, 220000, 190000,
  255000, 170000, 280000, 235000, 260000, 148000, 303000, 195000, 275000, 210000,
  225000, 168000, 250000, 299000, 180000, 248000, 214000, 237000, 265000, 192000,
  205000, 278000, 183000, 294000, 158000, 226000, 310000, 174000, 241000, 281000,
  197000, 222000, 160000, 271000, 233000, 289000, 206000, 179000, 264000, 301000,
];

const initialOrders = Array.from({ length: 50 }, (_, index) => ({
  id: `ORD${1001 + index}`,
  customer: customerNames[index % customerNames.length],
  status: statuses[index % statuses.length],
  total: `Rp.${orderTotals[index].toLocaleString('id-ID')}`,
  date: `2026-04-${String((index % 30) + 1).padStart(2, '0')}`,
}));

const getStatusIcon = (status) => {
  switch (status) {
    case 'Completed':
      return <FaCheckCircle className="text-emerald-600" />;
    case 'Pending':
      return <FaClock className="text-amber-600" />;
    case 'Cancelled':
      return <FaTimesCircle className="text-rose-600" />;
    default:
      return null;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Completed':
      return 'bg-emerald-100 text-emerald-700';
    case 'Pending':
      return 'bg-amber-100 text-amber-700';
    case 'Cancelled':
      return 'bg-rose-100 text-rose-700';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

const Orders = () => {
  const [ordersData, setOrdersData] = useState(initialOrders);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddOrder, setShowAddOrder] = useState(false);
  const [newOrder, setNewOrder] = useState({
    id: '',
    customer: '',
    status: 'Pending',
    total: '0',
    date: '2026-04-01',
  });

  const ordersPerPage = 10;

  const filteredOrders = useMemo(
    () =>
      filter === 'all'
        ? ordersData
        : ordersData.filter((order) => order.status === filter),
    [filter, ordersData]
  );

  const pageCount = Math.ceil(filteredOrders.length / ordersPerPage);

  const pagedOrders = useMemo(() => {
    const start = (currentPage - 1) * ordersPerPage;
    return filteredOrders.slice(start, start + ordersPerPage);
  }, [filteredOrders, currentPage]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrder = (event) => {
    event.preventDefault();
    if (!newOrder.customer.trim() || !newOrder.total.trim() || !newOrder.date.trim()) {
      return;
    }

    const nextId = newOrder.id || `ORD${1001 + ordersData.length}`;
    const formattedTotal = `Rp.${Number(newOrder.total).toLocaleString('id-ID')}`;

    setOrdersData([
      {
        id: nextId,
        customer: newOrder.customer.trim(),
        status: newOrder.status,
        total: formattedTotal,
        date: newOrder.date,
      },
      ...ordersData,
    ]);

    setNewOrder({ id: '', customer: '', status: 'Pending', total: '0', date: '2026-04-01' });
    setShowAddOrder(false);
    setCurrentPage(1);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    setCurrentPage(1);
  };

  const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1);

  const handlePageChange = (page) => {
    if (page < 1 || page > pageCount) return;
    setCurrentPage(page);
  };

  return (
    <div>
      <PageHeader
        title="All Orders"
        breadcrumb={['Home', 'Orders']}
        children={
          <button
            onClick={() => setShowAddOrder((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-3xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-600"
          >
            <FaPlus />
            Add Order
          </button>
        }
      />

      {showAddOrder && (
        <div className="mb-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Add New Order</h2>
              <p className="text-sm text-slate-500">Isi form berikut untuk menambahkan order baru.</p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddOrder(false)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-100"
            >
              <FaTimes />
              Cancel
            </button>
          </div>
          <form onSubmit={handleAddOrder} className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Order ID
              <input
                name="id"
                value={newOrder.id}
                onChange={handleInputChange}
                placeholder="ORD10051"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:bg-white"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Customer Name
              <input
                name="customer"
                value={newOrder.customer}
                onChange={handleInputChange}
                placeholder="Nama customer"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:bg-white"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Status
              <select
                name="status"
                value={newOrder.status}
                onChange={handleInputChange}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:bg-white"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Total Price
              <input
                name="total"
                type="number"
                value={newOrder.total}
                onChange={handleInputChange}
                placeholder="150000"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:bg-white"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Order Date
              <input
                name="date"
                type="date"
                value={newOrder.date}
                onChange={handleInputChange}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:bg-white"
              />
            </label>
            <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddOrder(false)}
                className="rounded-3xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-3xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
              >
                Save Order
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mb-8 flex flex-wrap gap-3">
        {['all', 'Pending', 'Completed', 'Cancelled'].map((type) => {
          const count =
            type === 'all'
              ? ordersData.length
              : ordersData.filter((order) => order.status === type).length;

          return (
            <button
              key={type}
              onClick={() => handleFilterChange(type)}
              className={`px-6 py-2 rounded-3xl font-semibold transition ${
                filter === type
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {type === 'all' ? `All Orders (${count})` : `${type} (${count})`}
            </button>
          );
        })}
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-8 py-4 text-left text-sm font-bold text-slate-900">Order ID</th>
                <th className="px-8 py-4 text-left text-sm font-bold text-slate-900">Customer</th>
                <th className="px-8 py-4 text-left text-sm font-bold text-slate-900">Total Price</th>
                <th className="px-8 py-4 text-left text-sm font-bold text-slate-900">Status</th>
                <th className="px-8 py-4 text-left text-sm font-bold text-slate-900">Order Date</th>
                <th className="px-8 py-4 text-center text-sm font-bold text-slate-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {pagedOrders.map((order) => (
                <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="px-8 py-4 font-bold">{order.id}</td>
                  <td className="px-8 py-4">{order.customer}</td>
                  <td className="px-8 py-4 font-semibold">{order.total}</td>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className={`px-4 py-2 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-4">{order.date}</td>
                  <td className="px-8 py-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button className="p-2 hover:bg-slate-200 rounded-full">
                        <FaEye />
                      </button>
                      <button className="p-2 hover:bg-slate-200 rounded-full">
                        <FaDownload />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-500">
          Menampilkan {Math.min((currentPage - 1) * ordersPerPage + 1, filteredOrders.length)} - {Math.min(currentPage * ordersPerPage, filteredOrders.length)} dari {filteredOrders.length} order
        </div>
        <div className="flex items-center flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`inline-flex h-11 min-w-[45px] items-center justify-center rounded-full border px-4 text-sm font-semibold transition ${
              currentPage === 1 ? 'border-slate-200 bg-slate-100 text-slate-400' : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50'
            }`}
          >
            <FaChevronLeft />
          </button>
          {pageNumbers.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => handlePageChange(page)}
              className={`inline-flex h-11 min-w-[45px] items-center justify-center rounded-full border px-4 text-sm font-semibold transition ${
                currentPage === page
                  ? 'border-emerald-500 bg-emerald-600 text-white shadow-lg shadow-emerald-200 ring-2 ring-emerald-200'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pageCount}
            className={`inline-flex h-11 min-w-[45px] items-center justify-center rounded-full border px-4 text-sm font-semibold transition ${
              currentPage === pageCount ? 'border-slate-200 bg-slate-100 text-slate-400' : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50'
            }`}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
