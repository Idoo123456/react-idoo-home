import React, { useState } from 'react';
import { FaCog, FaBell, FaShieldAlt, FaDatabase, FaUser, FaToggleOn, FaToggleOff, FaSave } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: true,
    autoBackup: true,
    darkMode: false,
    soundAlerts: true,
  });

  const [userName, setUserName] = useState('Mido Herdiansyah');
  const [userEmail, setUserEmail] = useState('mido.herdiansyah@idoosodap.com');

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  const settingGroups = [
    {
      title: 'Notifications',
      icon: FaBell,
      color: 'bg-blue-100 text-blue-600',
      settings: [
        { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive email alerts for new orders' },
        { key: 'smsNotifications', label: 'SMS Notifications', description: 'Receive SMS alerts for important events' },
        { key: 'soundAlerts', label: 'Sound Alerts', description: 'Play sound when new order arrives' },
      ]
    },
    {
      title: 'Security',
      icon: FaShieldAlt,
      color: 'bg-emerald-100 text-emerald-600',
      settings: [
        { key: 'twoFactorAuth', label: 'Two-Factor Authentication', description: 'Add extra security to your account' },
      ]
    },
    {
      title: 'Data & Storage',
      icon: FaDatabase,
      color: 'bg-purple-100 text-purple-600',
      settings: [
        { key: 'autoBackup', label: 'Auto Backup', description: 'Automatically backup your data daily' },
      ]
    },
  ];

  return (
    <div>
      <PageHeader title="Settings" subtitle="Home / Settings / Preferences" />

      {/* Profile Section */}
      <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm mb-6">
        <div className="flex items-start gap-6">
          <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-emerald-500 shadow-lg flex-shrink-0">
            <img
              src="https://i.pinimg.com/736x/61/e3/9e/61e39e00865a39454ba0ef6051d42bb8.jpg"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-slate-900">Profile Information</h3>
            
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${group.color}`}>
                <group.icon className="text-xl" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{group.title}</h3>
            </div>

            <div className="space-y-4">
              {group.settings.map((setting) => (
                <div key={setting.key} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{setting.label}</p>
                    <p className="text-sm text-slate-500 mt-1">{setting.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle(setting.key)}
                    className="focus:outline-none transition"
                  >
                    {settings[setting.key] ? (
                      <FaToggleOn className="text-3xl text-emerald-500" />
                    ) : (
                      <FaToggleOff className="text-3xl text-slate-300" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Privacy & Other Settings */}
      <div className="mt-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Privacy & Other</h3>
        
        <div className="space-y-4">
          <button type="button" className="w-full p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition text-left font-semibold text-blue-900 border border-blue-200">
            Privacy Policy
          </button>
          <button type="button" className="w-full p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition text-left font-semibold text-purple-900 border border-purple-200">
            Terms of Service
          </button>
          <button type="button" className="w-full p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 transition text-left font-semibold text-indigo-900 border border-indigo-200">
            Data & Privacy
          </button>
          <button type="button" className="w-full p-4 rounded-2xl bg-gradient-to-r from-teal-50 to-teal-100 hover:from-teal-100 hover:to-teal-200 transition text-left font-semibold text-teal-900 border border-teal-200">
            About IDOO SODAP
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4">
        <button
          type="button"
          onClick={handleSave}
          className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
        >
          <FaSave />
          Save Changes
        </button>
        <button
          type="button"
          className="flex-1 rounded-2xl bg-gradient-to-r from-slate-500 to-slate-600 px-6 py-3 font-semibold text-white transition hover:shadow-lg"
        >
          Reset to Default
        </button>
      </div>

      {/* Danger Zone */}
      <div className="mt-8 rounded-[28px] border-2 border-rose-200 bg-rose-50 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-rose-900 mb-4">Danger Zone</h3>
        <p className="text-sm text-rose-700 mb-4">Irreversible actions that cannot be undone:</p>
        
        <div className="space-y-3">
          <button type="button" className="w-full rounded-2xl bg-gradient-to-r from-orange-400 to-orange-500 px-6 py-3 font-semibold text-white transition hover:shadow-lg">
            Clear All Data
          </button>
          <button type="button" className="w-full rounded-2xl bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 font-semibold text-white transition hover:shadow-lg">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
