import React, { useRef, useEffect } from "react";
import { FaTimes, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSignOutAlt } from "react-icons/fa";

const ProfileModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

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

  const userInfo = {
    name: "Mido Herdiansyah",
    email: "mido@restaurant.com",
    phone: "+62 812-3456-7890",
    location: "Pekanbaru, Indonesia",
    role: "Restaurant Administrator",
    avatar: "https://i.pinimg.com/736x/61/e3/9e/61e39e00865a39454ba0ef6051d42bb8.jpg",
    memberSince: "15 January 2025",
  };

  const handleLogout = () => {
    alert("Logged out! See you later 👋");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-white rounded-[28px] shadow-2xl w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition z-10"
          type="button"
        >
          <FaTimes className="text-slate-600" />
        </button>

        {/* Header with Avatar */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-t-[28px] p-8 pt-12 text-center">
          <div className="w-24 h-24 mx-auto rounded-full border-4 border-white overflow-hidden shadow-xl mb-4">
            <img src={userInfo.avatar} alt={userInfo.name} className="w-full h-full object-cover" />
          </div>
          <h2 className="text-2xl font-bold text-white">{userInfo.name}</h2>
          <p className="text-emerald-100 text-sm mt-1">{userInfo.role}</p>
        </div>

        {/* Info Section */}
        <div className="p-6 space-y-4">
          {/* Email */}
          <div className="flex items-start gap-3">
            <FaEnvelope className="text-emerald-500 mt-1 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Email</p>
              <p className="text-slate-900 font-medium">{userInfo.email}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <FaPhone className="text-emerald-500 mt-1 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Phone</p>
              <p className="text-slate-900 font-medium">{userInfo.phone}</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="text-emerald-500 mt-1 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Location</p>
              <p className="text-slate-900 font-medium">{userInfo.location}</p>
            </div>
          </div>

          {/* Member Since */}
          <div className="pt-4 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Member Since</p>
            <p className="text-slate-900 font-medium">{userInfo.memberSince}</p>
          </div>
        </div>

        {/* Logout Button */}
        <div className="px-6 pb-6">
          <button
            onClick={handleLogout}
            className="w-full rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 transition flex items-center justify-center gap-2"
            type="button"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
