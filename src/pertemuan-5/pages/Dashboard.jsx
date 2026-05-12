import React from 'react';
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import RecentOrdersTable from '../components/RecentOrdersTable';

const Dashboard = ({ onViewAllOrders }) => {

  const stats = [
    {
      icon: FaShoppingCart,
      title: 'Total Orders',
      value: '75',
      subtitle: 'Total Orders',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
    {
      icon: FaTruck,
      title: 'Total Delivered',
      value: '175',
      subtitle: 'Total Delivered',
      color: 'text-sky-600',
      bgColor: 'bg-sky-100',
    },
    {
      icon: FaBan,
      title: 'Total Canceled',
      value: '40',
      subtitle: 'Total Canceled',
      color: 'text-rose-600',
      bgColor: 'bg-rose-100',
    },
    {
      icon: FaDollarSign,
      title: 'Total Revenue',
      value: 'Rp.128',
      subtitle: 'Total Revenue',
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
    },
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Home / Home Detail / Home Very Detail"
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4 mb-10">
        {stats.map((stat, index) => (
          <div key={index} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 hover:border-slate-300">
            <div className="flex items-center justify-between gap-4">
              <div className={`flex h-16 w-16 items-center justify-center rounded-3xl ${stat.bgColor}`}>
                <stat.icon className={`text-2xl ${stat.color}`} />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-2">{stat.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <RecentOrdersTable onViewAll={onViewAllOrders} />
    </div>
  );
};

export default Dashboard;
