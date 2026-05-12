import React from 'react';
import { FaChartLine, FaUser, FaShoppingCart, FaDollarSign, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';

const Analytics = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: 'Rp 2.5M',
      change: '+12.5%',
      trend: 'up',
      icon: FaDollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
    {
      title: 'Total Orders',
      value: '1,024',
      change: '+8.2%',
      trend: 'up',
      icon: FaShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'New Customers',
      value: '156',
      change: '-3.1%',
      trend: 'down',
      icon: FaUser,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Avg Order Value',
      value: 'Rp 87.5K',
      change: '+5.3%',
      trend: 'up',
      icon: FaChartLine,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
    },
  ];

  const dailyData = [
    { day: 'Mon', revenue: 15000, orders: 120 },
    { day: 'Tue', revenue: 18000, orders: 145 },
    { day: 'Wed', revenue: 22000, orders: 168 },
    { day: 'Thu', revenue: 19000, orders: 155 },
    { day: 'Fri', revenue: 28000, orders: 195 },
    { day: 'Sat', revenue: 35000, orders: 220 },
    { day: 'Sun', revenue: 32000, orders: 210 },
  ];

  const maxRevenue = Math.max(...dailyData.map(d => d.revenue));

  return (
    <div>
      <PageHeader title="Analytics & Reports" subtitle="Home / Analytics / Dashboard Report" />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-500">{stat.title}</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
                <div className="flex items-center gap-1 mt-3">
                  {stat.trend === 'up' ? (
                    <FaArrowUp className="text-emerald-600 text-sm" />
                  ) : (
                    <FaArrowDown className="text-rose-600 text-sm" />
                  )}
                  <span className={stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`flex h-16 w-16 items-center justify-center rounded-3xl ${stat.bgColor}`}>
                <stat.icon className={`text-2xl ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Weekly Revenue</h3>
          
          <div className="flex items-end justify-between gap-4 h-64">
            {dailyData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center h-48">
                  <div
                    className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg transition hover:from-emerald-600 hover:to-emerald-500"
                    style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                    title={`Rp ${data.revenue.toLocaleString()}`}
                  />
                </div>
                <p className="text-xs font-semibold text-slate-600">{data.day}</p>
                <p className="text-xs text-slate-500">{data.orders} orders</p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-600">
              Total Weekly Revenue: <span className="font-bold text-slate-900">Rp 169.0M</span>
            </p>
          </div>
        </div>

        {/* Top Categories */}
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Top Menu Items</h3>
          
          <div className="space-y-4">
            {[
              { name: 'Nasi Goreng Spesial', sales: 245, percent: 45 },
              { name: 'Soto Ayam', sales: 189, percent: 35 },
              { name: 'Rendang Daging', sales: 156, percent: 28 },
              { name: 'Gado-Gado', sales: 98, percent: 18 },
              { name: 'Lumpia Goreng', sales: 67, percent: 12 },
            ].map((item, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs font-bold text-slate-600">{item.sales}</p>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="mt-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Performance Metrics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Average Response Time', value: '2.3s', status: 'good' },
            { label: 'Order Completion Rate', value: '98.5%', status: 'good' },
            { label: 'Customer Satisfaction', value: '4.8/5', status: 'good' },
          ].map((metric, index) => (
            <div key={index} className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl">
              <p className="text-sm text-slate-600 mb-2">{metric.label}</p>
              <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
              <p className={`text-xs mt-2 ${metric.status === 'good' ? 'text-emerald-600 font-semibold' : 'text-rose-600 font-semibold'}`}>
                {metric.status === 'good' ? '✓ Optimal' : '⚠ Needs Attention'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
