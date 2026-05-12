import React from "react";
import { FaBell, FaShoppingCart, FaUser, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const NotificationDropdown = ({ isOpen }) => {
  const notifications = [
    {
      id: 1,
      type: "order",
      title: "New Order Received",
      message: "Order #1245 from Fikri Muhaffizh",
      time: "5 min ago",
      icon: FaShoppingCart,
      color: "bg-blue-100 text-blue-600",
      read: false,
    },
    {
      id: 2,
      type: "customer",
      title: "New Customer Registered",
      message: "Ahmad Hidayat joined the platform",
      time: "15 min ago",
      icon: FaUser,
      color: "bg-emerald-100 text-emerald-600",
      read: false,
    },
    {
      id: 3,
      type: "success",
      title: "Menu Added Successfully",
      message: "Nasi Goreng Spesial has been added",
      time: "1 hour ago",
      icon: FaCheckCircle,
      color: "bg-green-100 text-green-600",
      read: true,
    },
    {
      id: 4,
      type: "warning",
      title: "Low Stock Alert",
      message: "Minyak Goreng stock is running low",
      time: "2 hours ago",
      icon: FaExclamationTriangle,
      color: "bg-amber-100 text-amber-600",
      read: true,
    },
    {
      id: 5,
      type: "order",
      title: "Order Cancelled",
      message: "Order #1242 has been cancelled",
      time: "3 hours ago",
      icon: FaShoppingCart,
      color: "bg-rose-100 text-rose-600",
      read: true,
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="bg-white rounded-[24px] shadow-2xl w-96 border border-slate-200 max-h-[600px] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <FaBell className="text-emerald-500 text-lg" />
          <h3 className="font-bold text-slate-900">Notifications</h3>
        </div>
        <span className="bg-emerald-500 text-white text-xs font-bold rounded-full px-2 py-1">
          {notifications.filter(n => !n.read).length}
        </span>
      </div>

      {/* Notifications List */}
      <div className="overflow-y-auto flex-1">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => alert(`Notification: ${notif.title}`)}
            className={`p-4 border-b border-slate-100 hover:bg-slate-50 transition cursor-pointer ${
              !notif.read ? "bg-emerald-50" : ""
            }`}
            role="button"
            tabIndex={0}
          >
            <div className="flex gap-3">
              <div className={`p-2 rounded-full ${notif.color} flex-shrink-0`}>
                <notif.icon />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm">{notif.title}</p>
                <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{notif.message}</p>
                <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
              </div>
              {!notif.read && (
                <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0 mt-1"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View All Footer */}
      <div className="p-4 border-t border-slate-200 text-center bg-slate-50">
        <button className="text-emerald-500 font-semibold text-sm hover:text-emerald-600 transition" type="button">
          View All Notifications →
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;
